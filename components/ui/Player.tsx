"use client"

import usePlayer from "@/hooks/usePlayer";
import useGetPodcastById from "@/hooks/useGetPodcastById";
import useLoadPodcastUrl from "@/hooks/useLoadPodcastUrl";
import PlayerContent from "@/components/ui/PlayerContent";

const Player = () => {
    const player = usePlayer();
    const { podcast } = useGetPodcastById(player.activeId);

    const podcastUrl = useLoadPodcastUrl(podcast);

    if (!podcast || !podcastUrl || !player.activeId) return null;

  return(
      <div className={`
        fixed
        bottom-0
        bg-black
        w-full
        py-2
        h-[80px]
        px-4
      `}>
          <PlayerContent
              key={podcastUrl}
            podcast={podcast}
            podcastUrl={podcastUrl}
          />
      </div>
  )
}

export default Player;