"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";

export const newVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
        return {error: "Токен не существует"}
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return {error: "Токен просрочен"}
    }

    const existingUser = await getUserByEmail(existingToken.email)

    if (!existingUser) {
        return {error: "Такой почты не существует"}
    }

    await db.user.update({
        where: { id: existingUser.id },
        data: {
            emailVerified: new Date(),
            email: existingToken.email
        }
    })

    await db.verificationToken.delete({
        where: { id: existingUser.id },
    })
    
    return { success: "Почта подтверждена!"}
}