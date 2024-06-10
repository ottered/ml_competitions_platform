"use client";

import { MoonLoader } from "react-spinners";
import { CardWrapper } from "./card-wrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()
    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if (!token) {
            setError("Токен отсутствует")
            return;
        }
        newVerification(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
            })
            .catch(() => {
                setSuccess("Подтвеждение прошло успешно");
            }
            )
    }, [token])

    useEffect(() => {
        onSubmit()
    }, [onSubmit])
    return (
        <CardWrapper headerLabel="Подтвердите регистрацию" backButtonHref="/auth/login" backButtonLabel="Вернуться к странице входа">
            <div className="flex items-center w-full justify-center">
                {!success && !error && (<MoonLoader />)}
                <FormError message={error} />
                <FormSuccess message={success} />
            </div>
        </CardWrapper>
    )
}