import type { Metadata } from "next";
import "./globals.css";

import { helvetica } from "@/constants/fonts";
import { clsxm } from "@/lib/clsxm";
import { Toast } from "@/components/ui/toast";
import { Nprogress } from "@/components/ui/nprogress";

export const metadata: Metadata = {
  title: "Glory Reign 2025 Admin",
  description: "",
  openGraph: {
    images: ["https://gr25.org/imgs/opengraph.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={clsxm(helvetica.className, "antialiased")}>
        {children}
        <Toast />
        <Nprogress />
      </body>
    </html>
  );
}
