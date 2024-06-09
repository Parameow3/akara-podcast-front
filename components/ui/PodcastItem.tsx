"use client"

import { Podcast } from "@/types/types";
import Image from "next/image";
import PlayButton from "@/components/ui/PlayButton";
import {useEffect, useState} from "react";

interface AnimeItemProps {
    data: Podcast,
    onClick: (id: string) => void
}

const getRandomImageUrl = (width: number, height: number): string => {
    return `https://picsum.photos/${width}/${height}?random=${Math.floor(Math.random() * 1000)}`;
}

const PodcastItem: React.FC<AnimeItemProps> = (
    {
        data,
        onClick
    }
) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        // Generate a random image URL only on the first load
        if (!imageUrl) {
            setImageUrl(getRandomImageUrl(200, 200));
        }
    }, [imageUrl]);

    return (
        <div
            className={`
                relative
                group
                flex
                flex-col
                items-center
                justify-center
                rounded-md
                overflow-hidden
                gap-x-4
                bg-neutral-400/5
                cursor-pointer
                hover:bg-neutral-400/10
                transition
                p-3
            `}
        >
            <div
                className={`
                    relative
                    aspect-square
                    w-full
                    h-full
                    rounded-md
                    overflow-hidden
                `}
            >
                <Image
                    className={`object-cover`}
                    fill
                    src={imageUrl || "https://picsum.photos/200"}
                    alt={"image"}/>
            </div>
            <div className={`
                flex flex-col items-start w-full p-4 gap-y-1
            `}>
                <p className={`font-semibold text-sm truncate w-full`}>
                    {data.name}
                </p>
                <p className={"text-neutral-400 text-sm pb-4 w-full truncate"}>
                    By {data.producers}
                </p>
                <p className={"text-neutral-400 text-xs pb-4 w-full truncate"}>
                    {data.genres}
                </p>
                <p className={`text-neutral-400 text-xs pb-4 w-full truncate`}>
                    {data.duration}
                </p>
            </div>
            <div className={`
                absolute
                bottom-28
                right-5
            `}
                 onClick={() => onClick(data.animeId)}
            >
                <PlayButton/>
            </div>
        </div>
    )
};

export default PodcastItem;
