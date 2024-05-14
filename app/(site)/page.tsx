import Header from "@/components/ui/Header";
import ListItem from "@/components/ui/ListItem";
import getPodcast from "@/actions/getPodcast";
import PageContent from "@/app/(site)/components/PageContent";


export const revalidate = 0;
export default async function HomePage() {
  const podcasts = await getPodcast();

  return <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
    <Header>
      <div className={"mb-2"}>
        <h1 className={"text-3xl font-semibold text-white"}>
          Welcome back
        </h1>
        <div
        className={`
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3
          2xl:grid-cols-4
          gap-3
          mt-4`}>

          <ListItem
            image={"https://picsum.photos/200"}
            name={"Favorite Podcasts"}
            href={"/favorite"}
          />

        </div>
      </div>
    </Header>

    <div className={"mt-2 mb-7 px-6"}>
      <div className={"flex justify-between items-center"}>
        <h1 className={"text-white text-2xl font-semibold"}>
          Newest podcasts
        </h1>
      </div>
      <PageContent podcasts={podcasts}/>
    </div>
  </div>;
}
