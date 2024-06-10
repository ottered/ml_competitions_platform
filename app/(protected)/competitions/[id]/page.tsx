import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { db } from "@/lib/db"
import Link from "next/link"
import * as fs from 'fs';
import csvParser from 'csv-parser'
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react"
import { SubmissionInfoBefore } from "@/components/submission-info-before"
import { stringify } from 'csv-stringify';
import { SubmissionInfoAfter } from "@/components/submission-info-after"
import InfiniteScroll from 'react-infinite-scroll-component'
import { ScrollArea } from "@/components/ui/scroll-area"


function readCsvFile(filePath: string): Promise<any[]> {
  return new Promise<any[]>((resolve, reject) => {
    const results: any[] = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data: any) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error: any) => reject(error));
  });
}
  
const Tabulate = ( {arr} : {arr:any} ) => {
    const cols = Object.keys(arr[0])

    const header = () => {
        return cols.map(e => <th key={e} align="left" style={style}>{e}</th>).slice(0,5)
    }

    const style = {
        borderBottom: '1px solid #ddd',
        padding: '5px'
      };
    const colCount = () => {
        const colCount = cols.map(e => <th key={e} align="left" style={style}>{e}</th>).length - 5 
        if (colCount > 0)
        return <div> + {colCount} столбца </div>
        else return;
    }
    return (
        <div className="flex flex-row items-center justify-center gap-x-4">
            <table className="table">
                <tbody>
                    <tr>{header()}</tr>
                    {arr.map((row: { [x: string]: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined }) => 
                        <tr>
                            {cols.map(col => <td key={col} align="left" style={style}>{row[col]}</td>).slice(0,5)}
                        </tr>
                    )}
                </tbody>
            </table>
            <div>
                {colCount()}
            </div>
        </div>

    )
}

