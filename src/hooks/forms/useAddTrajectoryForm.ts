// src/hooks/forms/useAddTrajectoryForm.ts
import * as z from 'zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useAddTrajectory } from '../useAddTrajectory';

const pointSchema = z.object({
  nom_lieu: z.string().min(1, 'Le nom du lieu est requis'),
  latitude: z.number().refine((val) => val !== undefined, {
    message: 'La latitude est requise'
  }),
  longitude: z.number().refine((val) => val !== undefined, {
    message: 'La longitude est requise'
  }),
  ordre: z.number().min(1, 'L\'ordre doit être supérieur à 0'),
  date_prevu: z.string().min(1, 'La date prévue est requise')
});

const addTrajectoryFormSchema = z.object({
  nom_trajet: z.string().min(1, 'Le nom du trajet est requis'),
  objet_tracking_nom: z.string().min(1, 'Le nom de l\'objet tracking est requis'),

  // Source
  source_nom: z.string().min(1, 'Le nom du lieu de départ est requis'),
  source_latitude: z.number().refine((val) => val !== undefined, {
    message: 'La latitude de départ est requise'
  }),
  source_longitude: z.number().refine((val) => val !== undefined, {
    message: 'La longitude de départ est requise'
  }),
  date_prevu_source: z.string().min(1, 'La date prévue de départ est requise'),

  // Destination
  destination_nom: z.string().min(1, 'Le nom du lieu d\'arrivée est requis'),
  destination_latitude: z.number().refine((val) => val !== undefined, {
    message: 'La latitude d\'arrivée est requise'
  }),
  destination_longitude: z.number().refine((val) => val !== undefined, {
    message: 'La longitude d\'arrivée est requise'
  }),
  date_prevu_destination: z.string().min(1, 'La date prévue d\'arrivée est requise'),

  // Points intermédiaires
  points: z.array(pointSchema)
});


type AddTrajectoryFormType = z.infer<typeof addTrajectoryFormSchema>;

export default function useAddTrajectoryForm() {
  const {
    isLoading,
    error,
    success,
    addTrajectory,
    clearError
  } = useAddTrajectory();

  const form = useForm<AddTrajectoryFormType>({
    resolver: zodResolver(addTrajectoryFormSchema),
    defaultValues: {
      nom_trajet: '',
      objet_tracking_nom: '',
      source_nom: '',
      source_latitude: undefined as any,
      source_longitude: undefined as any,
      date_prevu_source: '',
      destination_nom: '',
      destination_latitude: undefined as any,
      destination_longitude: undefined as any,
      date_prevu_destination: '',
      points: []
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "points"
  });

  const addPoint = () => {
    const nextOrder = fields.length + 1;
    append({
      nom_lieu: '',
      latitude: undefined as any,
      longitude: undefined as any,
      ordre: nextOrder,
      date_prevu: ''
    });
  };

  const removePoint = (index: number) => {
    remove(index);
    // Reorder remaining points
    const currentPoints = form.getValues('points');
    currentPoints.forEach((_, i) => {
      if (i > index) {
        form.setValue(`points.${i - 1}.ordre`, i);
      }
    });
  };

  const handleSubmit = form.handleSubmit(async (data: AddTrajectoryFormType) => {
      await addTrajectory(data);
  });

  useEffect(() => {
    if (success) {
      toast.success(success);
      form.reset({
        nom_trajet: '',
        objet_tracking_nom: '',
        source_nom: '',
        source_latitude: undefined as any,
        source_longitude: undefined as any,
        date_prevu_source: '',
        destination_nom: '',
        destination_latitude: undefined as any,
        destination_longitude: undefined as any,
        date_prevu_destination: '',
        points: []
      });
    }
  }, [success, form]);

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //   }
  // }, [error]);

  return {
    form,
    isLoading,
    error,
    clearError,
    success,
    handleSubmit,
    addPoint,
    removePoint,
    points: fields
  };
}
