import type { Metadata } from "next";
import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "./_components/theme-provider";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Nerolusi",
  description: "Nerolusi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="size-full">
        <TRPCReactProvider>
          <SessionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </SessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
