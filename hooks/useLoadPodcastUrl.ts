import {Podcast} from "@/types/types";
import {useSupabaseClient} from "@supabase/auth-helpers-react";

const useLoadPodcastUrl = (podcast: Podcast | undefined) => {
    const supabaseClient = useSupabaseClient();

    if (!podcast) return '';

    const { data: podcastData } = supabaseClient
        .storage
        .from('podcasts')
        .getPublicUrl(podcast.name);

    return podcastData.publicUrl;
}

export default useLoadPodcastUrl;