"use client"

import {Podcast} from "@/types/types";
import useLoadImage from "@/hooks/useLoadImage";
import Image from "next/image";

interface MediaItemProps {
    data: Podcast
    onClick?: (id: string) => void;
}
const MediaItem: React.FC<MediaItemProps> = (
    {
    data,
    onClick
    }
) => {
    const imageUrl = useLoadImage(data);

    const handleClick = () => {
        if (onClick) {
            return onClick(data.animeId);
        }

        // TODO: Default turn on player
    }

    return (
        <div
            onClick={handleClick}
            className={`
                flex
                items-center
                gap-x-3
                cursor-pointer
                hover:bg-neutral-800/50
                w-full
                p-2
                rounded-md
            `}>
            <div className={`
                relative
                rounded-md
                min-h-[48px]
                min-w-[48px]
                overflow-hidden
            `}>
                <Image
                    fill
                    src={imageUrl || "https://picsum.photos/200"}
                    alt={"media image"}
                    className={"object-cover"}
                />
            </div>
            <div className={"flex flex-col gap-y-1 overflow-hidden"}>
                <span className={"text-white truncate font-medium"}>{data.name}</span>
                <span className={"text-neutral-400 truncate text-sm"}>{data.producers}</span>

            </div>
        </div>
    )
  
}

export default MediaItem;