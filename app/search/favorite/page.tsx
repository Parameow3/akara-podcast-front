import getFavPodcast from "@/actions/getFavPodcast";
import Header from "@/components/ui/Header";
import Image from "next/image";
import FavoriteContent from "@/app/favorite/componets/FavoriteContent";

export const revalidate = 0;

const Favorite = async () => {
    const podcasts = await getFavPodcast();

    return (
        <div
            className={`
                bg-neutral-900
                rounded-lg
                h-full
                w-full
                overflow-hidden
                overflow-y-auto`}
        >
            <Header>
                <div className={"mt-20"}>
                    <div className={`
                        flex
                        flex-col
                        md:flex-row
                        items-center
                        gap-x-5
                    `}>
                        <div className={`
                            relative
                            h-32
                            w-32
                            lg:h-44
                            lg:w-44
                        `}>
                            <Image
                                fill
                                src={"https://picsum.photos/200"}
                                className={"object-cover"}
                                alt={"Favorite"}/>
                        </div>

                        <div className={`
                            flex
                            flex-col
                            gap-y-2
                            mt-4
                            md:mt-0
                        `}>
                            <p className={"hidden md:block font-semibold text-sm"}>
                                Playlist
                            </p>
                            <h1 className={"text-4xl sm:text-5xl lg:text-7xl font-bold text-white"}>
                                Favorite Podcasts
                            </h1>
                        </div>
                    </div>
                </div>
            </Header>
            <FavoriteContent podcasts={podcasts}/>

        </div>
    )
}

export default Favorite;