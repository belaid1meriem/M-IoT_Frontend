import * as z from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMultiStepsForm } from '@/contexts/MultiStepsFormContext';
import { useAddClient, type Client } from '@/hooks/useAddClient';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';


export const schema = z.object({
  telephone: z
    .string()
    .min(8, "Le numéro doit contenir au moins 8 chiffres")
    .regex(/^[0-9]+$/, "Le numéro ne doit contenir que des chiffres"),

  email: z
    .string()
    .email("Adresse email invalide"),

  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
})

export type SecondStepFormValues = z.infer<typeof schema>


export default function useSecondStepForm(){

    const { updateStepData, formData } = useMultiStepsForm()
    const{
        isLoading,
        error,
        success,
        addClient
    } = useAddClient()

    const navigate = useNavigate()

    const form = useForm<SecondStepFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
        telephone: "",
        email: "",
        password: "",
    },
    });


  const onSubmit = form.handleSubmit(async (values: SecondStepFormValues) => {
    updateStepData(values)
    // const client = getAllFormData() as Client
    await addClient({...formData, ...values, role:"client"} as Client)
  });

    useEffect(()=>{
      if (error) toast.error(error)
    },[error])

    useEffect(()=>{
      if (success) {
        toast.success(success)
        navigate('/admin/clients')
      }
    },[success])
  return {
    isLoading,
    form,
    onSubmit
  }
}



