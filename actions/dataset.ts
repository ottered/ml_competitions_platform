"use server";

import { DatasetSchema } from '@/schemas';
import * as z from 'zod';
import { db } from "@/lib/db";


export const dataset = async (values: z.infer<typeof DatasetSchema >) => {
    const validatedFields = DatasetSchema .safeParse(values);
    if(!validatedFields.success) {
        return { error: 'Заполните все поля!'};
    }

    const {userName, userId, userRole, userEmail, description, file, title, status} = validatedFields.data;

    if(userRole === "ADMIN") {
        return { error: 'Создание невозможно'};
    }

    if(title === "" || description === "" || file === "") {
        return { error: 'Заполните все поля'};
    }
    
    await db.dataset.create({
        data: {
           userName, userId, userRole, userEmail, description, file, title, status
        }
    });

    return {success: "Заявка на публикацию набора данных отправлена"};
};