import type { Metadata } from "next";
import "./globals.css";
import { Figtree } from "next/font/google";
import Sidebar from "@/components/ui/Sidebar";
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";

const font = Figtree({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Akara Podcast",
  description: "Discover your way to find your greatest fortune.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`p-2 ${font.className}`}>
      <SupabaseProvider>
          <UserProvider>
              <ModalProvider />
              <Sidebar>
                  {children}
              </Sidebar>
          </UserProvider>
      </SupabaseProvider>
      </body>
    </html>
  );
}
