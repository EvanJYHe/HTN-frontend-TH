import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "HTN Events",
  description: "Discover events, workshops, and talks for Hack the North.",
  icons: {
    icon: "/HTN-icon.png",
    shortcut: "/HTN-icon.png",
    apple: "/HTN-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <Theme
            accentColor="gray"
            appearance="dark"
            grayColor="gray"
            panelBackground="solid"
            radius="medium"
            scaling="100%"
          >
            {children}
          </Theme>
        </Providers>
      </body>
    </html>
  );
}
