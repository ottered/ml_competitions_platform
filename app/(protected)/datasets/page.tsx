import { CreateDatasetButton } from "@/components/auth/create-dataset-button";
import { DatasetInfo } from "@/components/dataset-info";
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

const prisma = new PrismaClient();
const items = (await db.dataset.findMany({ where: {status: 'ACCEPTED'} })).map(item => <DatasetInfo dataset={item} />).reverse()





const DatasetsPage = async () => {
    return (
        <><div className="flex flex-row items-center gap-x-5">
            <div className={cn("text-4xl font-semibold text-center", font1.className)}>
                {'Доступные наборы данных'}
            </div>
            <CreateDatasetButton>
                <Button variant="outline" size="icon">
                        <IoMdAdd size="lg"/>
                </Button>
            </CreateDatasetButton>
        </div>
        {items.length === 0 && <p className="text-xl">Наборов данных ещё нет!</p>}
        <>
        <ScrollArea className=" max-h-[700px] rounded-md border items-center justify-center p-4 bg-white">
            <div className="flex flex-row gap-x-10 items-end">
                {items}
            </div>
        </ScrollArea></></>
    )

        
}

export default DatasetsPage;