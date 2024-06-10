"use client";
import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
    const pathname = usePathname();
    const user = useCurrentUser();
    return (
        <nav className="bg-secondary flex justify-between items-center p-2 w-full shadow-sm">
            <div className="flex gap-x-2">
                <Button asChild variant={pathname === "/main" ? "default" : "outline"}>
                    <Link href='/main'>
                        Главная
                    </Link>
                </Button>
                <Button asChild variant={pathname === "/competitions" ? "default" : "outline"}>
                    <Link href='/competitions'>
                        Соревнования
                    </Link>
                </Button>
                <Button asChild variant={pathname === "/datasets" ? "default" : "outline"}>
                    <Link href='/datasets'>
                        Наборы данных
                    </Link>
                </Button>
                <Button asChild variant={pathname === "/about" ? "default" : "outline"}>
                    <Link href='/about'>
                        О сайте
                    </Link>
                </Button>
                {user?.role === 'ADMIN' &&
                    <Button asChild variant={pathname === "/admin" ? "default" : "outline"}>
                        <Link href='/admin'>
                            Панель упраления
                        </Link>
                    </Button>
                }
            </div>
            <div className="flex gap-x-5 items-center">
                <div className="flex flex-col items-end">
                    <p className="text-black">
                        {`${user?.name}`}
                    </p>
                    <p className=" text-xs">
                        {`@${user?.id}`}
                    </p>
                </div>
                <UserButton />
            </div>
            
        </nav>
    )
}