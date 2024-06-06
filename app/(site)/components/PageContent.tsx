"use client"

import {Podcast} from "@/types/types";
import PodcastItem from "@/components/ui/PodcastItem";
import useOnPlay from "@/hooks/useOnPlay";

interface PageContentProps {
  podcasts: Podcast[];
}

const PageContent: React.FC<PageContentProps> = (
    {
        podcasts
    }
) => {
    const onPlay = useOnPlay(podcasts);

  if (podcasts.length === 0) {
      return (
        <div className={"mt-4 text-neutral-400"}>
          No podcasts available
        </div>
    );
  }

  return (
      <div
        className={`
          grid
          grid-cols-1
          sm:grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          2xl:grid-cols-5
          gap-4
          mt-4
        `}
      >
          {podcasts.map((podcast) => (
              <PodcastItem
                key={podcast.animeId}
                onClick={(id: string) => {}}
                data={podcast}
              />
          ))}

      </div>
  );
}

export default PageContent;