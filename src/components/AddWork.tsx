import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { trpc } from '@/utils/trpc';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Error } from '@/components/Error';

const addSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(50, { message: 'Name must contain at most 40 character(s)' }),
  description: z
    .string()
    .min(1, { message: 'Description is required' })
    .max(200, { message: 'Description must contain at most 200 character(s)' }),
  repository: z
    .string()
    .min(1, { message: 'Repository is required' })
    .url({ message: 'Invalid url' }),
  deploy: z
    .string()
    .min(1, { message: 'Deploy is required' })
    .url({ message: 'Invalid url' }),
  tags: z.string().min(1, { message: 'Tags is required' }),
});

type Inputs = z.infer<typeof addSchema>;

interface AddProps {
	setAddIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddWork: React.FC<AddProps> = ({ setAddIsVisible }) => {
  const utils = trpc.useContext();
  const { mutate } = trpc.useMutation('work.create', {
    onSuccess() {
      utils.invalidateQueries(['work.getAll']);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Inputs>({
    defaultValues: {
      name: '',
      description: '',
      repository: '',
      deploy: '',
      tags: '',
    },
    resolver: zodResolver(addSchema),
    // Validation DEBUG!!!
    // resolver: async (data, context, options) => {
    //   console.log('formData', data)
    //   console.log('validation result', await zodResolver(addSchema)(data, context, options))
    //   return zodResolver(addSchema)(data, context, options)
    // },
  });

  const addProject = (work: Inputs) => {
    mutate({
      name: work.name,
      description: work.description,
      repository: work.repository,
      deploy: work.deploy,
      tags: work.tags.split(', '),
    });
  };

  useEffect(() => {
    reset();
		// LOG
		console.log('render add');
    // setAddIsVisible(false);
  }, [isSubmitSuccessful, reset]);

  return (
    <div>
      <button type="button" onClick={() => setAddIsVisible(false)}>
        x
      </button>
      <form onSubmit={handleSubmit(addProject)} className="flex flex-col gap-8">
        <input {...register('name')} placeholder="Name" />
        <Error>{errors.name?.message}</Error>
        <input {...register('description')} placeholder="Description" />
        <Error>{errors.description?.message}</Error>
        <input {...register('repository')} placeholder="Repository" />
        <Error>{errors.repository?.message}</Error>
        <input {...register('deploy')} placeholder="Deploy" />
        <Error>{errors.deploy?.message}</Error>
        <input {...register('tags')} placeholder="Tags" />
        <Error>{errors.tags?.message}</Error>
        <button type="button" onClick={() => setAddIsVisible(false)}>
          CANCEL
        </button>
        <button type="submit">
					OK
				</button>
      </form>
    </div>
  );
};
