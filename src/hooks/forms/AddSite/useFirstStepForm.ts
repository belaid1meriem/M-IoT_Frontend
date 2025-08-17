import * as z from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMultiStepsForm } from '@/contexts/MultiStepsFormContext';

export const schema = z.object({
    nom: z.string().min(1, 'Le Site doit avoir un nom'),
    longitude: z.number().optional().refine(val => val !== undefined, {
        message: "Veuillez sélectionner une position sur la carte"
    }),
    latitude: z.number().optional().refine(val => val !== undefined, {
        message: "Veuillez sélectionner une position sur la carte"
    })
})

export type FirstStepFormValues = z.infer<typeof schema>

export default function useFirstStepForm(){
    const { nextStep, updateStepData, formData } = useMultiStepsForm()

    const form = useForm<FirstStepFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            nom: "",
            longitude: undefined,
            latitude: undefined,
        },
        mode: 'onChange', // This enables real-time validation
    });

    const onSubmit = form.handleSubmit(async (values: FirstStepFormValues) => {
        updateStepData({site1:values})
        nextStep()
    });

    return {
        form,
        onSubmit
    }
}