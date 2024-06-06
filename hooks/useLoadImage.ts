import {Podcast} from "@/types/types";
import {useSupabaseClient} from "@supabase/auth-helpers-react";

const useLoadImage = (podcast: Podcast) => {
    const supabaseClient = useSupabaseClient();

    if (!podcast) {
        return null;
    }

    const { data: imageData } = supabaseClient
        .storage
        .from("images")
        .getPublicUrl(podcast.name);

    return imageData.publicUrl;
}

export default useLoadImage;