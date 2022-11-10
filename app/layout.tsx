import { font } from "utils/font";
import Toaster from "components/toaster";
import Header from "components/header";
import "styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={font.variable}>
      <head />
      <body className="bg-primary text-white text-custom pb-4">
        <Header />
        {children}
        <Toaster
          toastOptions={{ style: { borderRadius: "10px", background: "#040f1d", color: "#fff" } }}
          position="bottom-center"
          reverseOrder={false}
        />
      </body>
    </html>
  );
}
