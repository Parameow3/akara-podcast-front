import {Podcast} from "@/types/types";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

const getPodcast = async (): Promise<Podcast[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const {data, error} = await supabase
        .from('podcasts')
        .select('*')
        .order('created_at', {ascending: false});
    if (error) {
        console.error(error);
    }

    return (data as any) || [];
}

export default getPodcast;