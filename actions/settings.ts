"use server";

import * as z from 'zod'
import bcrypt from "bcryptjs";
import { SettingsSchema } from "@/schemas";
import { currentUser } from '@/lib/auth';
import { getUserById } from '@/data/user';
import { db } from '@/lib/db';

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
    const user = await currentUser();
    if (!user) {
        return {error: "Вы не авторизованы"}
    }

    const dbUser = await getUserById(user.id as string);

    if (!dbUser) {
        return {error: "Вы не авторизованы"}
    }

    if (values.password && values.newPassword && dbUser.password) {
        const passwordsMatch = await bcrypt.compare(values.password, dbUser.password)
        if (!passwordsMatch) {
            return { error: "Пароль неверный!"}
        }
        else {
            const hashedPassword = await bcrypt.hash(values.newPassword, 10);
            values.password = hashedPassword;
            values.newPassword = undefined;
        }
        return {success: "Настройки обновлены"}
    }


    await db.user.update({
        where: {id: dbUser.id},
        data: {...values},
    })

    return {success: "Настройки обновлены"}
}