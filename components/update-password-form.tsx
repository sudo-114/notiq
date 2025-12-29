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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PassController } from "@/components/pass-controller";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { authSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const PassUpdate = authSchema.pick({ pass: true });

type PassUpdateSchema = z.infer<typeof PassUpdate>;

export function UpdatePasswordForm() {
  const form = useForm<PassUpdateSchema>({
    resolver: zodResolver(PassUpdate),
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onForgotPassword = async (user: PassUpdateSchema) => {
    const supabase = createClient();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password: user.pass });
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push("/notes");
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
    <form onSubmit={form.handleSubmit(onForgotPassword)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Reset Your Password</CardTitle>
          <CardDescription>
            Please enter your new password below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PassController
            name="pass"
            control={form.control}
            autoComplete="new-password"
          />
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update password"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
