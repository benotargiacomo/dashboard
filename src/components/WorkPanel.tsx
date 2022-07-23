import React, { useEffect, useState } from 'react'
import { trpc } from '@/utils/trpc';

import { EditWork } from './EditWork';

export const WorkPanel: React.FC = () => {
  const [editIsVisible, setEditIsVisible] = useState<boolean>(false);
  const [currentEditId, setCurrentEditId] = useState<string>('');
  const { data, status } = trpc.useQuery(['work.getAll']);
  const utils = trpc.useContext()

  const { mutate } = trpc.useMutation('work.delete', {
    async onSuccess() {
      await utils.invalidateQueries(['work.getAll']);
    },
  });

  const editProjectToggle = (id: string) => {
    setCurrentEditId(id)

    setEditIsVisible(true);
  }

  const deleteProject = (id: string)=> {
    // deletar as tags se não tiver nenhum projeto usando
    mutate({ id })
  }

  useEffect(() => {
    for (const { id } of data ?? []) {
      utils.prefetchQuery(['work.getById', { id }]);
    }
  }, [data, utils]);

    return (
      <main className="flex flex-col">
        { editIsVisible && <EditWork currentEditId={ currentEditId } setEditIsVisible={ setEditIsVisible } /> }
        <ul>
        {data?.map((work) => (
          <li key={work.id}>
            <section className="flex flex-col border border-blue-500">
              <span>{work.name}</span>
              <span>{work.description}</span>
              <button type='button' onClick={() => deleteProject(work.id) }>DELETE</button>
              <button type='button' onClick={ () => editProjectToggle(work.id) }>EDIT</button>
            </section>
          </li>
        ))}
      </ul>
    </main>
    );
}
