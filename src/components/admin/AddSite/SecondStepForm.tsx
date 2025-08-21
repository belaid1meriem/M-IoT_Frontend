import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { FormFieldText } from "../../ui/FormFieldText"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Minus, Calendar, Hash, Settings } from "lucide-react"
import useSecondStepForm from "@/hooks/forms/AddSite/useSecondStepForm"
import { useFieldArray } from "react-hook-form"

export function SecondStepForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const {
    form,
    capteurFields,
    addCapteur,
    removeCapteur,
    onSubmit,
    prevStep
  } = useSecondStepForm()

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-6", className)}
        onSubmit={onSubmit}
        {...props}
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold">Configuration des Capteurs</h2>
            <p className="text-muted-foreground">
              Ajoutez les capteurs et leurs paramètres pour ce site
            </p>
          </div>

          {/* Capteurs List */}
          <div className="space-y-4">
            {capteurFields.map((capteurField, capteurIndex) => (
              <CapteurCard
                key={capteurField.id}
                capteurIndex={capteurIndex}
                form={form}
                onRemove={() => removeCapteur(capteurIndex)}
                canRemove={capteurFields.length > 1}
              />
            ))}
          </div>

          {/* Add Capteur Button */}
          <Button
            type="button"
            variant="outline"
            onClick={addCapteur}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un capteur
          </Button>

          {/* Form Actions */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="flex-1"
            >
              ← Retour
            </Button>
            <Button type="submit" className="flex-1">
              Continuer →
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

// Capteur Card Component
function CapteurCard({ 
  capteurIndex, 
  form, 
  onRemove, 
  canRemove 
}: {
  capteurIndex: number;
  form: any;
  onRemove: () => void;
  canRemove: boolean;
}) {
  const {
    fields: parametreFields,
    append: appendParametre,
    remove: removeParametre
  } = useFieldArray({
    control: form.control,
    name: `capteurs.${capteurIndex}.parametres`
  });

  const addParametre = () => {
    appendParametre({
      nom: "",
      unite: "",
      valeur_max: 0
    });
  };

  // Get current date for date input
  const today = new Date().toISOString().split('T')[0];

  return (
    <Card className="relative">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Capteur #{capteurIndex + 1}
          </CardTitle>
          {canRemove && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="text-destructive hover:text-destructive"
            >
              <Minus className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Capteur Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormFieldText
            control={form.control}
            name={`capteurs.${capteurIndex}.num_serie`}
            label="Numéro de série"
            placeholder="Ex: CAPT001"
            icon={<Hash className="w-4 h-4" />}
          />
          
          <FormFieldText
            control={form.control}
            name={`capteurs.${capteurIndex}.date_install`}
            label="Date d'installation"
            type="date"
            defaultValue={today}
            icon={<Calendar className="w-4 h-4" />}
          />
        </div>

        {/* Parameters Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Paramètres du capteur</h4>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={addParametre}
            >
              <Plus className="w-4 h-4 mr-1" />
              Ajouter
            </Button>
          </div>

          {parametreFields.map((parametreField, parametreIndex) => (
            <div 
              key={parametreField.id} 
              className="p-4 border rounded-lg bg-muted/30 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Paramètre #{parametreIndex + 1}
                </span>
                {parametreFields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeParametre(parametreIndex)}
                    className="text-destructive hover:text-destructive h-6 w-6 p-0"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <FormFieldText
                  control={form.control}
                  name={`capteurs.${capteurIndex}.parametres.${parametreIndex}.nom`}
                  label="Nom"
                  placeholder="Ex: température"
                />
                
                <FormFieldText
                  control={form.control}
                  name={`capteurs.${capteurIndex}.parametres.${parametreIndex}.unite`}
                  label="Unité"
                  placeholder="Ex: °C"
                />
                
                <FormFieldText
                  control={form.control}
                  name={`capteurs.${capteurIndex}.parametres.${parametreIndex}.valeur_max`}
                  label="Valeur max"
                  type="number"
                  placeholder="100"
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}