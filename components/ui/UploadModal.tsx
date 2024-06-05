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
import Select from "react-select";
import DescriptionBox from "@/components/ui/DescriptionBox";

const UploadModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const uploadModal = useUploadModal();
    const {user} = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const {
        reset,
        handleSubmit,
        register,
        setValue,
        watch
    } = useForm<FieldValues>({
        defaultValues: {
            author: "",
            title: "",
            description: "",
            category: [], // Change to an array for multi-select
            podcast: null,
            image: null,
        }
    });

    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            uploadModal.onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);

            const imageFile = values.image?.[0];
            const podcastFile = values.podcast?.[0];

            if (!imageFile || !podcastFile || !user) {
                toast.error("Missing fields");
                setIsLoading(false);
                return;
            }

            const uniqueID = uniqid();

            // Upload Podcast
            const { data: podcastData, error: podcastError } = await supabaseClient
                .storage
                .from("podcasts")
                .upload(`podcasts-${values.title}-${uniqueID}`, podcastFile, {
                    cacheControl: "3600",
                    upsert: false,
                });

            if (podcastError) {
                setIsLoading(false);
                return toast.error("Failed to upload podcast");
            }

            // Upload Image
            const { data: imageData, error: imageError } = await supabaseClient
                .storage
                .from("images")
                .upload(`images-${values.title}-${uniqueID}`, imageFile, {
                    cacheControl: "3600",
                    upsert: false,
                });

            if (imageError) {
                setIsLoading(false);
                return toast.error("Failed to upload image");
            }

            const { error: supabaseError } = await supabaseClient
                .from("podcasts")
                .insert({
                    user_id: user.id,
                    title: values.title,
                    description: values.description,
                    author: values.author,
                    category: values.category.map((cat: any) => cat.value), // Save selected categories
                    img: imageData.path,
                    url: podcastData.path

                });

            if (supabaseError) {
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }

            router.refresh();
            setIsLoading(false);
            toast.success("Podcast uploaded successfully");
            reset();
            uploadModal.onClose();
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    const categories = [
        { value: 'technology', label: 'Technology' },
        { value: 'education', label: 'Education' },
        { value: 'health', label: 'Health' },
        { value: 'business', label: 'Business' },
        // Add more categories as needed
    ];


    // Style for Select component
    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            backgroundColor: '#404040',
            borderColor: 'transparent',
            fontSize: '0.9rem',
            padding: '0.3rem',
            borderRadius: '0.375rem',
            ':hover': {
                borderColor: '#3f3f3f',
            }
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#3f3f3f' : '#525252',
            color: state.isSelected ? '#d4d4d4' : '#a3a3a3',
            ':hover': {
                backgroundColor: '#3f3f3f',
                color: '#d4d4d4',
            }
        }),
        menu: (provided: any) => ({
            ...provided,
            backgroundColor: '#525252',
        }),
        multiValue: (provided: any) => ({
            ...provided,
            backgroundColor: '#3f3f3f',
        }),
        multiValueLabel: (provided: any) => ({
            ...provided,
            backgroundColor: '#363636',
            color: '#d4d4d4',
        }),
        multiValueRemove: (provided: any) => ({
            ...provided,
            backgroundColor: '#363636',
            color: '#d4d4d4',
            ':hover': {
                backgroundColor: '#525252',
                color: '#a3a3a3',
            }
        }),
        placeholder: (provided: any) => ({
            ...provided,
            color: '#a3a3a3',
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: '#d4d4d4',
        }),
        input: (provided: any) => ({
            ...provided,
            color: '#d4d4d4',
        }),
        indicatorSeparator: (provided: any) => ({
            ...provided,
            backgroundColor: '#404040',
        }),
    };

    return (
        <Modal
            title={"Add a podcast"}
            description={"Upload a mp3 file"}
            isOpen={uploadModal.isOpen}
            onChange={onChange}
        >
            <form onSubmit={handleSubmit(onSubmit)}
                  className={"flex flex-col gap-y-4"}>
                {/* title */}
                <label htmlFor="title">Podcast title</label>
                <Input
                    id={"title"}
                    disabled={isLoading}
                    {...register("title", { required: true })}
                    placeholder={"Podcast title"}
                />
                {/* author */}
                <label htmlFor="author">Podcast author</label>
                <Input
                    id={"author"}
                    disabled={isLoading}
                    {...register("author", { required: true })}
                    placeholder={"Podcast author"}
                />
                {/* Description */}
                <label htmlFor="description">Description</label>
                <DescriptionBox
                    id={"description"}
                    disabled={isLoading}
                    {...register("description", { required: true })}
                    placeholder={"Description"}
                />
                {/* Podcast category */}
                <label htmlFor="category">Select category</label>
                <Select
                    options={categories}
                    isDisabled={isLoading}
                    onChange={(option) => setValue('category', option)}
                    isMulti
                    styles={customStyles}
                    placeholder="Select categories"
                />
                {/* Podcast file */}
                <div>
                    <label htmlFor="podcast">Select a podcast file</label>
                    <Input
                        id={"podcast"}
                        type={"file"}
                        disabled={isLoading}
                        accept={".mp3"}
                        {...register("podcast", { required: true })}
                    />
                </div>
                {/* Podcast image file */}
                <div>
                    <label htmlFor="image">Select a podcast Image</label>
                    <Input
                        id={"image"}
                        type={"file"}
                        disabled={isLoading}
                        accept={"image/*"}
                        {...register("image", { required: true })}
                    />
                </div>
                <ReButton disabled={isLoading} type={"submit"}>
                    {isLoading ? 'Uploading...' : 'Create'}
                </ReButton>
            </form>
        </Modal>
    )
}

export default UploadModal;
