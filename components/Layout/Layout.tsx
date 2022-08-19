import { useState } from "react";
import { MantineProvider, ColorScheme, ColorSchemeProvider } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import Header from "./Header";
import { Footer } from "./Footer";
import { setCookie } from "cookies-next";
import { LayoutMainStyle, LayoutWrapperStyles } from "styles/styles";

interface LayoutProps {
  children: React.ReactNode;
  preferredColorScheme: ColorScheme;
}

export default function Layout({ children, preferredColorScheme }: LayoutProps) {
  const [colorScheme, setColorScheme] = useState(preferredColorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const newColorScheme = value ?? (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(newColorScheme);
    setCookie("preferred-color-theme", newColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };
  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        theme={{ colorScheme, fontFamily: "Greycliff CF, sans-serif" }}
        withGlobalStyles
        withNormalizeCSS
      >
        <div className="" style={LayoutWrapperStyles}>
          <Header />
          <main style={LayoutMainStyle}>{children}</main>
          <Footer />
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
