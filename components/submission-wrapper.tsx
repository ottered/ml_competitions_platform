"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Header } from "./submission-header";
import { BackButton } from "./auth/back-button";


interface CardWrapperProps {
    children: React.ReactNode;
    backButtonLabel: string;
    backButtonHref: string;
};

export const CardWrapper = ({
    children,
    backButtonLabel,
    backButtonHref,
}: CardWrapperProps) => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header/>
            </CardHeader>
            <CardContent>
                { children }
            </CardContent>
            <CardFooter>
                <BackButton label={backButtonLabel} href={backButtonHref} />
            </CardFooter>
        </Card>
    )
}