import * as z from 'zod'
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMultiStepsForm } from '@/contexts/MultiStepsFormContext';

// Schema for parameters
const parametreSchema = z.object({
    nom: z.string().min(1, 'Le nom du paramètre est requis'),
    unite: z.string().min(1, 'L\'unité est requise'),
    valeur_max: z.number().positive('La valeur max doit être positive')
});

// Schema for capteurs
const capteurSchema = z.object({
    num_serie: z.string().min(1, 'Le numéro de série est requis'),
    date_install: z.string().min(1, 'La date d\'installation est requise'),
    parametres: z.array(parametreSchema).min(1, 'Au moins un paramètre est requis')
});

// Main schema
export const schema = z.object({
    capteurs: z.array(capteurSchema).min(1, 'Au moins un capteur est requis')
});

export type SecondStepFormValues = z.infer<typeof schema>
export type CapteurFormValues = z.infer<typeof capteurSchema>
export type ParametreFormValues = z.infer<typeof parametreSchema>

export default function useSecondStepForm() {
    const { nextStep, prevStep, updateStepData, formData } = useMultiStepsForm()

    const form = useForm<SecondStepFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            capteurs: [{
                num_serie: "",
                date_install: "",
                parametres: [{
                    nom: "",
                    unite: "",
                    valeur_max: 0
                }]
            }]
        },
        mode: 'onChange',
    });

    // Field array for capteurs
    const {
        fields: capteurFields,
        append: appendCapteur,
        remove: removeCapteur
    } = useFieldArray({
        control: form.control,
        name: "capteurs"
    });

    const addCapteur = () => {
        appendCapteur({
            num_serie: "",
            date_install: "",
            parametres: [{
                nom: "",
                unite: "",
                valeur_max: 0
            }]
        });
    };

    const onSubmit = form.handleSubmit(async (values: SecondStepFormValues) => {
        updateStepData({site2:values})
        const data = {site2:values}
        console.log({...formData, ...data})
        nextStep()
    });

    return {
        form,
        capteurFields,
        addCapteur,
        removeCapteur,
        onSubmit,
        prevStep
    }
}