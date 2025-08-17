import * as z from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMultiStepsForm } from '@/contexts/MultiStepsFormContext';


export const schema = z.object({
  nom_entreprise: z
    .string()
    .min(2, "Le nom de l’entreprise doit contenir au moins 2 caractères"),
    
  adresse: z
    .string()
    .min(5, "L’adresse doit contenir au moins 5 caractères"),

  industrie: z
    .string()
    .min(2, "L’industrie doit contenir au moins 2 caractères"),

  responsable_nom: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères"),

  responsable_prenom: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères"),
})

export type FirstStepFormValues = z.infer<typeof schema>


export default function useFirstStepForm(){

    const { nextStep, updateStepData } = useMultiStepsForm()

    const form = useForm<FirstStepFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
        nom_entreprise: "",
        adresse: "",
        industrie: "",
        responsable_nom: "",
        responsable_prenom: "",
    },
    });


  const onSubmit = form.handleSubmit(async (values: FirstStepFormValues) => {
    updateStepData(values)
    nextStep()
  });


  return {
    form,
    onSubmit
  }
}



