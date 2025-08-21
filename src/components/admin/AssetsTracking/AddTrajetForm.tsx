// src/components/AddTrajectoryForm.tsx
import React from 'react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Plus, Trash2 } from "lucide-react"
import { FormFieldText } from "@/components/ui/FormFieldText"
import useAddTrajectoryForm from "@/hooks/forms/useAddTrajectoryForm"

export function AddTrajectoryForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    form,
    isLoading,
    handleSubmit,
    addPoint,
    removePoint,
    points
  } = useAddTrajectoryForm()

  return (
    <div className={cn("", className)} {...props}>
      <Form {...form}>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Trajectory Meta */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormFieldText
              control={form.control}
              name="nom_trajet"
              label="Nom de trajet"
              placeholder="Livraison Alger-Oran"
            />
            <FormFieldText
              control={form.control}
              name="objet_tracking_nom"
              label="Objet (tracking)"
              placeholder="Camion_RF001"
            />
          </div>

          {/* Source */}
          <div className="space-y-4 bg-card">
            <h3 className="font-semibold text-foreground">Point de départ</h3>
            <FormFieldText
              control={form.control}
              name="source_nom"
              label="Nom du lieu"
              placeholder="Port d'Alger, Alger"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormFieldText
                control={form.control}
                name="source_latitude"
                label="Latitude"
                placeholder="36.7631"
                type="number"
              />
              <FormFieldText
                control={form.control}
                name="source_longitude"
                label="Longitude"
                placeholder="3.0506"
                type="number"
              />
              <FormFieldText
                control={form.control}
                name="date_prevu_source"
                label="Date prévue"
                type="date"
              />
            </div>
          </div>

          {/* Destination */}
          <div className="space-y-4 bg-card">
            <h3 className="font-semibold text-foreground">Point d’arrivée</h3>
            <FormFieldText
              control={form.control}
              name="destination_nom"
              label="Nom du lieu"
              placeholder="Port d'Oran, Oran"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormFieldText
                control={form.control}
                name="destination_latitude"
                label="Latitude"
                placeholder="35.7089"
                type="number"
              />
              <FormFieldText
                control={form.control}
                name="destination_longitude"
                label="Longitude"
                placeholder="-0.6333"
                type="number"
              />
              <FormFieldText
                control={form.control}
                name="date_prevu_destination"
                label="Date prévue"
                type="date"
              />
            </div>
          </div>

          {/* Intermediate Points */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Points intermédiaires</h3>
            <div className="border border-border rounded-lg overflow-hidden bg-card">
              {/* Table Header */}
              <div className="grid grid-cols-6 gap-2 px-4 py-3 bg-accent text-sm font-medium text-accent-foreground border-b border-border">
                <div>Ordre</div>
                <div>Point</div>
                <div>Latitude</div>
                <div>Longitude</div>
                <div>Date prévu</div>
                <div>Action</div>
              </div>

              {points.map((_, index) => (
                <div key={index} className="grid grid-cols-6 gap-2 px-4 py-3 border-b border-border items-center hover:bg-muted/50">
                  {/* ordre */}
                  <FormFieldText
                    control={form.control}
                    name={`points.${index}.ordre`}
                    type="number"
                    placeholder={`${index + 1}`}
                  />
                  {/* nom_lieu */}
                  <FormFieldText
                    control={form.control}
                    name={`points.${index}.nom_lieu`}
                    placeholder="Nom du lieu"
                  />
                  {/* latitude */}
                  <FormFieldText
                    control={form.control}
                    name={`points.${index}.latitude`}
                    placeholder="36.4203"
                    type="number"
                  />
                  {/* longitude */}
                  <FormFieldText
                    control={form.control}
                    name={`points.${index}.longitude`}
                    placeholder="2.8277"
                    type="number"
                  />
                  {/* date_prevu */}
                  <FormFieldText
                    control={form.control}
                    name={`points.${index}.date_prevu`}
                    type="date"
                  />
                  {/* remove btn */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removePoint(index)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              {/* Add Point Button */}
              <div className="px-4 py-3 border-t border-border">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={addPoint}
                  className="flex items-center justify-center w-full border-2 border-dashed border-muted-foreground/25 rounded-lg py-2 hover:border-muted-foreground/50 hover:bg-muted/25 text-muted-foreground hover:text-foreground"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un point
                </Button>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'En cours...' : 'Terminer'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
