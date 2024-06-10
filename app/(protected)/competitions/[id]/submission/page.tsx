"use client";

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import * as z from 'zod'
import { SubmissionSchema} from "@/schemas"
import { useState, useTransition } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { CardWrapper } from "@/components/submission-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { submission } from "@/actions/submission";
import { usePathname } from 'next/navigation'

const SubmissionPage = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const [file, setFile] = useState<File>();
    const competitionId = usePathname().slice(14, 39)
    const user = useCurrentUser();
    const form = useForm<z.infer<typeof SubmissionSchema>>({
        resolver: zodResolver(SubmissionSchema),
        defaultValues: {
            userName: user?.name || undefined,
            userId: user?.id,
            userRole: user?.role,
            userEmail: user?.email,
            competitionId: competitionId,
            file: "",
            resultBefore: "",
            resultAfter: "",
            status: "PENDING",
        }
    });
    const onSubmit = (values: z.infer<typeof SubmissionSchema>) => {
        setError('')
        setSuccess('')
        startTransition(async () => {
            try {
                if (file === undefined) return;

                const data = new FormData();
                data.set('file', file);
          
                const res = await fetch('/api/submissions', {
                  method: 'POST',
                  body: data
                });
          
                if (!res.ok) throw new Error(await res.text());
            } catch {}
            submission(values)
            .then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            })
        })
    }


    return (
        <CardWrapper
            backButtonLabel="Подробнее"
            backButtonHref="/submissions_about"
            >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField control={form.control} name='file' render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Предлагаемое решение
                                </FormLabel>
                                <FormControl>
                                    <input onChangeCapture={(e) => setFile((e.target as HTMLInputElement).files?.[0])} {...field} type="file" name = 'csv' accept=".csv"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button disabled = {isPending} type="submit" className="w-full">
                        Отправить решение
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default SubmissionPage;