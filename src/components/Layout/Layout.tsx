import { AppShell, rem, type AppShellProps } from "@mantine/core";
import { Footer } from "./Footer";
import { Header } from "./Header";

export interface LayoutProps extends Omit<AppShellProps, "fixed" | "header" | "footer"> {}

export function Layout(props: LayoutProps) {
  return (
    <AppShell
      styles={(theme) => ({
        main: {
          minHeight: "calc(100vh - var(--mantine-header-height, 65px) - var(--mantine-footer-height, 65px))",
          maxWidth: theme.breakpoints.lg,
          margin: "auto",
          padding: `0 ${rem(24)}`,
          [theme.fn.largerThan("sm")]: {
            padding: `0 ${rem(64)}`,
          },
        },
      })}
      fixed={false}
      header={<Header />}
      footer={<Footer />}
      {...props}
    />
  );
}
