import * as z from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useChangePassword } from '../auth/useChangePassword';

const changePasswordFormSchema = z.object({
    oldPassword: z.string(),
    newPassword: z.string()
})

type ChangePasswordFormType = z.infer<typeof changePasswordFormSchema>

export default function useChangePasswordForm(){

    const {
        isLoading,
        error,
        success,
        changePassword
    } = useChangePassword()

    const form = useForm<ChangePasswordFormType>({
        resolver: zodResolver(changePasswordFormSchema),
        defaultValues: {
        oldPassword: '',
        newPassword: '',
        },
    });

  const onSubmit = form.handleSubmit(async ({ oldPassword, newPassword }: ChangePasswordFormType) => {
    await changePassword(oldPassword, newPassword);
  });

  useEffect(()=>{
    if(success) toast.success(success)
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



