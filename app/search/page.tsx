import getPodcastByTitle from "@/actions/getPodcastByTitle";
import Header from "@/components/ui/Header";
import SearchInput from "@/components/ui/SearchInput";
import SearchContent from "@/components/ui/SearchContent";

interface SearchProps {
    searchParams: {
        title: string;
    }
}

export const revalidate = 0;

const Search = async ({searchParams}: SearchProps) => {
    const podcasts = await getPodcastByTitle(searchParams.title);

    return (
        <div
        className={`
            bg-neutral-900
            rounded-lg
            h-full
            w-full
            overflow-hidden
            overflow-y-auto
        `}>
            <Header className={"from-bg-neutral-900"}>
                <div className={"mb-2 flex flex-col gap-y-6"}>
                    <h1 className={"text-white text-3xl font-semibold"}>
                        Search
                    </h1>
                    <SearchInput />

                </div>
            </Header>
            <SearchContent podcasts={podcasts}/>
        </div>
    )
}

export default Search;
