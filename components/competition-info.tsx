import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import Link from "next/link";

interface CompetitionInfoProps {
    competition?: {id?: string, file?: string, title?: string, metric?: string, description?: string, userId?: string, userName?: string | null, prizePool: string, startDate: Date | null, endDate: Date | null}

}

export const CompetitionInfo = ({
    competition
}: CompetitionInfoProps) => {
    return (
        <Card className="w-[800px] shadow-md">
            <CardContent className="space-y-4">
                <div className="h-2"/>
                <div className="rounded-lg border p-3 shadow-sm">
                    <div className="flex flex-row justify-between">  
                        <div className="flex flex-col items-start">
                            <p className="text-sm flex-row font-medium justify-between items-center">
                                <text className="font-bold">{competition?.title}</text> 
                            </p>
                            <p className="truncate text-xs max-w-[180px] font-mono p-1 text-stone-500">
                                {`@${competition?.id}`}
                            </p>
                        </div>
                        <div className="flex flex-col items-end">
                            <p className="text-sm flex-row font-medium justify-between items-center">
                                Организован пользователем <text className="font-bold">{competition?.userName}</text> 
                            </p>
                            <p className="truncate text-xs max-w-[180px] font-mono p-1 text-stone-500">
                                {`@${competition?.userId}`}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-center text-sm">
                        {competition?.startDate === null && competition?.endDate !== null &&
                            <div>
                                {JSON.stringify(new Date()).substring(1,11).split("-").reverse().join(".")} {" - "}
                                {JSON.stringify(competition?.endDate).substring(1,11).split("-").reverse().join(".")}
                            </div>
                        }
                        {competition?.startDate !== null && competition?.endDate !== null &&
                            <div>
                                {JSON.stringify(competition?.startDate).substring(1,11).split("-").reverse().join(".")} {" - "}
                                {JSON.stringify(competition?.endDate).substring(1,11).split("-").reverse().join(".")}
                            </div>
                        }
                        {competition?.endDate === null && <div>Бессрочно</div>}
                    </div> 
                    <div className="flex flex-row items-center justify-center">
                        {competition?.prizePool}
                    </div>
                </div>
                <div>
                    <Link href={`/competitions/${competition?.id}`}>
                        <Button className="w-full">
                            Подробнее
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}