import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { db } from "@/lib/db"
import * as fs from 'fs';
import csvParser from 'csv-parser'
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react"

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



export default async function SingleDatasetPage({params: {id},}: {params: { id: string}}) {
    const dataset = await db.dataset.findUnique({ where: { id }})
    const downloadName = `https://contest.nanger.ru/datasets${dataset?.file.substring(11)}`
    const data = await readCsvFile(`public/datasets/${dataset?.file.substring(12)}`);
    return (
        <Card className="w-[1100px] shadow-md">
            <CardContent className="space-y-4" >
                <div className="h-2"/>
                <div className="rounded-lg border p-3 shadow-sm">
                    <div className="flex flex-col items-center gap-y-4">
                        <div className="flex flex-col items-center gap-y-4">
                            <Tabulate arr={data.slice(0,5)} />
                            + {data.length - 5} строка
                        </div>
                        <div>
                            <a target="_blank" href={downloadName} rel="noopener noreferrer">
                                <Button>
                                    Скачать набор данных
                                </Button>
                            </a>
                        </div>
                    </div>
                    <div className="h-2"/>
                    <div className="flex flex-row justify-between">  
                        <div className="flex flex-col items-start">
                            <p className="text-sm flex-row font-medium justify-between items-center">
                                <text className="font-bold">{dataset?.title}</text> 
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
                    <div className="h-2"/>
                    <div className='font-bold justify-between flex'>
                        <div>Описание</div>
                    </div>
                    <div className=" space-x-2 text-sm flex justify-between">
                        <div>
                            {dataset?.description}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

