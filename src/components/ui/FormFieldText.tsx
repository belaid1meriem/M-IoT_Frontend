import type { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FormFieldTextProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  placeholder?: string;
  type?: string;
  defaultValue?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function FormFieldText<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  defaultValue,
  icon,
  className,
}: FormFieldTextProps<TFieldValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="relative">
              {icon && (
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10">
                  {icon}
                </div>
              )}
              <Input
                {...field}
                type={type}
                placeholder={placeholder}
                defaultValue={defaultValue}
                className={cn(
                  icon ? "pl-10" : "",
                  "w-full"
                )}
                value={field.value ?? ""}
                onChange={(e) => {
                  if (type === "number") {
                    const value = e.target.value;
                    field.onChange(value === "" ? 0 : parseFloat(value));
                  } else {
                    field.onChange(e.target.value);
                  }
                }}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}