"use client"

import usePlayer from "@/hooks/usePlayer";
import useGetPodcastById from "@/hooks/useGetPodcastById";
import PlayerContent from "@/components/ui/PlayerContent";

const Player = () => {
    const player = usePlayer();
    const { podcast } = useGetPodcastById(player.activeId);

    const podcastUrl = "https://akara-resources.s3.ap-southeast-1.amazonaws.com/akara-resources1717859127695?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAQ3EGS2OAFPDKBGEK%2F20240608%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240608T150527Z&X-Amz-Expires=1800&X-Amz-Signature=66f85768e968f3ed5dcaf78a00d854813f3bd7e75fbd5842515dce7e5d85e3c8&X-Amz-SignedHeaders=host&x-id=GetObject";

    // if (!podcast || !podcastUrl || !player.activeId) return null;
    if (!podcast) return null;

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