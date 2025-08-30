import * as z from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '../auth/useLogin';
import { useEffect } from 'react';
import { toast } from 'sonner';

const loginFormSchema = z.object({
    email: z.email(),
    password: z.string()
})

type LoginFormType = z.infer<typeof loginFormSchema>

export default function useLoginForm(){

    const {
        isLoading,
        error,
        success,
        login
    } = useLogin()

    const form = useForm<LoginFormType>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
        email: '',
        password: '',
        },
    });

  const onSubmit = form.handleSubmit(async ({ email, password }: LoginFormType) => {
    await login(email, password);
  });

  useEffect(()=>{
    if(success) {
      toast.success(success)
    }
  },[success])

  useEffect(()=>{
    if (error) toast.error(error)
  },[error])

  return {
    form,
    isLoading,
    error,
    success,
    onSubmit
  }
}



