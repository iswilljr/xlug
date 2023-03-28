/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { Flex, Text } from "@mantine/core";
import { Button } from "@/components/Button";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import type { GetServerSideProps } from "next";
import type { Database } from "@/types/supabase";
import { useLocalStorage } from "@mantine/hooks";
import Panel from "@/components/Panel";

interface DashboardProps {
  data?: Array<Database["public"]["Tables"]["xlugs"]["Row"]> | null;
}

export default function Dashboard({ data }: DashboardProps) {
  const [localXlugs, setLocalXlugs] = useLocalStorage<DashboardProps["data"]>({ key: "local_xlugs", defaultValue: [] });

  return (
    <Flex direction="column" justify="center" align="center" py="md" gap="md">
      {(data && data.length > 0) || (localXlugs && localXlugs.length > 0) ? (
        <Panel xlugs={data} localXlugs={localXlugs} updateXlugs={setLocalXlugs} />
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
  const supabase = createServerSupabaseClient<Database>(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return { props: { data: null } };

  const { data } = await supabase.from("xlugs").select("*").eq("user_id", session.user.id).order("created_at", {
    ascending: false,
  });

  return { props: { data } };
};
