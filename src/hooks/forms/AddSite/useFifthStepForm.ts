import * as z from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMultiStepsForm } from '@/contexts/MultiStepsFormContext';

// Schema for file upload
export const schema = z.object({
    usersFile: z.any().refine(
        (file) => file && file instanceof File,
        {
            message: "Veuillez sélectionner un fichier"
        }
    ).refine(
        (file) => {
            if (!file) return false;
            const allowedTypes = [
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
                'application/vnd.ms-excel', // .xls
                'text/csv', // .csv
            ];
            return allowedTypes.includes(file.type);
        },
        {
            message: "Format de fichier non supporté. Utilisez Excel (.xlsx, .xls) ou CSV uniquement"
        }
    ).refine(
        (file) => {
            if (!file) return false;
            return file.size <= 10 * 1024 * 1024; // 10MB
        },
        {
            message: "Le fichier est trop volumineux (max 10MB)"
        }
    )
});

export type FifthStepFormValues = z.infer<typeof schema>

export default function useFifthStepForm() {
    const { nextStep, prevStep, updateStepData } = useMultiStepsForm()
    
    const form = useForm<FifthStepFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            usersFile: null
        },
        mode: 'onChange',
    });

    const onSubmit = form.handleSubmit(async (values: FifthStepFormValues) => {
        // Pass the file to the form data
        updateStepData({ 
            site5: values.usersFile
        });

        nextStep()
    });

    return {
        form,
        onSubmit,
        prevStep
    }
}