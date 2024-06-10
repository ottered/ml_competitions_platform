import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `https://contest.nanger.ru/auth/new-verification?token=${token}`

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Подвердите свою почту",
        html: `<p>Нажмите <a href="${confirmLink}">здесь</a> для подерждения почты</p>`
    })
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `https://contest.nanger.ru/auth/new-password?token=${token}`

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Смена пароля",
        html: `<p>Нажмите <a href="${resetLink}">здесь</a> для смены пароля</p>`
    })
}