"use client";

import { FaGithub, FaGoogle } from "react-icons/fa";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
    const onClick = (provider: "github" | "google") => {
        signIn(provider, {callbackUrl: DEFAULT_LOGIN_REDIRECT})
    }
    return (
        <div className="flex items-center w-full gap-x-2">
            <Button size='lg' className="w-full" variant='outline' onClick={() => onClick("github")}>
                <FaGithub className="w-6 h-6"/>
            </Button>
            <Button size='lg' className="w-full" variant='outline' onClick={() => onClick("google")}>
                <FaGoogle className="w-6 h-6"/>
            </Button>
        </div>
    );
};
