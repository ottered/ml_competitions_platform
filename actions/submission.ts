"use server";

import { SubmissionSchema } from '@/schemas';
import * as z from 'zod';
import { db } from "@/lib/db";


export const submission = async (values: z.infer<typeof SubmissionSchema>) => {
    const validatedFields = SubmissionSchema.safeParse(values);
    if(!validatedFields.success) {
        return { error: 'Заполните все поля!'};
    }

    const {userName, userId, userRole, userEmail, competitionId, file, resultBefore, resultAfter, status} = validatedFields.data;

    if(file === "") {
        return { error: 'Загрузите файл'};
    }

    await db.submission.create({
        data: {
            userName, userId, userRole, userEmail, competitionId, file, resultBefore, resultAfter, status
        }
    });

    return {success: "Заявка на участие в соревновании отправлена"};
};