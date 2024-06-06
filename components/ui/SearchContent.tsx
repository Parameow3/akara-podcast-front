"use client"


import {Podcast} from "@/types/types";
import MediaItem from "@/components/ui/MediaItem";
import FavButton from "@/components/ui/FavButton";
import useOnPlay from "@/hooks/useOnPlay";

interface SearchContentProps {
    podcasts: Podcast[];
}

const SearchContent: React.FC<SearchContentProps> = (
    {
        podcasts
}) => {

    const onPlay = useOnPlay(podcasts);

    if (podcasts.length === 0) {
        return (
            <div className={`
                flex
                flex-col
                gap-y-2
                w-full
                px-6
                text-neutral-400
            `}>
                No podcasts found.
            </div>
        )
    }

    return (
        <div className={"flex flex-col gap-y-2 w-full px-6"}>
            {podcasts.map((podcast) => (
                <div key={podcast.animeId}
                     className={"flex items-center gap-x-4 w-full"}>
                    <div className={"flex-1"} >
                        <MediaItem
                         onClick={(id: string) => onPlay(id)}
                         data={podcast}
                        />
                    </div>
                    <FavButton podcastId={podcast.animeId}/>
                </div>
            ))}
        </div>
    )
}

export default SearchContent;