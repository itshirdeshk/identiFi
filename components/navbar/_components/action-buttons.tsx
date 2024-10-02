'use client'
import React, { useEffect, useState } from "react"
import { usePrivy, useWallets } from "@privy-io/react-auth"

import { Button } from "@/components/ui/button"

import { X, AlignJustify } from "lucide-react"
import Link from "next/link"
import { getUserByAddress } from "../../../utils/queries"
import DropdownMenu from "./drop-down-menu"

const ActionButtons = () => {
    const { ready, authenticated, login, logout } = usePrivy();
    const { wallets } = useWallets();

    const [isDropDownVisible, setDropDownVisible] = useState(false);
    const [UserInfo, setUserInfo] = useState("");

    const toggleDropDown = () => {
        setDropDownVisible(!isDropDownVisible);
    }

    const closeDropDown = () => {
        setDropDownVisible(false);
    }

    useEffect(() => {
        const getuserInfo = async () => {
            let userInfo = ready && (await getUserByAddress(wallets[0].address)) as any;
            setUserInfo(userInfo);
        }
        getuserInfo();

    }, [ready, authenticated])

    return (
        <div className="pr-2">
            <div className="items-center justify-center flex">
                <div className="flex xl:space-x-4">
                    {authenticated && UserInfo !== 'User does not exist.' ? (
                        <>
                            <Link href="/dashboard" className="lg:flex items-center hidden"><div>Dashboard</div>

                                <div className="font-thin lg:flex ml-4 mr-0 items-center hidden">
                                    |
                                </div>
                            </Link>
                        </>
                    ) : authenticated && UserInfo == 'User does not exist.' ? (
                        <>
                            <Link href="/onboard" className="lg:flex items-center hidden"><div>Get DID</div>

                                <div className="font-thin lg:flex ml-4 mr-0 items-center hidden">
                                    |
                                </div>
                            </Link>
                        </>
                    ) : ("")}
                </div>
                <div className="flex lg:space-x-2 items-center pr-4">
                    <Link href={'/free'}>
                        <Button variant={'outline'} className="lg:flex items-center hidden border-none text-md"></Button>
                    </Link>
                    {authenticated ? (
                        <Button className="hidden lg:block" onClick={logout}>Disconnect</Button>
                    ) : (<Button className="hidden lg:block" onClick={login}>Connect</Button>)}
                </div>
            </div>
            {isDropDownVisible && (
                <div
                    onClick={toggleDropDown}
                    className="rounded-full xl:hidden"
                >
                    <X className="h-5 w-5  items-center justify-center rounded-full" />
                </div>
            )}
            {!isDropDownVisible && (
                <div onClick={toggleDropDown} className="flex lg:hidden">
                    <AlignJustify className="h-6 w-6 items-center justify-center mr-2" />
                </div>
            )}

            {isDropDownVisible && <DropdownMenu onClose={closeDropDown} />}
        </div>
    )
}

export default ActionButtons;