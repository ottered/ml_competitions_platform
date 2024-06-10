
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { CardWrapper } from "./card-wrapper";

export const ErrorCard = () => {
    return (
        <CardWrapper headerLabel="Пароля не существует" backButtonHref="/auth/login" backButtonLabel="Попробовать снова?">
            <div className="w-full flex justify-center items-center">
                <ExclamationTriangleIcon className="text-destructive"/>
            </div>
        </CardWrapper>
    )
}