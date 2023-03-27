import { Anchor, Flex, Header } from "@mantine/core";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../Button";
import { Logo } from "../Logo";
import { useStyles } from "./common.styles";

export function _Header() {
  const { classes, cx } = useStyles();
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <Header className={cx(classes.container, classes.header)} height={65}>
      <Flex className={classes.body}>
        <Logo />
        <Flex gap={8}>
          <Anchor
            size="xs"
            component={Link}
            href="/dashboard"
            sx={{ color: "var(--color)", display: "flex", alignItems: "center" }}
          >
            Dashboard
          </Anchor>
          {session ? (
            <Button
              loading={loading}
              color="cyan.7"
              size="xs"
              onClick={async () => {
                if (loading) return;

                setLoading(true);
                const { error } = await supabase.auth.signOut();
                if (error) toast.error(error.message);
                else toast.success("Successfully signed out");
                setLoading(false);
              }}
            >
              Logout
            </Button>
          ) : (
            <Button component={Link} size="xs" href="/signin" color="cyan.7">
              Sign in
            </Button>
          )}
          <Button component={Link} size="xs" href="/new">
            New Xlug
          </Button>
        </Flex>
      </Flex>
    </Header>
  );
}

export { _Header as Header };
