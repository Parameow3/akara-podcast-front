"use client"

import {TbPlaylist} from "react-icons/tb";
import {AiOutlinePlus} from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import {useUser} from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import {Podcast} from "@/types/types";
import MediaItem from "@/components/ui/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";

interface LibraryProps {
    podcasts: Podcast[];
}

const Library: React.FC<LibraryProps> = (
    {
    podcasts
    }
) => {

    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const {user} = useUser();

    const onPlay = useOnPlay(podcasts);


    const onClick = () => {
        if (!user) {
            return authModal.onOpen();
        }

        // TODO: Check for subscription

        return uploadModal.onOpen();
    };

    return (
        <div className={"flex flex-col"}>
            <div className={"flex items-center justify-between px-5 pt-4"}>
                <div className={"inline-flex items-center gap-x-2"}>
                    <TbPlaylist className={"text-neutral-400"} size={26} />
                    <span className={"text-neutral-400 font-medium text-md"}>Your Library</span>
                </div>
                <AiOutlinePlus
                    onClick={onClick}
                    className={"text-neutral-400 cursor-pointer hover:text-white transition"}
                    size={20} />
            </div>

            <div className={"flex flex-col gap-y-2 mt-4 px-3"}>
                {podcasts.map((podcast) => (
                    <MediaItem
                        onClick={(id: string) => onPlay(id)}
                        key={podcast.id}
                        data={podcast} />
                ))}
            </div>
        </div>
    );
}

export default Library;