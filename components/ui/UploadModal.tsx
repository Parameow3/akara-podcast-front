"use client";

import Modal from "@/components/ui/Modal";
import useUploadModal from "@/hooks/useUploadModal";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {useState} from "react";
import Input from "@/components/ui/Input";
import ReButton from "@/components/ui/ReButton";
import toast from "react-hot-toast";
import {useUser} from "@/hooks/useUser";
import uniqid from "uniqid";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {useRouter} from "next/navigation";

const UploadModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const uploadModal = useUploadModal();
    const {user} = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const {
        reset,
        handleSubmit,
        register
    } = useForm<FieldValues>({
        defaultValues: {
            author: "",
            title: "",
            description: "",
            podcast: null,
            image: null,
        }
    });

    const onChange = (open: boolean) => {
        if (!open){
            reset();
            uploadModal.onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);

            const imageFile = values.image?.[0];
            const podcastFile = values.podcast?.[0];

            if(!imageFile || !podcastFile || !user){
                toast.error("Missing fields");
                return;
            }

            const uniqueID = uniqid();

            // Upload Podcast
            const {
                data: podcastData,
                error: podcastError
            } = await supabaseClient
                .storage
                .from("podcasts")
                .upload(`podcasts-${values.title}-${uniqueID}`, podcastFile, {
                    cacheControl: "3600",
                    upsert: false,
                });

            if (podcastError){
                setIsLoading(false);
                return toast.error("Failed to upload podcast");
            }

            // Upload Image
            const {
                data: imageData,
                error: imageError
            } = await supabaseClient
                .storage
                .from("images")
                .upload(`images-${values.title}-${uniqueID}`, imageFile, {
                    cacheControl: "3600",
                    upsert: false,
                });

            if (imageError){
                setIsLoading(false);
                return toast.error("Failed to upload image");
            }

            const {
                error: supabaseError
            } = await supabaseClient
                .from("podcasts")
                .insert({
                    user_id: user.id,
                    title: values.title,
                    description: values.description,
                    author: values.author,
                    img: imageData.path,
                    url: podcastData.path

                });

            if (supabaseError){
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }

            router.refresh();
            setIsLoading(false);
            toast.success("Podcast uploaded successfully");
            reset();
            uploadModal.onClose();
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal
            title={"Add a podcast"}
            description={"Upload a mp3 file"}
            isOpen={uploadModal.isOpen}
            onChange={onChange}
               >
            <form onSubmit={handleSubmit(onSubmit)}
                  className={"flex flex-col gap-y-4"}>
                <Input
                    id={"title"}
                    disabled={isLoading}
                    {...register("title", {required: true})}
                    placeholder={"Podcast title"}
                />
                <Input
                    id={"author"}
                    disabled={isLoading}
                    {...register("author", {required: true})}
                    placeholder={"Podcast author"}
                />
                <Input
                    id={"description"}
                    disabled={isLoading}
                    {...register("description", {required: true})}
                    placeholder={"Description"}
                />
                <div>
                    <div className={"pb-1"}>
                        Select a podcast file
                    </div>
                    <Input
                        id={"podcast"}
                        type={"file"}
                        disabled={isLoading}
                        accept={".mp3"}
                        {...register("podcast", {required: true})}
                    />
                </div>
                <div>
                    <div className={"pb-1"}>
                        Select a podcast Image
                    </div>
                    <Input
                        id={"image"}
                        type={"file"}
                        disabled={isLoading}
                        accept={"image/*"}
                        {...register("image", {required: true})}
                    />
                </div>
                <ReButton disabled={isLoading} type={"submit"}>
                    Create
                </ReButton>
            </form>
        </Modal>
    )
}

export default UploadModal;