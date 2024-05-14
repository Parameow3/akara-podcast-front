import {Podcast} from "@/types/types";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

const getPodcast = async (): Promise<Podcast[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const {
        data: {
            session
        }
    } = await supabase.auth.getSession();

    const {data, error} = await supabase
        .from('liked_podcasts')
        .select('*, podcasts(*)')
        .eq('user_id', session?.user.id)
        .order('created_at', {ascending: false});
    if (error) {
        console.error(error);
        return [];
    }

    if (!data) {
        return [];
    }

    return data.map((item) => ({
        ...item.podcasts
    }))
}

export default getPodcast;