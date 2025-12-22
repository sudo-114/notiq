import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Zap, CircleCheck, LockKeyhole } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const cards = [
    {
      id: 1,
      icon: <CircleCheck size={32} />,
      title: "Simple",
      content:
        "Minimalist interface that removes clutter. No distracting  menus, just a clean canvas for your thoughts.",
    },
    {
      id: 2,
      icon: <Zap size={32} />,
      title: "Fast",
      content:
        "Instant sync across all your devices. Start on your phone, finish on your desktop without missing a beat.",
    },
    {
      id: 3,
      icon: <LockKeyhole size={32} />,
      title: "Yours",
      content:
        "Private by default. Your data is encrypted locally before it ever leaves your device.",
    },
  ];

  return (
    <div className="transition-colors duration-300">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="w-full max-w-300 mx-auto">
          <div className="flex items-center justify-between whitespace-nowrap px-6 py-4 md:px-10">
            <div className="flex items-center gap-3">
              <Logo size={32} className="text-primary" />
              <h2 className="text-xl font-bold leading-tight tracking-tight">
                Notiq
              </h2>
            </div>

            <Button
              asChild
              variant="ghost"
              className="min-w-20 rounded-full cursor-pointer hover:bg-border transition-all duration-300"
            >
              <Link href="/auth/login">Log In</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-300 w-full mx-auto">
        <section className="relative w-full text-center py-20 md:py-32 px-4 max-w-150 mx-auto">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50 dark:opacity-30"></div>

          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-[-0.02em]">
                Your thoughts,{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-emerald-400">
                  organized
                </span>
              </h1>

              <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed">
                The distraction-free space for your best ideas. Capture, sort,
                and refine your thinking in a calm environment.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
              <Button
                asChild
                className="group rounded-full h-14 px-8! hover:bg-primary/90 text-lg font-bold  tracking-wide shadow-[0_0_20px_rgba(83,210,45,0.3)] hover:shadow-[0_0_30px_rgba(83,210,45,0.5)] transition-all duration-300 transform hover:-translate-y-1"
              >
                <Link href="/auth/sign-up">
                  Start writing{" "}
                  <ArrowRight size={20} className="group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-4">
          <div className="mb-16 flex flex-col gap-4 text-center md:text-left max-w-180">
            <h2 className="text-3xl md:text-4xl font-black leading-tight tracking-tight">
              Focus on what matters
            </h2>
            <p className="text-muted-foreground text-lg font-normal leading-relaxed">
              Experience a note-taking tool designed to get out of your way. We
              handle the structure, you handle the ideas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {cards.map((card) => (
              <Card
                key={card.id}
                className="group transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <CardHeader>
                  <span className="mb-6 size-14 rounded-md bg-primary/10 flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-background">
                    {card.icon}
                  </span>

                  <CardTitle className="text-xl font-bold">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  {card.content}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <footer className="w-full text-center py-12 px-4 border-t border-border mt-14">
        <div className="w-full flex justify-center max-w-300 mx-auto gap-8 mb-8 [&>a]:hover:text-primary transition-colors">
          <Link href="#">About</Link>
          <Link href="#">Privacy</Link>
          <Link href="#">Terms</Link>
          <Link href="#">Contact</Link>
        </div>
        <p className="text-muted-foreground">
          © 2024 Notiq Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
