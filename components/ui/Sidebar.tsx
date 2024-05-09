"use client"
import {usePathname} from "next/navigation";
import React, {useMemo} from "react";
import {HiHome, HiOutlineHeart, HiSearch, HiTrendingUp} from "react-icons/hi";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import {Podcast} from "@/types/types";

interface SidebarProps {
    children: React.ReactNode;
    podcasts: Podcast[];
}

const Sidebar: React.FC<SidebarProps> = (
    {
    children,
    podcasts
    }) => {
    const pathname = usePathname();

    const routes = useMemo(() => [
        {
            icon: HiHome,
            label: "Discovers",
            active: pathname !== '/search' && pathname !== '/trending' && pathname !== '/favorite',
            href: "/",
        },
        {
            icon: HiSearch,
            label: "Search",
            active: pathname === '/search',
            href: "/search",
        },
        {
            icon: HiTrendingUp,
            label: "Trending",
            active: pathname === '/trending',
            href: "/trending",
        }
    ], [pathname]);

    return (
        <div className="flex h-full">
            <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p2">
                <Box>
                    <div
                    className="flex flex-col gap-y-4 px-5 py-4"
                    >
                        {routes.map((item)=>(
                            <SidebarItem
                            key={item.label}
                            {...item} />
                        ))}
                    </div>
                </Box>
                <Box className="overflow-y-auto h-full">
                    <Library podcasts={podcasts}/>
                </Box>
            </div>
            <main className="h-full flex-1 overflow-y-auto md:ms-2">
                {children}
            </main>
        </div>
    );
}

export default Sidebar;