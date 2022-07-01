import React, { useState } from 'react';
import { Project } from '@prisma/client';
import { trpc } from '@/utils/trpc';

import { EditWork } from '@/components/EditWork';
import { AddWork } from '@/components/AddWork';

const Dashboard: React.FC = () => {
  const [editIsVisible, setEditIsVisible] = useState<boolean>(false);
  const [addIsVisible, setAddIsVisible] = useState<boolean>(false);
  const { data, status } = trpc.useQuery(['work.getAll']);
  const utils = trpc.useContext()

  const { mutate } = trpc.useMutation('work.delete', {
    async onSuccess() {
      await utils.invalidateQueries(['work.getAll']);
    },
  });
  
  const addProjectToggle = () => {
    setAddIsVisible((previousValue) => !previousValue);
  }

  const editProject = (work: Project & { tags: { name: string; }[]}) => {
    setEditIsVisible(true);
    console.log(work);
  }

  const deleteProject = (id: string)=> {
    // deletar as tags se não tiver nenhum projeto usando
    mutate({ id })
  }

  return (
    <>
      <h1>Dashboard</h1>
      <button type="button" disabled={ addIsVisible } onClick={ addProjectToggle }>ADD</button>
      { addIsVisible && <AddWork addProjectToggle={ addProjectToggle }/>}
      { editIsVisible && <EditWork setEditIsVisible={setEditIsVisible} />}
      <main>
        <li>
          {data?.map((work) => (
            <ul key={work.id}>
              <div className="flex flex-col gap-2">
                <span>{work.name}</span>
                <span>{work.description}</span>
                <button type='button' onClick={() => deleteProject(work.id) }>DELETE</button>
                <button type='button' onClick={() => editProject(work) }>EDIT</button>
              </div>
            </ul>
          ))}
        </li>
      </main>
    </>
  )
}

export default Dashboard;