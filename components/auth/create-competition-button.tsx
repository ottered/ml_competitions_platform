"use client";

import { useRouter } from "next/navigation";

interface CreateCompetitionButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect",
    asChild?: boolean,
}

export const CreateCompetitionButton = ({
    children,
    mode = 'redirect',
    asChild
}:CreateCompetitionButtonProps) => {
    const router = useRouter();
    const onClick = () => {
        router.push('/competitions/create');
    };
    if (mode === 'modal') {
        return (
            <span>
                Implement modal
            </span>
        )
    }
    return (
        <span onClick={onClick}className="cursor-pointer">
            {children}
        </span>
    )
}