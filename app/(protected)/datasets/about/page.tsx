import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Orelega_One } from "next/font/google";


const font = Orelega_One({
    subsets: ["cyrillic"],
    weight: ["400"],
})

const AboutDatasetsPage = async () => {
    return (
        <>
            <Card className="w-[600px] items-center">
                <CardContent className="items-center">
                    <div className="h-4"/>
                    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
                        <h1 className={cn("text-3xl font-semibold text-center", font.className)}>
                            Что важно знать для загрузки набора данных?
                        </h1>
                    </div>
                    <div className="h-4"/>
                    <div className="text-center">
                        Для загрузки набора данных, пользователю необходимо заполнить форму, включающую в себя следующие поля: название набора данных, файл
                        набора данных в формате .csv и его описание.
                        После отправки набора данных на проверку с его содержимым ознакомится администратор платформы, после чего он принимает решение о том,
                        одобрить набор данных или отклонить. В случае необходимости уточнения информации администратор свяжется с вами по электронной
                        почте, указанной при регистрации. Если набор данных был одобрен, то его можно будет найти на вкладке "Наборы данных". По нажатии кнопки "Подробнее" 
                        можно узнать всю информацию о наборе данных.
                    </div>
                    <div className="h-4"/>
                </CardContent>
            </Card>
        </>
    )
}

export default AboutDatasetsPage;