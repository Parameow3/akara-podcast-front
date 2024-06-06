"use client"

import {Podcast} from "@/types/types";
import {useRouter} from "next/navigation";
import {useUser} from "@/hooks/useUser";
import {useEffect} from "react";
import MediaItem from "@/components/ui/MediaItem";
import FavButton from "@/components/ui/FavButton";
import useOnPlay from "@/hooks/useOnPlay";

interface FavoriteContentProps {
    podcasts: Podcast[];
}

const FavoriteContent: React.FC<FavoriteContentProps> = (
    {
        podcasts
    }
) => {
    const router = useRouter();
    const {isLoading, user} = useUser();
    const onPlay = useOnPlay(podcasts);

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace("/");
        }
    }, [isLoading, user, router]);

    if (podcasts.length === 0) {
        return (
            <div className={"flex flex-col gap-y-2 w-full px-6 text-neutral-400"}>
                No favorite podcasts.
            </div>
        )
    }

  return (
      <div className={"flex flex-col gap-y-2 w-full px-6"}>
            {podcasts.map((podcast) => (
                // eslint-disable-next-line react/jsx-key
                <div
                            key={podcast.animeId}
                            className={"flex items-center gap-x-4 w-full"}
                        >
                    <div className={"flex-1"}>
                        <MediaItem
                            onClick={(id: string) => onPlay(id)}
                            data={podcast}/>
                    </div>
                    <FavButton podcastId={podcast.animeId}/>
                </div>
            ))}
      </div>
  )
}

export default FavoriteContent;