'use client'

import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex h-full flex-col items-end bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white to-slate-500">
      <div className="space-x-6">
        <LoginButton>
          <Button variant="link" size='lg'>
            Войти
          </Button>
        </LoginButton>
      </div>
    </main>
  );
}
