import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { FormFieldText } from "./ui/FormFieldText"
import useChangePasswordForm from "@/hooks/forms/useChangePasswordForm"

export function ChangePasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const  {

    form,
    isLoading,
    onSubmit
  } = useChangePasswordForm()
  return (
    <Form {...form}>
      <form className={cn("flex flex-col gap-6", className)} onSubmit={onSubmit} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Change Password</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your old and new password below 
          </p>
        </div>
        <div className="grid gap-6">

          <FormFieldText
            control={form.control}
            name="oldPassword"
            label="Old Password"
            type="password"
            placeholder="••••••"
          />
          <div className="space-y-3">
            <FormFieldText
              control={form.control}
              name="newPassword"
              label="New Password"
              type="password"
              placeholder="••••••"
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            { isLoading ? 'Saving...' : 'Save' }
          </Button>
          </div>
      </form>
    </Form>
  )
}