export default async function SingleCompetitionPage({params: {id},}: {params: { id: string}}) {
    const competition = await db.competition.findUnique({ where: { id }})
    const competitionId = competition?.id
    const submissionsBefore = await (await db.submission.findMany({where: {competitionId, status: 'ACCEPTED'}})).sort((a, b) => parseFloat(a.resultBefore) - parseFloat(b.resultBefore)).map(item => <SubmissionInfoBefore submission={item} />)
    const submissionsAfter = await (await db.submission.findMany({where: {competitionId, status: 'ACCEPTED'}})).sort((a, b) => parseFloat(a.resultAfter) - parseFloat(b.resultAfter)).map(item => <SubmissionInfoAfter submission={item} />)
    const session = await auth();
    const userId = JSON.stringify(session?.user.id).replace('"', '').replace('"', '')
    const userRole = JSON.stringify(session?.user.role).replace('"', '').replace('"', '')
    const testFile = await readCsvFile(`public/test_user/user_${competition?.testFile.substring(12)}`);
    const fileLength = Object.keys(testFile[0]).length
    interface AnyObject {
        [key: string]: any;
    }
    const columnsToRemove = [fileLength - 1]; 
    const testUser = testFile.map((item) =>
        Object.keys(item).reduce((acc, key, index) => {
            if (!columnsToRemove.includes(index)) {
                acc[key] = item[key];
            }
            return acc;
        }, {} as AnyObject)
    );
    const validationFile = testFile.map((item) =>
        Object.keys(item)
            .filter((key, index) => index < 1 || index > fileLength - 2)
            .reduce((acc, key) => {
                acc[key] = item[key];
                return acc;
            }, {} as AnyObject)
    );

    stringify(testUser, { header: true }, (err, output) => {
        if (err) {
          console.error('Ошибка при преобразовании в CSV:', err);
          return;
        }
        const fs = require('fs');
        fs.writeFile(`public/test_user/user_${competition?.testFile.substring(12)}`, output, (err: any) => {
          if (err) {
            console.error('Ошибка при записи в файл:', err);
            return;
          }
        });
      });
    stringify(validationFile, { header: true }, (err, output) => {
        if (err) {
          console.error('Ошибка при преобразовании в CSV:', err);
          return;
        }
        const fs = require('fs');
        fs.writeFile(`public/validation/validation_${competition?.testFile.substring(17)}`, output, (err: any) => {
          if (err) {
            console.error('Ошибка при записи в файл:', err);
            return;
          }
        });
      });
    const downloadName = `https://contest.nanger.ru/datasets${competition?.file.substring(11)}`
    const downloadTest = `https://contest.nanger.ru/test_user/user_${competition?.testFile.substring(12)}`
    const data = await readCsvFile(`public/datasets/${competition?.file.substring(12)}`);
    return (
        <Card className="w-[1400px] shadow-md">
            <CardContent className="space-y-4" >
                <div className="h-2"/>
                <div className="rounded-lg border p-3 shadow-sm">
                    <div className="flex flex-col items-center gap-y-4">
                        <div className="flex flex-col items-center gap-y-4">
                            <Tabulate arr={data.slice(0,5)} />
                            + {data.length - 5} строка
                        </div>
                        <div className="flex flex-row gap-x-4">
                            <div>
                                <a target="_blank" href={downloadName} rel="noopener noreferrer">
                                    <Button>
                                        Скачать обучающий набор данных
                                    </Button>
                                </a>
                            </div>
                            <div>
                                <a target="_blank" href={downloadTest} rel="noopener noreferrer">
                                    <Button>
                                        Скачать тестовый набор данных
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="h-2"/>
                    <div className="flex flex-row justify-between">  
                        <div className="flex flex-col items-start">
                            <p className="text-sm flex-row font-medium justify-between items-center">
                                <text className="font-bold">{competition?.title}</text> 
                            </p>
                            <p className="truncate text-xs max-w-[180px] font-mono text-stone-500">
                                {`@${competition?.id}`}
                            </p>
                        </div>
                        <div className="flex flex-col items-end">
                            <p className="text-sm flex-row font-medium justify-between items-center">
                                Организовано <text className="font-bold">{competition?.userName}</text> 
                            </p>
                            <p className="truncate text-xs max-w-[180px] font-mono text-stone-500">
                                {`@${competition?.userId}`}
                            </p>
                            <p className="truncate text-xs max-w-[180px] font-mono text-stone-500">
                                {competition?.userEmail}
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
                    <div className="flex flex-row items-center justify-center">
                        Метрика определения результата - {competition?.metric}
                    </div>
                    <div className='font-bold justify-between flex'>
                        <div>Описание</div>
                        <div>Таблица лидеров</div>
                    </div>
                    <div className="h-2"/>
                    <div className=" space-x-2 text-sm flex justify-between">
                        <div className="w-[600px]">
                            {competition?.description}
                        </div>
                        {submissionsBefore.length === 0 && <div className=" text-right">Участников еще нет!</div>}
                        {submissionsBefore.length > 0 && 
                            <div className="flex flex-row space-x-2">
                                {competition?.endDate !== null && competition?.endDate !== undefined && competition?.endDate < new Date() &&
                                    <div className="flex flex-col space-y-2">
                                        <div className=" font-bold text-center">
                                            Скрытая выборка
                                        </div>
                                        <ScrollArea className="h-[200px] w-[365px] rounded-md border items-center justify-center p-4">
                                            <div className="gap-y-2 flex flex-col">
                                                {submissionsAfter}
                                            </div>
                                        </ScrollArea>
                                    </div>
                                }
                                <div className="flex flex-col space-y-2">
                                    <div className=" font-bold text-center">
                                        Открытая выборка
                                    </div>
                                    <ScrollArea className="h-[200px] w-[365px] rounded-md border items-center justify-center p-4">
                                        <div className="gap-y-2 flex flex-col">
                                            {submissionsBefore}
                                        </div>
                                    </ScrollArea>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                {userId !== competition?.userId && userRole !== 'ADMIN' && (competition?.endDate === null || competition?.endDate === undefined || competition?.endDate > new Date()) &&
                    <div>
                        <Link href={`/competitions/${competition?.id}/submission`}>
                            <Button className="w-full">
                                Принять участие
                            </Button>
                        </Link>
                    </div>
                }  
            </CardContent>
        </Card>
    )
}

