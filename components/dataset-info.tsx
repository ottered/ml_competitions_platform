import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";

interface DatasetInfoProps {
    dataset?: {id?: string, file?: string, title?: string, description?: string, userId?: string, userName?: string | null}

}

export const DatasetInfo = ({
    dataset
}: DatasetInfoProps) => {
    return (
        <Card className="w-[800px] shadow-md">
            <CardContent className="space-y-4">
                <div className="h-2"/>
                <div className="flex flex-row items-start justify-between rounded-lg border p-3 shadow-sm">
                    <div className="flex flex-col items-start">
                        <p className="text-sm flex-row font-medium justify-between items-center">
                            Набор данных <text className="font-bold">{dataset?.title}</text> 
                        </p>
                        <p className="truncate text-xs max-w-[180px] font-mono p-1 text-stone-500">
                            {`@${dataset?.id}`}
                        </p>
                    </div>
                    <div className="flex flex-col items-end">
                        <p className="text-sm flex-row font-medium justify-between items-center">
                            Выложен пользователем <text className="font-bold">{dataset?.userName}</text> 
                        </p>
                        <p className="truncate text-xs max-w-[180px] font-mono p-1 text-stone-500">
                            {`@${dataset?.userId}`}
                        </p>
                    </div>
                </div>
                <div>
                    <Link href={`/datasets/${dataset?.id}`}>
                        <Button className="w-full">
                            Подробнее
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}