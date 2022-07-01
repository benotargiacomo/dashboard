import React, { useEffect, useState } from 'react';
import { trpc } from '@/utils/trpc';

import { EditWork } from '@/components/EditWork';
import { AddWork } from '@/components/AddWork';


const Dashboard: React.FC = () => {
  const [addIsVisible, setAddIsVisible] = useState<boolean>(false);
  const [editIsVisible, setEditIsVisible] = useState<boolean>(false);
  const [currentEditId, setCurrentEditId] = useState<string>('');
  const { data, status } = trpc.useQuery(['work.getAll']);
  const utils = trpc.useContext()
  
  const isActive = addIsVisible || editIsVisible;

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
    <>
      <h1>Dashboard</h1>
      <button type="button" disabled={ isActive } onClick={ () => setAddIsVisible(true) }>ADD</button>
      { addIsVisible && <AddWork  setAddIsVisible={  setAddIsVisible } /> }
      { editIsVisible && <EditWork currentEditId={ currentEditId } setEditIsVisible={ setEditIsVisible } /> }
      <main>
        <li>
          {data?.map((work) => (
            <ul key={work.id}>
              <div className="flex flex-col gap-2">
                <span>{work.name}</span>
                <span>{work.description}</span>
                <button type='button' disabled={ isActive } onClick={() => deleteProject(work.id) }>DELETE</button>
                <button type='button' disabled={ isActive } onClick={ () => editProjectToggle(work.id) }>EDIT</button>
              </div>
            </ul>
          ))}
        </li>
      </main>
    </>
  )
}

export default Dashboard;