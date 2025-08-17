import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { FormFieldText } from "@/components/ui/FormFieldText"
import useFirstStepForm from "@/hooks/forms/AddClient/useFirstStepForm"
const FirstStepForm = () => {
    const { form, onSubmit } = useFirstStepForm()
  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-8")}
        onSubmit={onSubmit}
      >
        <div className="grid gap-8">

          <FormFieldText
            control={form.control}
            name="nom_entreprise"
            label="Nom de l'entreprise"
            placeholder="Entrer le nom de l’entreprise"
          />

          <FormFieldText
            control={form.control}
            name="adresse"
            label="Adresse"
            placeholder="Entrer l’adresse de l’entreprise"
          />

          <FormFieldText
            control={form.control}
            name="industrie"
            label="Industrie"
            placeholder="Entrer l’industrie"
          />

          {/* Responsable */}
          <div className="grid grid-cols-2 gap-4 items-end">
            <FormFieldText
              control={form.control}
              name="responsable_nom"
              label="Responsable"
              placeholder="Nom"
            />
            <FormFieldText
              control={form.control}
              name="responsable_prenom"
              label=" "
              placeholder="Prénom"
            />
          </div>

          <Button type="submit" className="w-full">
            Continue →
          </Button>

        </div>
      </form>
    </Form>
  )
}

export default FirstStepForm