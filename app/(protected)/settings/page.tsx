"use client";
import * as z from "zod";
import { settings } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { SettingsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

const SettingsPage = () => {
    const user = useCurrentUser();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const {update} = useSession();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            name: user?.name || undefined,
            email: user?.email || undefined,
            password: undefined,
            newPassword: undefined,
            role: user?.role || undefined,
            image: user?.image || '' || undefined,
            id: user?.id || undefined,
        }
    })

    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
        startTransition(() => {
            settings(values)
                .then((data) => {
                    if(data.error) {
                        setError(data.error)
                    }
                    if(data.success) {
                        update();
                        setSuccess(data.success)
                    }
                })
                .catch(() => setError("Пароля не существует"))
        })
    }
    return (
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    Настройки
                </p>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <FormField  control={form.control} name="name" render = {({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Имя пользователя
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="user123" disabled={isPending}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                            <FormField  control={form.control} name="email" render = {({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Электронная почта
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="example@email.com" type = "email" disabled={true}/>
                                    </FormControl>
                                </FormItem>
                            )}/>
                            <FormField  control={form.control} name="id" render = {({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Идентификатор
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder='1234567890' disabled={true}/>
                                    </FormControl>
                                </FormItem>
                            )}/>
                            <FormField  control={form.control} name="password" render = {({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Пароль
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="******" type = "password" disabled={isPending}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                            <FormField  control={form.control} name="newPassword" render = {({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Новый пароль
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="******" type = "password" disabled={isPending}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                            <FormField  control={form.control} name="image" render = {({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Фото профиля
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder='https://image.png' disabled={isPending}/>
                                    </FormControl>
                                </FormItem>
                            )}/>
                            <FormField  control={form.control} name="role" render = {({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Роль
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Ваша роль" type = "role" disabled={true}/>
                                    </FormControl>
                                </FormItem>
                            )}/>
                        </div>
                        <FormError message = {error}/>
                        <FormSuccess message = {success}/>
                        <Button disabled = {isPending} type="submit">
                            Сохранить
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

export default SettingsPage;