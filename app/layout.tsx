import { font } from "utils/font";
import "styles/globals.css";
import Header from "components/header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={font.variable}>
      <head />
      <body className="bg-primary text-white text-custom pb-4">
        <Header />
        {children}
      </body>
    </html>
  );
}
