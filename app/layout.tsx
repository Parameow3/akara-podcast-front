import type { Metadata } from "next";
import "./globals.css";
import { Figtree } from "next/font/google";
import Sidebar from "@/components/ui/Sidebar";
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getPodcastByUserId from "@/actions/getPodcastByUserId";
import Player from "@/components/ui/Player";

const font = Figtree({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Akara Podcast",
    description: "Discover your way to find your greatest fortune.",
};

export const revalidate = 0;
export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const userPodcasts = await getPodcastByUserId();

    return (
        <html lang="en" suppressHydrationWarning>
        <body className={`p-2 ${font.className}`}>

        <ToasterProvider />
        <SupabaseProvider>
            <UserProvider>
                <ModalProvider />
                <Sidebar podcasts={userPodcasts}>
                    {children}
                </Sidebar>
                <Player />
            </UserProvider>
        </SupabaseProvider>
        </body>
        </html>
    );
}
