import { CreateCompetitionButton } from "@/components/auth/create-competition-button";
import { CompetitionInfo } from "@/components/competition-info";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { PrismaClient } from "@prisma/client";
import { Merriweather, Orelega_One } from "next/font/google"
import { IoMdAdd } from "react-icons/io";

const font = Orelega_One({
    subsets: ["cyrillic"],
    weight: ["400"],
})

const font1 = Merriweather({
    subsets: ["cyrillic", "latin"],
    weight: ["700"], 
})

const items = (await db.competition.findMany({ where: {status: 'ACCEPTED'} })).map(item => <CompetitionInfo competition={item} />).reverse()

const CompetitionsPage = async () => {
    return (
        <><div className="flex flex-row items-center gap-x-5">
            <div className={cn("text-4xl font-semibold text-center", font1.className)}>
                {'Доступные соревнования'}
            </div>
            <CreateCompetitionButton>
                <Button variant="outline" size="icon">
                    <IoMdAdd size="lg" />
                </Button>
            </CreateCompetitionButton>
        </div>
        <ScrollArea className=" max-h-[700px] rounded-md border items-center justify-center p-4 bg-white">
            <div className="flex flex-row gap-x-10 items-end">
                {items}
            </div>
        </ScrollArea></>
    )

        
}

export default CompetitionsPage;