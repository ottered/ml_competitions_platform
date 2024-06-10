import { UserRole } from "@prisma/client";
import { File } from "buffer";
import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({message: 'Введите электронную почту'}),
    password: z.string().min(1, {message: 'Введите пароль'})
});

export const ResetSchema = z.object({
    email: z.string().email({message: 'Введите электронную почту'}),
});

export const RegisterSchema = z.object({
    email: z.string().email({message: 'Введите электронную почту'}),
    password: z.string().min(6, {message: 'Введите пароль (мин. 6 символов)'}),
    name: z.string().min(1, {message: 'Введите имя'})
});

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {message: 'Введите пароль (мин. 6 символов)'}),
});

export const SettingsSchema = z.object({
    name: z.optional(z.string()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6, {message: 'Введите пароль (мин. 6 символов)'})),
    newPassword: z.optional(z.string().min(6, {message: 'Введите пароль (мин. 6 символов)'})),
    image: z.optional(z.string()),
    id: z.optional(z.string()),
})
.refine((data) => {
    if (data.password && !data.newPassword) {
        return false;
    }
    if (!data.password && data.newPassword) {
        return false;
    }
    
    return true;
},{message: "Оба поля должны быть заполнены.", path: ["newPassword"]})

export const DatasetSchema = z.object({
    userName: z.optional(z.string()),
    userId: z.string(),
    userRole: z.enum([UserRole.ADMIN, UserRole.USER]),
    userEmail: z.nullable(z.optional(z.string().email())),
    title: z.string(),
    file: z.string(),
    description: z.string(),
    status: z.string().default('PENDING')
})

export const CompetitionSchema = z.object({
    userName: z.optional(z.string()),
    userId: z.string(),
    userRole: z.enum([UserRole.ADMIN, UserRole.USER]),
    userEmail: z.nullable(z.optional(z.string().email())),
    description: z.string(),
    prizePool: z.string(),
    startDate: z.optional(z.date()),
    endDate: z.optional(z.date()),
    metric: z.string(),
    file: z.string(),
    testFile: z.string(),
    title: z.string(),
    status: z.string().default('PENDING')
})

export const SubmissionSchema = z.object({
    userName: z.optional(z.string()),
    userId: z.string(),
    userRole: z.enum([UserRole.ADMIN, UserRole.USER]),
    userEmail: z.nullable(z.optional(z.string().email())),
    competitionId: z.string(),
    file: z.string(),
    resultBefore: z.string(),
    resultAfter: z.string(),
    status: z.string().default('PENDING')
})

export const StatusSchema = z.object({
    status: z.string(),
});