"use client"

import { db } from "@/lib/db";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import Link from "next/link";
import { startTransition, useState } from "react";
import { StatusSchema } from "@/schemas";
import { competitionStatusAccept, competitionStatusDecline, datasetStatusAccept, datasetStatusDecline, submissionStatusAccept, submissionStatusDecline } from "@/actions/pending-status";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";

interface AdminInfoProps {
    competition?: {id?: string, title?: string, userId?: string, userName?: string | null, userEmail?: string | null},
    dataset?: {id?: string, title?: string, userId?: string, userName?: string | null, userEmail?: string | null},
    submission?: {id?: string, title?: string, userId?: string, userName?: string | null, userEmail?: string | null}
}

export const AdminInfo = ({
    competition, dataset, submission
}: AdminInfoProps) => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    
    const form = useForm<z.infer<typeof StatusSchema>>({
        resolver: zodResolver(StatusSchema),
        defaultValues: {
            status: "",
        }
    });
    
    const competitionAccept = (values: z.infer<typeof StatusSchema>) => {
        startTransition(() => {
            competitionStatusAccept(values, competition?.id)
            .then((data) => {
            })
        })
    }

    const competitionDecline = (values: z.infer<typeof StatusSchema>) => {
        startTransition(() => {
            competitionStatusDecline(values, competition?.id)
            .then((data) => {
            })
        })
    }

    const datasetAccept = (values: z.infer<typeof StatusSchema>) => {
        startTransition(() => {
            datasetStatusAccept(values, dataset?.id)
            .then((data) => {
            })
        })
    }

    const datasetDecline = (values: z.infer<typeof StatusSchema>) => {
        startTransition(() => {
            datasetStatusDecline(values, dataset?.id)
            .then((data) => {
            })
        })
    }

    const submissionAccept = (values: z.infer<typeof StatusSchema>) => {
        startTransition(() => {
            submissionStatusAccept(values, submission?.id)
            .then((data) => {
            })
        })
    }

    const submissionDecline = (values: z.infer<typeof StatusSchema>) => {
        startTransition(() => {
            submissionStatusDecline(values, submission?.id)
            .then((data) => {
            })
        })
    }
    if (competition) {
        return (
                <Card className="w-[500px] shadow-md">
                    <Form {...form}>
                    <CardContent className="space-y-4">
                        <div className="h-2"/>
                        <div className="rounded-lg border p-3 shadow-sm">
                            <div className="flex flex-row justify-between">  
                                <div className="flex flex-col items-start">
                                    <p className="text-sm flex-row font-medium justify-between items-center">
                                        <text className="font-bold text-xs">{competition?.title}</text> 
                                    </p>
                                    <p className="truncate text-xs max-w-[180px] font-mono p-1 text-stone-500">
                                        {`@${competition?.id}`}
                                    </p>
                                </div>
                                <div className="flex flex-col items-end">
                                    <p className="flex-row font-medium justify-between items-center text-xs">
                                        <text className="font-bold">{competition?.userName}</text> 
                                    </p>
                                    <p className="truncate text-xs max-w-[180px] font-mono p-1 text-stone-500">
                                        {`@${competition?.userId}`}
                                    </p>
                                    <p className="truncate text-xs max-w-[180px] font-mono p-1 text-stone-500">
                                        {competition?.userEmail}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Link href={`/competitions/${competition?.id}`}>
                                <Button className="w-full">
                                    Подробнее
                                </Button>
                            </Link>
                        </div>
                        <div className="flex flex-row gap-x-4 justify-between">
                            <form onSubmit={form.handleSubmit(competitionAccept)} className="space-y-6">
                                <Button className="w-[220px] bg-lime-500 " type='submit' onSubmit={form.handleSubmit(competitionAccept)}>
                                    Принять
                                </Button>
                            </form>
                            <form onSubmit={form.handleSubmit(competitionDecline)} className="space-y-6">
                                <Button className="w-[220px] bg-red-500" type='submit' onSubmit={form.handleSubmit(competitionDecline)}>
                                    Отклонить
                                </Button>
                            </form>
                        </div>
                    </CardContent>
                    
                    </Form>
                </Card>
            )
    }
    if (dataset) {
        return (
            <Card className="w-[500px] shadow-md">
                <CardContent className="space-y-4">
                    <div className="h-2"/>
                    <div className="rounded-lg border p-3 shadow-sm">
                        <div className="flex flex-row justify-between">  
                            <div className="flex flex-col items-start">
                                <p className="text-sm flex-row font-medium justify-between items-center">
                                    <text className="font-bold text-xs">{dataset?.title}</text> 
                                </p>
                                <p className="truncate text-xs max-w-[180px] font-mono p-1 text-stone-500">
                                    {`@${dataset?.id}`}
                                </p>
                            </div>
                                <div className="flex flex-col items-end">
                                <p className="flex-row font-medium justify-between items-center text-xs">
                                    <text className="font-bold">{dataset?.userName}</text> 
                                </p>
                                <p className="truncate text-xs max-w-[180px] font-mono p-1 text-stone-500">
                                    {`@${dataset?.userId}`}
                                </p>
                                <p className="truncate text-xs max-w-[180px] font-mono p-1 text-stone-500">
                                    {dataset?.userEmail}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Link href={`/datasets/${dataset?.id}`}>
                            <Button className="w-full">
                                Подробнее
                            </Button>
                        </Link>
                    </div>
                    <div className="flex flex-row gap-x-4 justify-between">
                            <form onSubmit={form.handleSubmit(datasetAccept)} className="space-y-6">
                                <Button className="w-[220px] bg-lime-500 " type='submit' onSubmit={form.handleSubmit(datasetAccept)}>
                                    Принять
                                </Button>
                            </form>
                            <form onSubmit={form.handleSubmit(datasetDecline)} className="space-y-6">
                                <Button className="w-[220px] bg-red-500" type='submit' onSubmit={form.handleSubmit(datasetDecline)}>
                                    Отклонить
                                </Button>
                            </form>
                    </div>
                </CardContent>
            </Card>
        )
    }
    if (submission) {
        return (
            <Card className="w-[500px] shadow-md">
                <CardContent className="space-y-4">
                    <div className="h-2"/>
                    <div className="rounded-lg border p-3 shadow-sm">
                        <div className="flex flex-row justify-between">  
                            <div className="flex flex-col items-start">
                                <p className="text-sm flex-row font-medium justify-between items-center">
                                    <text className="font-bold text-xs">{submission?.title}</text> 
                                </p>
                                <p className="truncate text-xs max-w-[180px] font-mono p-1 text-stone-500">
                                    {`@${submission?.id}`}
                                </p>
                            </div>
                                <div className="flex flex-col items-end">
                                <p className="flex-row font-medium justify-between items-center text-xs">
                                    <text className="font-bold">{submission?.userName}</text> 
                                </p>
                                <p className="truncate text-xs max-w-[180px] font-mono p-1 text-stone-500">
                                    {`@${submission?.userId}`}
                                </p>
                                <p className="truncate text-xs max-w-[180px] font-mono p-1 text-stone-500">
                                    {submission?.userEmail}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-x-4 justify-between">
                            <form onSubmit={form.handleSubmit(submissionAccept)} className="space-y-6">
                                <Button className="w-[220px] bg-lime-500 " type='submit' onSubmit={form.handleSubmit(submissionAccept)}>
                                    Принять
                                </Button>
                            </form>
                            <form onSubmit={form.handleSubmit(submissionDecline)} className="space-y-6">
                                <Button className="w-[220px] bg-red-500" type='submit' onSubmit={form.handleSubmit(submissionDecline)}>
                                    Отклонить
                                </Button>
                            </form>
                    </div>
                </CardContent>
            </Card>
        )
    }
}
