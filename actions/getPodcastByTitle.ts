import {Podcast} from "@/types/types";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import getPodcast from "@/actions/getPodcast";

const getPodcastByTitle = async (title: string): Promise<Podcast[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    if (!title) {
        return await getPodcast();
    }

    const {data, error} = await supabase
        .from('podcasts')
        .select('*')
        .ilike('title', `%${title}%`)
        .order('created_at', {ascending: false});
    if (error) {
        console.error(error);
    }

    return (data as any) || [];
}

export default getPodcastByTitle;