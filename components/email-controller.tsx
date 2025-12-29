"use client";

import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface EmailProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
}

export function EmailController<T extends FieldValues>({
  name,
  control,
}: EmailProps<T>) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Email</FieldLabel>
            <Input {...field} type="email" placeholder="jdoe.example.com" />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </>
  );
}
