"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmailController } from "./email-controller";
import { PassController } from "./pass-controller";
import { Field, FieldDescription, FieldGroup } from "./ui/field";
import Link from "next/link";
import { Button } from "./ui/button";
import { authSchema, User } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<User>({
    resolver: zodResolver(authSchema),
  });

  const onLogin = async (user: User) => {
    const { email } = user;
    const supabase = createClient();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: user.pass,
      });
      if (error) throw error;
      toast.success("Login successful!");
      router.replace("/notes");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={form.handleSubmit(onLogin)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <EmailController name="email" control={form.control} />

            <PassController
              name="pass"
              control={form.control}
              autoComplete="current-password"
              resetPass
            />
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <Field>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </Button>

            <FieldDescription className="text-center">
              New to Notiq? <Link href="/auth/sign-up">Create an account</Link>
            </FieldDescription>
          </Field>
        </CardFooter>
      </Card>
    </form>
  );
}
