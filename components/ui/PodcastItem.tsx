"use client"

import {Podcast} from "@/types/types";
import useLoadImage from "@/hooks/useLoadImage";
import Image from "next/image";
import PlayButton from "@/components/ui/PlayButton";

interface PodcastItemProps {
    data: Podcast,
    onClick: (id: string) => void
}

const PodcastItem: React.FC<PodcastItemProps> = (
    {
        data,
        onClick
    }
) => {
    const imageUrl = useLoadImage(data);

  return (
      <div
        onClick={() => onClick(data.id)}
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
            alt={"image"} />
        </div>
          <div className={`
            flex flex-col items-start w-full p-4 gap-y-1
          `}>
              <p className={`font-semibold truncate w-full`}>
                  {data.title}
              </p>
              <p className={"text-neutral-400 text-sm pb-4 w-full truncate"}>
                  By {data.author}
              </p>
          </div>
          <div className={`
            absolute
            bottom-28
            right-5
          `}>
              <PlayButton />
          </div>
      </div>
  )
};

export default PodcastItem;