"use client";

import { useRouter } from "next/navigation";

interface CreateDatasetButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect",
    asChild?: boolean,
}

export const CreateDatasetButton = ({
    children,
    mode = 'redirect',
    asChild
}:CreateDatasetButtonProps) => {
    const router = useRouter();
    const onClick = () => {
        router.push('/datasets/create');
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