import {useEffect, useMemo, useState} from "react";
import {Podcast} from "@/types/types";
import {useSessionContext} from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";

const useGetPodcastById = (id: string | undefined) => {
    const [isLoading, setIsLoading] = useState(false);
    const [podcast, setPodcast] = useState<Podcast | undefined>(undefined);
    const { supabaseClient } = useSessionContext();

    useEffect(() => {
        if (!id) return;

        setIsLoading(true);

        const fetchPodcast = async () => {
            const { data, error } = await supabaseClient
                .from("podcasts")
                .select("*")
                .eq("id", id)
                .single();

            if (error) {
                setIsLoading(false);
                return toast.error(error.message);
            }

            setPodcast(data as Podcast);
            setIsLoading(false);
        }

        fetchPodcast();
    }, [id, supabaseClient]);

    return useMemo(() => ({
        isLoading,
        podcast}),
        [isLoading, podcast]);
}

export default useGetPodcastById;