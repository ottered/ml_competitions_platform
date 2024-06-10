"use server";

import { CompetitionSchema } from '@/schemas';
import * as z from 'zod';
import { db } from "@/lib/db";


export const competition = async (values: z.infer<typeof CompetitionSchema>) => {
    const validatedFields = CompetitionSchema.safeParse(values);
    if(!validatedFields.success) {
        return { error: 'Заполните все поля!'};
    }

    const {userName, userId, userRole, userEmail, description, prizePool, startDate, endDate, metric, file, testFile, title, status} = validatedFields.data;

    if(userRole === "ADMIN") {
        return { error: 'Создание невозможно'};
    }

    if(title === "" || description === "" || prizePool === "" || file === "" || testFile === "")  {
        return { error: 'Заполните все обязательные поля'};
    }
    
    if(startDate !== undefined && endDate !== undefined) {
        if(startDate > endDate) {
            return { error: 'Дата начала соревнования должна быть раньше даты его конца'};
        }
    }
    
    if(startDate !== undefined && endDate !== undefined) {
        if(startDate === endDate) {
            return { error: 'Дата начала соревнования не должна совпадать с датой его конца'};
        }
    }

    await db.competition.create({
        data: {
           userName, userId, userRole, userEmail, description, prizePool, startDate, endDate, metric, file, testFile, title, status
        }
    });

    return {success: "Заявка на создание соревнования отправлена"};
};