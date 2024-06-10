import { db } from "@/lib/db"
import csvParser from "csv-parser";
import * as fs from 'fs';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FaUser } from "react-icons/fa";
import { boolean, number } from "zod";

interface SubmissionInfoBeforeProps {
    submission?: {id?: string, file: string, userId?: string, userName?: string | null, competitionId?: string}

}

function calculateMAE(array1: number[], array2: number[]): number {
    if (array1.length !== array2.length) {
      console.log(array1.length)
      console.log(array2.length)
      throw new Error("Длины массивов должны совпадать!");
    }
  
    const n = array1.length;
    let totalError = 0;
  
    for (let i = 0; i < n; i++) {
      const error = Math.abs(array1[i] - array2[i]);
      totalError += error;
    }
  
    const mae = totalError / n;
    return mae;
}

function calculateMAPE(array1: number[], array2: number[]): number {
  if (array1.length !== array2.length) {
    throw new Error("Длины массивов должны совпадать!");
  }

  const n = array1.length;
  let totalErrorPercentage = 0;

  for (let i = 0; i < n; i++) {
    const errorPercentage = Math.abs((array1[i] - array2[i]) / array2[i]);
    totalErrorPercentage += errorPercentage;
  }

  const mape = totalErrorPercentage / n;
  return mape;
}

function calculateMSE(array1: number[], array2: number[]): number {
  if (array1.length !== array2.length) {
    throw new Error("Длины массивов должны совпадать!");
  }

  const n = array1.length;
  let totalErrorSquared = 0;

  for (let i = 0; i < n; i++) {
    const error = array1[i] - array2[i];
    const squaredError = error * error;
    totalErrorSquared += squaredError;
  }

  const mse = totalErrorSquared / n;
  return mse;
}

function calculateAccuracy(arr1: any[], arr2: any[]): number {
  if(arr1.length !== arr2.length) {
    throw new Error('Массивы должны иметь одинаковую длину');
  }

  let correctCount = 0;

  for(let i = 0; i < arr1.length; i++) {
    if(arr1[i] === arr2[i]) {
      correctCount++;
    }
  }

  return correctCount / arr1.length;
}

function calculateF1(predictions: boolean[], labels: boolean[]): number {
  let TP = 0;
  let FP = 0;
  let FN = 0;

  predictions.forEach((prediction, index) => {
    if (prediction && labels[index]) {
      TP++;
    } else if (prediction && !labels[index]) {
      FP++;
    } else if (!prediction && labels[index]) {
      FN++;
    }
  });

  const precision = TP / (TP + FP);
  const recall = TP / (TP + FN);

  const f1 = 2 * (precision * recall) / (precision + recall);
  return f1;
}

function calculateAUC(labels: number[], predictions: number[]): number {
  const pairs = labels.map((label, i) => [label, predictions[i]]);

  pairs.sort((a, b) => a[1] - b[1]);

  let tp = 0;
  let fp = 0;
  let auc = 0;

  for (const [label, prediction] of pairs) {
    if (label === 1) {
      tp += 1;
    } else {
      fp += 1;
      auc += tp;
    }
  }

  const totalPositives = labels.filter(label => label === 1).length;
  const totalNegatives = labels.length - totalPositives;

  if (totalPositives === 0 || totalNegatives === 0) {
    return NaN;
  }

  auc /= totalPositives * totalNegatives;

  return auc;
}


function readCsvFile(filePath: string): Promise<any[]> {
    return new Promise<number[]>((resolve, reject) => {
      const results: any[] = [];
  
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (data: any) => results.push(data))
        .on('end', () => {
            const firstColumn = results.map(row => row[Object.keys(row)[1]]);
            resolve(firstColumn);
          })
        .on('error', (error: any) => reject(error));
    });
  }


