"use client";

import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

interface PassProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  autoComplete?: "new-password" | "current-password";
  resetPass?: boolean;
}

export function PassController<T extends FieldValues>({
  name,
  control,
  autoComplete,
  resetPass,
}: PassProps<T>) {
  const [showPass, setShowPass] = useState(<Eye />);
  const [input, setInput] = useState("password");
  const [visible, setVisible] = useState(false);

  const togglePass = () => {
    const next = !visible;
    setVisible(next ? true : false);
    setShowPass(next ? <EyeOff /> : <Eye />);
    setInput(next ? "text" : "password");
  };
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <div className="relative">
              {resetPass && (
                <Link
                  href="/auth/forgot-password"
                  className="absolute right-0 top-0 text-sm underline underline-offset-4 hover:text-primary"
                >
                  Forgot password?
                </Link>
              )}
              <FieldLabel>Password</FieldLabel>
            </div>

            <div className="relative">
              <Input
                {...field}
                type={input}
                placeholder="••••••••••"
                autoComplete={autoComplete}
              />
              <Button
                type="button"
                onClick={togglePass}
                variant="ghost"
                size="icon"
                className="absolute right-0"
              >
                {showPass}
              </Button>
            </div>

            {!fieldState.invalid && (
              <FieldDescription>Must be 8 characters long</FieldDescription>
            )}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </>
  );
}
