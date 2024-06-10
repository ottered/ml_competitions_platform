"use client";

import { CardWrapper } from "./card-wrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import * as z from 'zod'
import { LoginSchema } from "@/schemas"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export const LoginForm = () => {
    const searchParams = useSearchParams();
    const urlError = searchParams.get('error') === 'OAuthAccountNotLinked' ? 'Почта уже используется!' : ""
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError('')
        setSuccess('')
        startTransition(() => {
            login(values)
            .then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            })
        })
    }


    return (
        <CardWrapper
            headerLabel="Добро пожаловать!"
            backButtonLabel="Нет аккаунта?"
            backButtonHref="/auth/register"
            showSocial>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
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
                                <Button size='sm' variant='link' asChild className="px-0">
                                    <Link href="/auth/reset">
                                        Восстановить пароль
                                    </Link>
                                </Button>
                                <FormMessage />
                            </FormItem>
                        )}/>
                    </div>
                    <FormError message={error || urlError } />
                    <FormSuccess message={success} />
                    <Button disabled = {isPending} type="submit" className="w-full">
                        Войти
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}