"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "@/lib/schema";
import * as z from "zod";
import { EmailController } from "./email-controller";
import { PassController } from "./pass-controller";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

const User = authSchema.extend({
  name: z.string("Enter your name").trim(),
});
type UserSchema = z.infer<typeof User>;

export function SignUpForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UserSchema>({
    resolver: zodResolver(User),
  });

  const onSignUp = async (user: UserSchema) => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      const { data: SignUpData, error: SignUpError } =
        await supabase.auth.signUp({
          email: user.email,
          password: user.pass,
        });
      const usr = SignUpData.user!;
      if (SignUpError) throw new Error(SignUpError.message);

      const { error: ProfileError } = await supabase
        .from("profiles")
        .insert([{ id: usr.id, username: user.name }]);
      if (ProfileError) throw new Error(ProfileError.message);

      toast.success("Sign up successful!");
      router.push("/auth/login");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong! Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={form.handleSubmit(onSignUp)}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Sign up</CardTitle>
            <CardDescription>Create a new account</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="text"
                      placeholder="Jane Doe"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <EmailController name="email" control={form.control} />

              <PassController name="pass" control={form.control} />
            </FieldGroup>
          </CardContent>
          <CardFooter>
            <Field>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create account"}
              </Button>

              <FieldDescription className="text-center">
                Already have an account? <Link href="/auth/login">Log In</Link>
              </FieldDescription>
            </Field>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}
