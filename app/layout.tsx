import { font } from "utils/font";
import "styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={font.variable}>
      <head />
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
