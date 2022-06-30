import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '@/utils/trpc';
import { z } from 'zod';

import { Error } from '@/components/Error';

const addSchema = z.object({
  name: z.string()
    .min(1, { message: 'Name is required' })
    .max(50, { message: 'Name must contain at most 40 character(s)'}),
  description: z.string()
    .min(1, { message: 'Description is required' })
    .max(200, { message: 'Description must contain at most 200 character(s)'}),
  repository: z.string()
    .min(1, { message: 'Repository is required' })
    .url({ message: 'Invalid url' }),
  deploy: z.string()
    .min(1, { message: 'Deploy is required' })
    .url({ message: 'Invalid url' }),
  thumbnail: z.string()
    .min(1, { message: 'Thumbnail is required' })
    .url({ message: 'Invalid url' }),
  tags: z.string()
    .min(1, { message: 'Tags is required' }),
})

type Inputs = z.infer<typeof addSchema>;

const Dashboard: React.FC = () => {
    const utils = trpc.useContext()
    const { data, status } = trpc.useQuery(['work.getAll']);
    const { mutateAsync } = trpc.useMutation('work.create', {
      async onSuccess() {
        // refetches posts after a post is added
        await utils.invalidateQueries(['work.getAll']);
      },
    });

    const { mutate } = trpc.useMutation('work.delete', {
      async onSuccess() {
        await utils.invalidateQueries(['work.getAll']);
      },
    });

  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm<Inputs>({
    resolver: zodResolver(addSchema)
    // Validation DEBUG!!!
    // resolver: async (data, context, options) => {
    //   console.log('formData', data)
    //   console.log('validation result', await zodResolver(addSchema)(data, context, options))
    //   return zodResolver(addSchema)(data, context, options)
    // },
  });

  const addProject = (data: Inputs) => {
    mutateAsync({
      name: data.name,
      description: data.description,
      repository: data.repository,
      deploy: data.deploy,
      thumbnail: data.thumbnail,
      tags: data.tags.split(', '),
    });
  }
  
  const deleteProject = (id: string): void => {
    // deletar as tags se não tiver nenhum projeto usando
    mutate({ id })
  }

  useEffect(() => {
    reset({
      name: '',
      description: '',
      repository: '',
      deploy: '',
      thumbnail: '',
      tags: ''
    })
  }, [isSubmitSuccessful, reset])
  

  return (
    <>
      <h1>Dashboard</h1>
      <form
        onSubmit={ handleSubmit(addProject) }
        className="flex flex-col gap-2"
      >
        <input {...register("name")} placeholder="Name" />
        <Error>{errors.name?.message}</Error>
        <input {...register("description")} placeholder="Description" />
        <Error>{errors.description?.message}</Error>
        <input {...register("repository")} placeholder="Repository" />
        <Error>{errors.repository?.message}</Error>
        <input {...register("deploy")} placeholder="Deploy" />
        <Error>{errors.deploy?.message}</Error>
        <input {...register("thumbnail")} placeholder="Thumbnail" />
        <Error>{errors.thumbnail?.message}</Error>
        <input {...register("tags")} placeholder="Tags" />
        <Error>{errors.tags?.message}</Error>
        <button type="submit">ADD</button>
      </form>
      <main>
      <li>
        {data?.map((work) => (
          <ul key={work.id}>
            <div className="flex flex-col gap-2">
              <span>{work.name}</span>
              <span>{work.description}</span>
              <button type='button' onClick={() => deleteProject(work.id) }>DELETE</button>
            </div>
          </ul>
        ))}
      </li>
      </main>
    </>
  )
}

export default Dashboard;