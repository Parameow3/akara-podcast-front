import { Podcast } from "@/types/types";

const getPodcast = async (): Promise<Podcast[]> => {
    try {
        const response = await fetch('http://service.akarapodcast.com/api/podcasts?random=true&page=1&per_page=5');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.map((item: any) => ({
            aired: item.Aired,
            duration: item.Duration,
            episodes: item.Episodes,
            favorites: item.Favorites,
            genres: item.Genres,
            japaneseName: item['Japanese name'],
            name: item.Name,
            popularity: item.Popularity,
            producers: item.Producers,
            ranked: item.Ranked,
            rating: item.Rating,
            score: item.Score,
            source: item.Source,
            studios: item.Studios,
            type: item.Type,
            animeId: item.anime_id,
        })) as Podcast[];
    } catch (error) {
        console.error('Error fetching podcasts:', error);
        return [];
    }
}

export default getPodcast;
