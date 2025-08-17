import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from "@/components/ui/form"
import { FormFieldText } from "@/components/ui/FormFieldText"
import useFirstStepForm from "@/hooks/forms/AddSite/useFirstStepForm"
import MapPicker from "@/components/MapPicker"

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
                        name="nom"
                        label="Nom du site"
                        placeholder="Entrer le nom de l'entreprise"
                    />

                    {/* Map Picker Section */}
                    <div className="space-y-4">
                        <FormLabel>Position sur la carte</FormLabel>
                        <MapPicker onConfirm={(lat, lng) => {
                            form.setValue("latitude", lat, { shouldValidate: true });
                            form.setValue("longitude", lng, { shouldValidate: true });
                        }} />
                        
                        {/* Show coordinates when selected */}
                        {form.watch("latitude") && form.watch("longitude") && (
                            <div className="text-sm text-green-600">
                                ✓ Position sélectionnée: {form.watch("latitude")?.toFixed(6)}, {form.watch("longitude")?.toFixed(6)}
                            </div>
                        )}
                        
                        {/* Validation messages */}
                        {(form.formState.errors.latitude || form.formState.errors.longitude) && (
                            <div className="text-sm text-destructive">
                                {form.formState.errors.latitude?.message || form.formState.errors.longitude?.message}
                            </div>
                        )}
                    </div>

                    {/* Hidden fields for form validation */}
                    <FormField
                        control={form.control}
                        name="latitude"
                        render={({ field }) => (
                            <FormItem className="hidden">
                                <FormControl>
                                    <input type="hidden" {...field} value={field.value || ''} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="longitude"
                        render={({ field }) => (
                            <FormItem className="hidden">
                                <FormControl>
                                    <input type="hidden" {...field} value={field.value || ''} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full">
                        Continue →
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default FirstStepForm