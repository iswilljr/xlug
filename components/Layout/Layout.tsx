import { AppShell, type AppShellProps } from "@mantine/core";
import { Footer } from "./Footer";
import { Header } from "./Header";

export interface LayoutProps extends Omit<AppShellProps, "fixed" | "header" | "footer"> {}

export function Layout(props: LayoutProps) {
  return (
    <AppShell
      styles={{ main: { minHeight: "calc(100vh - var(--mantine-header-height, 65px))" } }}
      fixed={false}
      header={<Header />}
      footer={<Footer />}
      {...props}
    />
  );
}
