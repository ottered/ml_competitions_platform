import { Navbar } from "./_components/navbar";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    return (
        <div className="h-full w-full flex flex-col gap-y-10 items-center bg-[radial-gradient(_var(--tw-gradient-stops))] from-white to-slate-500">
            <Navbar />
            {children}
        </div>
    )
}

export default ProtectedLayout;