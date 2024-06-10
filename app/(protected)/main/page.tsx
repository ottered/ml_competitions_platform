"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import { Orelega_One, Merriweather} from "next/font/google";
import Link from "next/link";
import { FaInfoCircle, FaTable } from "react-icons/fa";
import { GiPodiumWinner } from "react-icons/gi";

const font = Orelega_One({
    subsets: ["cyrillic"],
    weight: ["400"],
})

const font1 = Merriweather({
    subsets: ["cyrillic", "latin"],
    weight: ["700"], 
})



const MainPage = () => {
    const user = useCurrentUser();
    if (!user) window.location.reload();
    
    return (
        <><div className={cn("text-4xl font-semibold text-center", font1.className)}>
            {`Добро пожаловать, ${user?.name}!`}
        </div>
        <div className="flex gap-x-10 justify-between items-center p-4">
                <><>
                    <Card className="w-[500px]">
                        <CardHeader className="items-center justify-center gap-y-6">
                            <p className={cn("text-3xl font-semibold text-center", font.className)}>
                                Соревнования
                            </p>
                            <GiPodiumWinner className="w-[200px] h-[200px]"/>
                        </CardHeader>
                        <CardContent>
                            <Button asChild variant={"default"} className="w-full">
                                <Link href='/competitions'>
                                    Перейти
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                    <>
                    </>
                    <Card className="w-[500px]">
                        <CardHeader className="items-center justify-center gap-y-6">
                            <p className={cn("text-3xl font-semibold text-center", font.className)}>
                                Наборы данных
                            </p>
                            <FaTable className="w-[200px] h-[200px]"/>
                        </CardHeader>
                        <CardContent>
                            <Button asChild variant={"default"} className="w-full">
                                <Link href='/datasets'>
                                    Перейти
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </><Card className="w-[500px]">
                        <CardHeader className="items-center justify-center gap-y-6">
                            <p className={cn("text-3xl font-semibold text-center", font.className)}>
                                О сайте
                            </p>
                            <FaInfoCircle className="w-[200px] h-[200px]"/>
                        </CardHeader>
                        <CardContent>
                            <Button asChild variant={"default"} className="w-full">
                                <Link href='/about'>
                                    Перейти
                                </Link>
                            </Button>
                        </CardContent>
                    </Card></>
            </div></>
    )
}

export default MainPage;