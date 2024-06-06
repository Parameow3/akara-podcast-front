import {Podcast} from "@/types/types";
import usePlayer from "@/hooks/usePlayer";
import useAuthModal from "@/hooks/useAuthModal";
import {useUser} from "@/hooks/useUser";

const useOnPlay = (podcasts: Podcast[]) => {
    const player = usePlayer();
    const authModal = useAuthModal();
    const { user } = useUser();

    const onPlay = (id: string) => {
        if (!user) {
            return authModal.onOpen();
        }
        player.setId(id);
        player.setIds(podcasts.map(podcast => podcast.animeId));
    }

    return onPlay;
}

export default useOnPlay;