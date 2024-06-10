"use server";

import bcrypt from "bcryptjs";
import { RegisterSchema } from '@/schemas';
import * as z from 'zod';
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);
    if(!validatedFields.success) {
        return { error: 'Неверные данные!'};
    }

    const {email, password, name} = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return {error: "Почта уже используется!"}
    }
    await db.user.create({
        data: {
            name, email, password: hashedPassword,
        }
    });
    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(verificationToken.email, verificationToken.token) 

    return {success: "Подтвердите почту для завершения регистрации"};
};