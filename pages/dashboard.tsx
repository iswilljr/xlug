/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { Flex, Text } from "@mantine/core";
import { Button } from "@/components/Button";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { useLocalStorage } from "@mantine/hooks";
import Panel from "@/components/Panel";
import type { GetServerSideProps } from "next";
import type { Database } from "@/types/supabase";
import type { Xlug } from "@/types";

interface DashboardProps {
  data?: Xlug[] | null;
  layout: "list" | "grid";
}

export default function Dashboard({ data, layout }: DashboardProps) {
  const [localXlugs, setLocalXlugs] = useLocalStorage<DashboardProps["data"]>({ key: "local_xlugs", defaultValue: [] });

  return (
    <Flex direction="column" justify="center" align="center" py="md" gap="md">
      {(data && data.length > 0) || (localXlugs && localXlugs.length > 0) ? (
        <Panel layout={layout} xlugs={data} localXlugs={localXlugs} updateXlugs={setLocalXlugs} />
      ) : (
        <>
          <Text ta="center" sx={(theme) => ({ color: theme.fn.lighten(theme.colors.gray[9], 0.1) })}>
            Nothing to see here
          </Text>
          <Button component={Link} href="/new" px="md" py={8}>
            Get Started
          </Button>
        </>
      )}
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps<DashboardProps> = async (ctx) => {
  const layoutCookie = getCookie("data_layout", ctx);
  const layout = layoutCookie === "grid" ? "grid" : "list";

  const supabase = createPagesServerClient<Database>(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return { props: { data: null, layout } };

  const { data } = await supabase.from("xlugs").select("*").eq("user_id", session.user.id).order("created_at", {
    ascending: false,
  });

  return { props: { data, layout } };
};
