import { Orelega_One } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Orelega_One({
    subsets: ["cyrillic"],
    weight: ["400"],
})

interface HeaderProps {
};

export const Header = ({
}: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <h1 className={cn("text-3xl font-semibold text-center", font.className)}>
                Добавление решения
            </h1>
        </div>
    )

}