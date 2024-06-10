import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Orelega_One } from "next/font/google";
import Link from "next/link";
import { FaTable } from "react-icons/fa";
import { GiPodiumWinner } from "react-icons/gi";
import { MdLeaderboard } from "react-icons/md";

const font = Orelega_One({
    subsets: ["cyrillic"],
    weight: ["400"],
})

const AboutPage = async () => {
    return (
        <>
            <div className={cn("text-4xl font-semibold text-center", font.className)}>
                {'О сайте'}
            </div>
            <Card className="w-[800px] items-center">
                <CardContent className="items-center">
                    <div className="h-4"/>
                    <div className="text-center">
                        Данный веб-сайт представляет собой платформу для соревнований по машинному обучению. Платформа предлагает пользователям 
                        организовывать соревнования и принимать в них участие, а также загружать наборы данных не имеющие отношения к создаваемым 
                        соревнованиям. Для ознакомления с правилами перейдите к интересующему вас действию:
                    </div>
                    <div className="h-4"/>
                    <div className="flex flex-row items-center justify-center gap-x-8">
                        <div className="w-[250px] h-[300px] bg-slate-200 flex flex-col items-center justify-center rounded-xl">
                            <p className={cn("text-md font-semibold text-center", font.className)}>
                                Информация о проведении соревнований
                            </p>
                            <GiPodiumWinner className="w-[180px] h-[180px]"/>
                            <Button asChild variant={"default"} className="w-[200px]">
                                <Link href='/competitions/about'>
                                    Перейти
                                </Link>
                            </Button>
                        </div>
                        <div className="w-[240px] h-[300px] bg-slate-200 flex flex-col items-center justify-center rounded-xl">
                            <p className={cn("text-md font-semibold text-center", font.className)}>
                                Информация о загрузке наборов данных
                            </p>
                            <FaTable className="w-[180px] h-[180px]"/>
                            <Button asChild variant={"default"} className="w-[200px]">
                                <Link href='/datasets/about'>
                                    Перейти
                                </Link>
                            </Button>
                        </div>
                        <div className="w-[240px] h-[300px] bg-slate-200 flex flex-col items-center justify-center rounded-xl">
                            <p className={cn("text-md font-semibold text-center", font.className)}>
                                Информация о загрузке решений
                            </p>
                            <MdLeaderboard className="w-[180px] h-[180px]"/>
                            <Button asChild variant={"default"} className="w-[200px]">
                                <Link href='/submissions_about'>
                                    Перейти
                                </Link>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default AboutPage;