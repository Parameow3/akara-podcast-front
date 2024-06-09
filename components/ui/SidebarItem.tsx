import {IconType} from "react-icons";
import Link from "next/link";
import {twMerge} from "tailwind-merge";

interface SidebarItemProps {
    icon: IconType;
    label: string;
    active?: boolean;
    href: string;
    isCollapsed: boolean; // Add this prop
}

const SidebarItem: React.FC<SidebarItemProps> = (
    {
        icon: Icon,
        label,
        active,
        href,
        isCollapsed // Destructure the prop
    }) => {
    return (
        <Link
            href={href}
            className={twMerge(`
        flex
        flex-row
        h-auto
        items-center
        w-full
        gap-x-4
        text-md
        font-medium
        cursor-pointer
        hover:text-white
        transition
        text-neutral-400
        py-1
    `, active && "text-white")}>
            <Icon size={26} />
            {!isCollapsed && <span className="truncate w-full">{label}</span>}
        </Link>
    )
}

export default SidebarItem;
