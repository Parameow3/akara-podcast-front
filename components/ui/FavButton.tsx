"use client"

import {useRouter} from "next/navigation";
import {useSessionContext} from "@supabase/auth-helpers-react";
import useAuthModal from "@/hooks/useAuthModal";
import {useUser} from "@/hooks/useUser";
import {useEffect, useState} from "react";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import toast from "react-hot-toast";

interface FavButtonProps {
    podcastId: string;
}

const FavButton: React.FC<FavButtonProps> = ({ podcastId }) => {
    const router = useRouter();
    const { supabaseClient } = useSessionContext();

    const authModal = useAuthModal();
    const { user } = useUser();

    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        if (!user?.id) {
            return;
        }

        const fetchFav = async () => {
            const { data, error } = await supabaseClient
                .from("liked_podcasts")
                .select("*")
                .eq("user_id", user.id)
                .eq("podcast_id", podcastId)
                .single();

            if (!error && data) {
                setIsFav(true);
            }
        };

        fetchFav();
    }, [podcastId, supabaseClient, user?.id])

    const Icon = isFav ? AiFillHeart : AiOutlineHeart;

    const handleFav = async () => {
        if(!user){
            return authModal.onOpen();
        }

        if (isFav) {
            const { error } = await supabaseClient
                .from("liked_podcasts")
                .delete()
                .eq("user_id", user.id)
                .eq("podcast_id", podcastId);

            if (error) {
                toast.error(error.message);
            } else {
                setIsFav(false);
            }
        } else {
            const { error } = await supabaseClient
                .from("liked_podcasts")
                .insert([{ user_id: user.id, podcast_id: podcastId }]);

            if (error) {
                toast.error(error.message);
            } else {
                setIsFav(true);
                toast.success("Podcast added to favorites");
            }
        }

        router.refresh();
    }

    return(
        <button
            onClick={handleFav}
        className={"hover:opacity-75 transition"}>
            <Icon color={isFav ? '#22c55e' : 'white'} size={25} />
        </button>
    )
}

export default FavButton;