import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Orelega_One } from "next/font/google";


const font = Orelega_One({
    subsets: ["cyrillic"],
    weight: ["400"],
})

const AboutSubmissionsPage = async () => {
    return (
        <>
            <Card className="w-[600px] items-center">
                <CardContent className="items-center">
                    <div className="h-4"/>
                    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
                        <h1 className={cn("text-3xl font-semibold text-center", font.className)}>
                            Что важно знать для загрузки решения?
                        </h1>
                    </div>
                    <div className="h-4"/>
                    <div className="text-center">
                        Для загрузки решения, пользователю необходимо заполнить форму, включающую в себя поле файла решения в формате .csv.
                        Пользователю необходимо создать модель на основе обучающего набора данных, после чего проверить её при помощи тестового набора.
                        Полученное решение необходимо собрать в формате [ID, TARGET], иначе результат не сможет быть правильно определён и решение не будет принято.
                        После отправки решения на проверку с его содержимым ознакомится администратор платформы, после чего он принимает решение о том,
                        одобрить решение или отклонить. В случае необходимости уточнения информации администратор свяжется с вами по электронной
                        почте, указанной при регистрации. Если решения было одобрено, то его результат будет отображен на странице соревнования в секции "Таблица лидеров".
                    </div>
                    <div className="h-4"/>
                </CardContent>
            </Card>
        </>
    )
}

export default AboutSubmissionsPage;