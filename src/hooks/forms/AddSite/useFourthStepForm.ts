import * as z from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMultiStepsForm } from '@/contexts/MultiStepsFormContext';

// Conditional schema based on asset tracking toggle
export const schema = z.object({
    assetTracking: z.boolean(),
    trackedObjectsFile: z.any().optional()
}).superRefine((data, ctx) => {
    // If asset tracking is enabled, validate the file
    if (data.assetTracking) {
        const file = data.trackedObjectsFile;
        
        if (!file || !(file instanceof File)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['trackedObjectsFile'],
                message: "Veuillez sélectionner un fichier d'objets suivis"
            });
            return;
        }
        
        // Validate file type
        const allowedTypes = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
            'application/vnd.ms-excel', // .xls
        ];
        if (!allowedTypes.includes(file.type)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['trackedObjectsFile'],
                message: "Format de fichier non supporté. Utilisez Excel (.xlsx, .xls) uniquement"
            });
            return;
        }
        
        // Validate file size
        if (file.size > 10 * 1024 * 1024) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['trackedObjectsFile'],
                message: "Le fichier est trop volumineux (max 10MB)"
            });
            return;
        }
    }
});

export type FourthStepFormValues = z.infer<typeof schema>

export default function useFourthStepForm() {
    const { nextStep, prevStep, updateStepData } = useMultiStepsForm()
    
    const form = useForm<FourthStepFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            assetTracking: false,
            trackedObjectsFile: undefined
        },
        mode: 'onChange',
    });

    // Watch the asset tracking toggle to show/hide file input
    const assetTrackingEnabled = form.watch("assetTracking");

    const onSubmit = form.handleSubmit(async (values: FourthStepFormValues) => {
        // Only include file if asset tracking is enabled
        const formData = {
            assetTracking: values.assetTracking,
            ...(values.assetTracking && values.trackedObjectsFile && {
                trackedObjectsFile: values.trackedObjectsFile
            })
        };
        
        updateStepData({site4: formData});
        // nextStep();
    });

    return {
        form,
        assetTrackingEnabled,
        onSubmit,
        prevStep
    }
}