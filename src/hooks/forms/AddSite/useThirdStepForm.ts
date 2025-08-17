import * as z from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMultiStepsForm } from '@/contexts/MultiStepsFormContext';

// Schema for file upload
export const schema = z.object({
    machinesFile: z.any().refine(
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
            ];
            return allowedTypes.includes(file.type);
        },
        {
            message: "Format de fichier non supporté. Utilisez Excel (.xlsx, .xls) uniquement"
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

export type ThirdStepFormValues = z.infer<typeof schema>

export default function useThirdStepForm() {
    const { nextStep, prevStep, updateStepData } = useMultiStepsForm()

    const form = useForm<ThirdStepFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            machinesFile: null
        },
        mode: 'onChange',
    });

    const onSubmit = form.handleSubmit(async (values: ThirdStepFormValues) => {
        // Just pass the file to the next step
        // Backend will handle file processing via useAddMachine hook
        updateStepData({ 
            site3: values.machinesFile
        });
        nextStep();
    });

    return {
        form,
        onSubmit,
        prevStep
    }
}