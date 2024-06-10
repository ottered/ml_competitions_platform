"use client";

import { FaUser } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "./logout-button";
import { ExitIcon, GearIcon } from "@radix-ui/react-icons";
import { SettingsButton } from "./settings-button";

export const UserButton = () => {
    const user = useCurrentUser();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src = {user?.image || '' }/>
                    <AvatarFallback className='bg-[radial-gradient(_var(--tw-gradient-stops))] from-white to-slate-500'>
                        <FaUser className="text-black" />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align = 'end'>
                <LogoutButton>
                    <DropdownMenuItem>
                        <ExitIcon className="h-4 w-4 mr-2"/>
                        Выйти
                    </DropdownMenuItem>
                </LogoutButton>
                <SettingsButton>
                    <DropdownMenuItem>
                        <GearIcon className="h-4 w-4 mr-2"/>
                        Настройки
                    </DropdownMenuItem>
                </SettingsButton>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}