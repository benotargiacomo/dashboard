import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { trpc } from '@/utils/trpc';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Error } from '@/components/Error';
import { useQuery } from 'react-query';

const editSchema = z.object({
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

type Inputs = z.infer<typeof editSchema>;

interface EditProps {
  currentEditId: string;
  setEditIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditWork: React.FC<EditProps> = ({ currentEditId: id, setEditIsVisible }) => {
  const utils = trpc.useContext();
  const { data, status } = trpc.useQuery(['work.getById', { id }])
  const { mutate } = trpc.useMutation('work.edit', {
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
      name: data?.name,
      description: data?.description,
      repository: data?.repository,
      deploy: data?.repository,
      tags: '',
    },
    resolver: zodResolver(editSchema),
  });

  const editProject = (work: Inputs) => {
    console.log(work)
    // mutate({
    //   id,
    //   data: {
    //     name: data?.name,
    //     description: data.description,
    //     repository: data.repository,
    //     deploy: data.deploy,
    //     tags: data.tags.split(', '),
    //   }
    // });
  };

  useEffect(() => {
    reset();
    // LOG
    console.log('render edit');
    // setEditIsVisible(false);
  }, [isSubmitSuccessful, reset]);

  if(status === 'loading') return <h1>Loading...</h1>

  return (
    <>
      <div>
        <button type="button" onClick={() => setEditIsVisible(false)}>
          x
        </button>
        <form
          onSubmit={handleSubmit(editProject)}
          className="flex flex-col gap-8"
        >
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
          <button type="button" onClick={() => setEditIsVisible(false)}>
          CANCEL
          </button>
          <button type="submit">
            OK
          </button>
        </form>
      </div>
    </>
  );
};
