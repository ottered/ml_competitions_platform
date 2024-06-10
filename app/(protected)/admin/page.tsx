import { AdminInfo } from "@/components/admin-info";
import { Card, CardHeader } from "@/components/ui/card";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { Orelega_One } from "next/font/google";

const font = Orelega_One({
    subsets: ["cyrillic"],
    weight: ["400"],
})

const AdminPage = async () => {
    const competitions = (await db.competition.findMany({ where: {status: 'PENDING'}})).map(item => <AdminInfo competition={item} />)
    const datasets = (await db.dataset.findMany({ where: {status: 'PENDING'} })).map(item => <AdminInfo dataset={item} />)
    const submissions = (await db.submission.findMany({ where: {status: 'PENDING'} })).map(item => <AdminInfo submission={item} />)
    return (
        <Card className="w-[1700px] items-center">
            <CardHeader className="items-center">
                <p className={cn("text-4xl font-semibold text-center", font.className)}>
                    Панель управления
                </p>
                <div className="flex flex-row gap-x-10 gap-y-5">
                    <div className="flex flex-col gap-y-5 items-center text-xl font-semibold w-[500px]">
                        Соревнования
                        {competitions.length === 0 && <p className="text-md">Непринятых соревнований нет!</p>}
                        {competitions}
                    </div>
                    <div className="flex flex-col gap-y-5 items-center text-xl font-semibold w-[500px]">
                        Наборы данных
                        {datasets.length === 0 && <p className="text-md">Непринятых наборов данных нет!</p>}
                        {datasets}
                    </div>
                    <div className="flex flex-col gap-y-5 items-center text-xl font-semibold w-[500px]">
                        Запросы на участие
                        {submissions.length === 0 && <p className="text-md">Непринятых запросов нет!</p>}
                        {submissions}
                    </div>
                </div>
            </CardHeader>
        </Card>
    )
}

export default AdminPage;