"use client";

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import * as z from 'zod'
import { CompetitionSchema } from "@/schemas"
import { useState, useTransition } from "react";
import { competition } from "@/actions/competition";
import { useCurrentUser } from "@/hooks/use-current-user";
import { CardWrapper } from "@/components/competition-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { PopoverContent } from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const CompetitionPage = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [file, setFile] = useState<File>();
    const [testFile, setTestFile] = useState<File>();
    const [validationFile, setValidationFile] = useState<File>();
    const [isPending, startTransition] = useTransition();
    const user = useCurrentUser();
    const form = useForm<z.infer<typeof CompetitionSchema>>({
        resolver: zodResolver(CompetitionSchema),
        defaultValues: {
            userName: user?.name || undefined,
            userId: user?.id,
            userRole: user?.role,
            userEmail: user?.email,
            description: "",
            prizePool: "",
            startDate: undefined,
            endDate: undefined,
            metric: "",
            file: "",
            testFile: "",
            title: "",
            status: "PENDING",
        }
    });

    const onSubmit = (values: z.infer<typeof CompetitionSchema>) => {
        setError('')
        setSuccess('')
        startTransition(async () => {
            try {
                if (file === undefined) return;

                const data = new FormData();
                data.set('file', file);
                const res = await fetch('/api/upload', {
                  method: 'POST',
                  body: data, 
                });
                
                if (!res.ok) throw new Error(await res.text());

                if (testFile === undefined) return;
                const testData = new FormData();
                testData.set('file', testFile);
                const res2 = await fetch('/api/test', {
                    method: 'POST',
                    body: testData
                  });

                if (!res2.ok) throw new Error(await res2.text());
            } 
            catch {}
            competition(values)
            .then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            })
        })
    }

    return (
        <CardWrapper
            backButtonLabel="Подробнее"
            backButtonHref="/competitions/about"
            >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField control={form.control} name='title' render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Название соревнования
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} disabled = {isPending} placeholder="Введите название" type="string"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <div className="flex flex-row">
                            <FormField control={form.control} name='file' render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Обучающая часть набора данных
                                    </FormLabel>
                                    <FormControl>
                                        <input onChangeCapture={(e) => setFile((e.target as HTMLInputElement).files?.[0])} {...field} type="file" name = 'csv' accept=".csv"/>
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                            )}/>
                            <FormField control={form.control} name='testFile' render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Тестовая часть набора данных
                                    </FormLabel>
                                    <FormControl>
                                        <input onChangeCapture={(e) => setTestFile((e.target as HTMLInputElement).files?.[0])} {...field} type="file" name = 'csv' accept=".csv"/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                        </div>
                        <FormField control={form.control} name='metric' render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Метрика для определения результата
                                </FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Выберите метрику" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="MSE">MSE</SelectItem>
                                        <SelectItem value="MAE">MAE</SelectItem>
                                        <SelectItem value="MAPE">MAPE</SelectItem>
                                        <SelectItem value="F1">F1</SelectItem>
                                        <SelectItem value="Accuracy">Accuracy</SelectItem>
                                        <SelectItem value="AUC">AUC</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name='description' render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Описание соревнования
                                </FormLabel>
                                <FormControl>
                                    <Textarea {...field} disabled = {isPending} placeholder="Опишите создаваемое соревнование" className="h-[100px] resize-none"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name='prizePool' render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Призовой фонд / Цель
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled = {isPending} placeholder="??? ₽ / Цель" type="string"/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                        <div className="flex flex-row gap-x-36">
                            <div className="flex flex-col">
                                <div className="h-1"/>
                                <FormField control={form.control} name="startDate" render={({ field }) => (
                                    <FormItem className="flex flex-col gap-y-1.5">
                                        <FormLabel>Дата начала</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button variant={"outline"} className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                                    {field.value ? (format(field.value, "PPP")) : (<span>Выберите дату</span>)}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date()} initialFocus/>
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                    </FormItem>
                                )}/>
                            </div>
                            <div className="flex flex-col">
                                <div className="h-1"/>
                                <FormField control={form.control} name="endDate" render={({ field }) => (
                                    <FormItem className="flex flex-col gap-y-1.5">
                                        <FormLabel>Дата окончания</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button variant={"outline"} className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                                    {field.value ? (format(field.value, "PPP")) : (<span>Выберите дату</span>)}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date()} initialFocus/>
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                    </FormItem>
                                )}/>
                            </div>
                        </div>
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

export default CompetitionPage;