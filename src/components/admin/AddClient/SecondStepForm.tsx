import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { FormFieldText } from "../../ui/FormFieldText"
import useSecondStepForm from "@/hooks/forms/AddClient/useSecondStepForm"

export function SecondStepForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const {
    form,
    isLoading,
    onSubmit,
  } = useSecondStepForm()

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-8", className)}
        onSubmit={onSubmit}
        {...props}
      >
        <div className="grid gap-8">
          <FormFieldText
            control={form.control}
            name="telephone"
            label="Tel"
            placeholder="Votre numéro de téléphone"
            type="tel"
          />

          <FormFieldText
            control={form.control}
            name="email"
            label="Email"
            placeholder="Votre adresse email"
            type="email"
          />

          <FormFieldText
            control={form.control}
            name="password"
            label="Mot de passe"
            placeholder="••••••"
            type="password"
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Création..." : "Créer le compte pour le client"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
