import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { FormFieldText } from "./ui/FormFieldText"
import useLoginForm from "@/hooks/forms/useLoginForm"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const  {
    success,
    error,
    form,
    isLoading,
    onSubmit
  } = useLoginForm()
  return (
    <Form {...form}>
      <form className={cn("flex flex-col gap-6", className)} onSubmit={onSubmit} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-6">

          <FormFieldText
            control={form.control}
            name="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
          />
          <div className="space-y-3">
            <FormFieldText
              control={form.control}
              name="password"
              label="Password"
              type="password"
              placeholder="••••••"
            />
            <div className="flex justify-end">
              <a
                href="#"
                className="text-sm underline-offset-4 hover:underline text-muted-foreground"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            { isLoading ? 'Logging in...' : 'Login' }
          </Button>
          </div>
      </form>
    </Form>
  )
}
