import { useEffect, useMemo, useState } from "react";
import { Podcast } from "@/types/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";

const useGetPodcastById = (id: string | undefined) => {
    const [isLoading, setIsLoading] = useState(false);
    const [podcast, setPodcast] = useState<Podcast | undefined>(undefined);
    const { supabaseClient } = useSessionContext();

    useEffect(() => {
        if (!id) return;

        setIsLoading(true);

        const fetchPodcast = async () => {
            try {
                // Ensure the user is authenticated
                const { data: user, error: userError } = await supabaseClient.auth.getUser();

                if (userError) {
                    throw new Error('Failed to authenticate user');
                }

                console.log(`Fetching podcast with ID: ${id}`);
                const response = await fetch(`http://service.akarapodcast.com/api/podcast/${id}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Fetched podcast data:', data);

                if (!data || Object.keys(data).length === 0) {
                    throw new Error('Podcast data is empty');
                }

                const podcastData: Podcast = {
                    aired: data.Aired,
                    duration: data.Duration,
                    episodes: data.Episodes,
                    favorites: data.Favorites,
                    genres: data.Genres,
                    japaneseName: data['Japanese name'],
                    name: data.Name,
                    popularity: data.Popularity,
                    producers: data.Producers,
                    ranked: data.Ranked,
                    rating: data.Rating,
                    score: data.Score,
                    source: data.Source,
                    studios: data.Studios,
                    type: data.Type,
                    animeId: data.anime_id,
                };

                setPodcast(podcastData);
                setIsLoading(false);
            } catch (error: any) {
                console.error('Error fetching podcast:', error);
                toast.error(`Error fetching podcast: ${error.message || 'Unknown error'}`);
                setIsLoading(false);
            }
        }

        fetchPodcast();
    }, [id, supabaseClient]);

    return useMemo(() => ({
        isLoading,
        podcast
    }), [isLoading, podcast]);
}

export default useGetPodcastById;
