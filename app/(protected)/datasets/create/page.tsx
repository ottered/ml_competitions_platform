"use client";

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import * as z from 'zod'
import { DatasetSchema} from "@/schemas"
import { useState, useTransition } from "react";
import { dataset } from "@/actions/dataset";
import { useCurrentUser } from "@/hooks/use-current-user";
import { CardWrapper } from "@/components/dataset-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Textarea } from "@/components/ui/textarea";

const DatasetPage = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const [file, setFile] = useState<File>();
    const user = useCurrentUser();
    const form = useForm<z.infer<typeof DatasetSchema>>({
        resolver: zodResolver(DatasetSchema),
        defaultValues: {
            userName: user?.name || undefined,
            userId: user?.id,
            userRole: user?.role,
            userEmail: user?.email,
            description: "",
            file: "",
            title: "",
            status: "PENDING",
        }
    });
    const onSubmit = (values: z.infer<typeof DatasetSchema>) => {
        setError('')
        setSuccess('')
        startTransition(async () => {
            try {
                if (file === undefined) return;

                const data = new FormData();
                data.set('file', file);
          
                const res = await fetch('/api/upload', {
                  method: 'POST',
                  body: data
                });
          
                if (!res.ok) throw new Error(await res.text());
            } catch {}
            dataset(values)
            .then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            })
        })
    }


    return (
        <CardWrapper
            backButtonLabel="Подробнее"
            backButtonHref="/datasets/about"
            >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField control={form.control} name='title' render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Название набора данных
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} disabled = {isPending} placeholder="Введите название" type="string"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name='file' render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Предлагаемый набор данных
                                </FormLabel>
                                <FormControl>
                                    <input onChangeCapture={(e) => setFile((e.target as HTMLInputElement).files?.[0])} {...field} type="file" name = 'csv'/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name='description' render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Описание набора данных
                                </FormLabel>
                                <FormControl>
                                    <Textarea {...field} disabled = {isPending} placeholder="Опишите добавляемый набор" className=" resize-none h-[100px]"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button disabled = {isPending} type="submit" className="w-full">
                        Оставить заявку
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default DatasetPage;