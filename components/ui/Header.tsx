"use client"

import {useRouter} from "next/navigation";
import {twMerge} from "tailwind-merge";
import {RxCaretLeft, RxCaretRight} from "react-icons/rx";
import {HiHome, HiSearch, HiTrendingUp} from "react-icons/hi";
import ReButton from "./ReButton";
import useAuthModal from "@/hooks/useAuthModal";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {useUser} from "@/hooks/useUser";
import {FaUserAlt} from "react-icons/fa";
import toast from "react-hot-toast";

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({
         children,
         className
}) => {

    const authModal = useAuthModal();
    const router = useRouter();

    const supabaseClient = useSupabaseClient();
    const { user} = useUser();

    const handleLogout = async () => {
        const {error} = await supabaseClient.auth.signOut();

        // TODO: Reset any playing podcasts
        router.refresh();

        if (error) {
            toast.error(error.message);
        } else {
            toast.success("Logged out successfully");
        }
    }

    return (
        <div
            className={twMerge(`
        h-fit
        bg-gradient-to-b
        from-emerald-800
        p-6
        `,
                className
            )}
        >
            <div className="
          w-full
          mb-4
          flex
          items-center
          justify-between">
                <div className="
              hidden
              md:flex
              gap-x-2
              items-center">
                    <button
                        onClick={() => router.back()}
                        className={`
                    rounded-full
                    bg-black
                    flex
                    justify-center
                    items-center
                    hover:opacity-75
                    transition
                  `}>
                        <RxCaretLeft className={"text-white"} size={35}/>
                    </button>
                    <button
                        onClick={() => router.forward()}
                        className={`
                    rounded-full
                    bg-black
                    flex
                    justify-center
                    items-center
                    hover:opacity-75
                    transition
                  `}>
                        <RxCaretRight className={"text-white"} size={35}/>
                    </button>
                </div>
                <div className="flex md:hidden gap-x-2 items-center">
                    <button
                        className={`
                        rounded-full
                        p-2
                        bg-neutral-900
                        flex
                        items-center
                        justify-center
                        hover:opacity-75
                        transition
                    `}>
                        <HiHome className={"text-white"} size={24}/>
                    </button>
                    <button
                        className={`
                        rounded-full
                        p-2
                        bg-neutral-900
                        flex
                        items-center
                        justify-center
                        hover:opacity-75
                        transition
                    `}>
                        <HiSearch className={"text-white"} size={24}/>
                    </button>
                    <button
                        className={`
                        rounded-full
                        p-2
                        bg-neutral-900
                        flex
                        items-center
                        justify-center
                        hover:opacity-75
                        transition
                    `}>
                        <HiTrendingUp className={"text-white"} size={24}/>
                    </button>
                </div>
                <div className="
                    flex
                    gap-x-4
                    justify-between
                    items-center">
                    {user ? (
                        <div className={"flex gap-x-4 items-center"}>
                            <ReButton
                                onClick={handleLogout}
                                className={"bg-white px-6 py-2"}>
                                Logout
                            </ReButton>
                            <ReButton onClick={() => router.push('/account')}
                                      className={"bg-white"}>
                                <FaUserAlt/>
                            </ReButton>
                        </div>
                    ) : (
                    <>
                        <div>
                            <ReButton
                                onClick={authModal.onOpen}
                                className={"bg-transparent text-neutral-300 font-medium"}>
                                Sign Up
                            </ReButton>
                        </div>
                        <div>
                            <ReButton
                                onClick={authModal.onOpen}
                                className={"bg-white px-6 py-2"}>
                                Log In
                            </ReButton>
                        </div>
                    </>
                        )}
                </div>
            </div>
            {children}
        </div>
    )
}

export default Header;