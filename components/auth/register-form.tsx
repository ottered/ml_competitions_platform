"use client";

import { CardWrapper } from "./card-wrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import * as z from 'zod'
import { RegisterSchema } from "@/schemas"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { register } from "@/actions/register";
import { useState, useTransition } from "react";

export const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        }
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError('')
        setSuccess('')
        startTransition(() => {
            register(values)
            .then((data) => {
                setError(data.error);
                setSuccess(data.success);
            })
        })
    }


    return (
        <CardWrapper
            headerLabel="Создание аккаунта"
            backButtonLabel="Уже зарегистрированы?"
            backButtonHref="/auth/login"
            showSocial>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField control={form.control} name='name' render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Имя пользователя
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} disabled = {isPending} placeholder="user123" type="name"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name='email' render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Электронная почта
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} disabled = {isPending} placeholder="youremail@example.com" type="email"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name='password' render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Пароль
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} disabled = {isPending} placeholder="********" type="password"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button disabled = {isPending} type="submit" className="w-full">
                        Зарегистрироваться
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}