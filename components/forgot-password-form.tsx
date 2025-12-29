"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";
import { Field, FieldDescription } from "@/components/ui/field";
import { useForm } from "react-hook-form";
import { authSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { EmailController } from "./email-controller";
import { toast } from "sonner";

const passResetSchema = authSchema.pick({ email: true });
type passReset = z.infer<typeof passResetSchema>;

export function ForgotPasswordForm() {
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<passReset>({
    resolver: zodResolver(passResetSchema),
  });

  const onForgotPassword = async (user: passReset) => {
    const supabase = createClient();
    setIsLoading(true);

    try {
      // The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {success ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Check Your Email</CardTitle>
            <CardDescription>Password reset instructions sent</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              If you registered using your email and password, you will receive
              a password reset email.
            </p>
          </CardContent>
        </Card>
      ) : (
        <form onSubmit={form.handleSubmit(onForgotPassword)}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Reset Your Password</CardTitle>
              <CardDescription>
                Type in your email and we&apos;ll send you a link to reset your
                password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EmailController name="email" control={form.control} />
            </CardContent>
            <CardFooter>
              <Field>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send reset email"}
                </Button>

                <FieldDescription className="text-center">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="underline underline-offset-4"
                  >
                    Login
                  </Link>
                </FieldDescription>
              </Field>
            </CardFooter>
          </Card>
        </form>
      )}
    </>
  );
}
