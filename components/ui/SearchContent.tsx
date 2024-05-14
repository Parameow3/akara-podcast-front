"use client"


import {Podcast} from "@/types/types";
import MediaItem from "@/components/ui/MediaItem";
import FavButton from "@/components/ui/FavButton";

interface SearchContentProps {
    podcasts: Podcast[];
}

const SearchContent: React.FC<SearchContentProps> = (
    {
        podcasts
}) => {

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
                <div key={podcast.id}
                     className={"flex items-center gap-x-4 w-full"}>
                    <div className={"flex-1"} >
                        <MediaItem
                         onClick={() => {}}
                         data={podcast}
                        />
                    </div>
                    <FavButton podcastId={podcast.id}/>
                </div>
            ))}
        </div>
    )
}

export default SearchContent;