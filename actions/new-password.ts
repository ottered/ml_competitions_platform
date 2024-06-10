"use server";
import bcrypt from "bcryptjs";
import { getPasswordResetTokenByToken } from '@/data/password-reset-token';
import { getUserByEmail } from '@/data/user';
import { NewPasswordSchema } from '@/schemas';
import * as z from 'zod';
import { db } from "@/lib/db";

export const newPassword = async (values: z.infer<typeof NewPasswordSchema>, token?: string | null) => {
    if (!token) {
        return { error: "Токен отсутствует!"}
    }

    const validatedFields = NewPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Невереные данные!"}
    }

    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
        return { error: "Неверный токен!"}
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return {error: "Токен просрочен"}
    }

    const existingUser = await getUserByEmail(existingToken.email)

    if (!existingUser) {
        return {error: "Такой почты не существует"}
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPassword }
    })

    await db.resetPasswordToken.delete({
        where: { id: existingToken.id },
    })
    
    return { success: "Пароль изменен"}
}