export const SubmissionInfoBefore = async ({submission}: SubmissionInfoBeforeProps) => {
    const competitionId = submission?.competitionId
    const submissionId = submission?.id
    const userId = submission?.userId
    const competition = await db.competition.findUnique({ where: { id: competitionId }})
    const user = await db.user.findUnique({ where: { id: userId }})
    const userData =  (await readCsvFile(`public/submissions/${submission?.file.substring(12)}`))
    const validationData = (await readCsvFile(`public/validation/validation_${competition?.testFile.substring(17)}`))
    let resultBefore = 0
    let resultAfter = 0
    const validationDataBefore = validationData.slice(0, validationData.length/2)
    const userDataBefore = userData.slice(0, userData.length/2)
    const validationDataAfter = validationData.slice(validationData.length/2 + 1, validationData.length)
    const userDataAfter = userData.slice(userData.length/2 + 1, userData.length)
    const endDate = competition?.endDate

    if (competition?.metric === 'MAE') {
      resultBefore = calculateMAE(validationDataBefore.map(Number), userDataBefore.map(Number))
      resultAfter = calculateMAE(validationDataAfter.map(Number), userDataAfter.map(Number))
    }
    else if (competition?.metric === 'MAPE') {
      resultBefore = calculateMAPE(validationDataBefore.map(Number), userDataBefore.map(Number))
      resultAfter = calculateMAPE(validationDataAfter.map(Number), userDataAfter.map(Number))
    }
    else if (competition?.metric === 'MSE') {
      resultBefore = calculateMSE(validationDataBefore.map(Number), userDataBefore.map(Number))
      resultAfter = calculateMSE(validationDataAfter.map(Number), userDataAfter.map(Number))
    }
    else if (competition?.metric === 'Accuracy') {
      resultBefore = calculateAccuracy(validationDataBefore.map(Number), userDataBefore.map(Number))
      resultAfter = calculateAccuracy(validationDataAfter.map(Number), userDataAfter.map(Number))
    }
    else if (competition?.metric === 'F1') {
      resultBefore = calculateF1(validationDataBefore.map(Boolean), userDataBefore.map(Boolean))
      resultAfter = calculateF1(validationDataAfter.map(Boolean), userDataAfter.map(Boolean))
    }
    else if (competition?.metric === 'AUC') {
      resultBefore = calculateAUC(validationDataBefore.map(Number), userDataBefore.map(Number))
      resultAfter = calculateAUC(validationDataAfter.map(Number), userDataAfter.map(Number))
    }
    await db.submission.update({where: {id: submissionId}, data: {resultBefore: JSON.stringify(resultBefore), resultAfter: JSON.stringify(resultAfter)}})
    if (await (await db.submission.findMany({where: {competitionId, userId}})).length > 1) {
      const [earlierObject, laterObject] = await db.submission.findMany({
        where: {
          competitionId: competitionId, 
          userId: userId
        },
        orderBy: {
            createdAt: 'asc'
        },
        take: 2
      });

      if (earlierObject) {
        await db.submission.deleteMany({
            where: {
                id: earlierObject.id
            }
        });
      }
    }
    let result = 0
      
    return (
      <div className="flex flex-row">
        <div className="rounded-lg border p-3 shadow-sm w-[330px] h-[65px]">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center justify-center space-x-2">
              <div>
                  <Avatar className="h-8 w-8">
                      <AvatarImage src = {user?.image || '' }/>
                      <AvatarFallback className='bg-[radial-gradient(_var(--tw-gradient-stops))] from-white to-slate-500'>
                          <FaUser className="text-black" />
                      </AvatarFallback>
                  </Avatar>
              </div>
              <div className="flex flex-col items-start">
                      <p className="text-black font-bold">
                          {`${user?.name}`}
                      </p>
                      <p className=" text-xs">
                          {`@${user?.id}`}
                      </p>
              </div>
            </div>
            <div>
              {JSON.stringify(resultBefore).substring(0,8)}
            </div>
          </div>
        </div>
      </div>
    )
}