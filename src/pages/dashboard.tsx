import React, { useState } from 'react';
// import { trpc } from '@/utils/trpc';

// import * as Dialog from '@radix-ui/react-dialog';

import { AddWork } from '@/components/AddWork';
import { WorkPanel } from '@/components/WorkPanel';
import Image from 'next/image';


const Dashboard: React.FC = () => {
  const [addIsVisible, setAddIsVisible] = useState<boolean>(false);

  return (
    <div className="min-h-screen w-full flex flex-col bg-red-500">
      <header className="w-full h-14 lg:h-20 px-6 lg:px-20 flex items-center justify-between drop-shadow-down bg-white">
        <span className="text-lg font-bold text-blue-500 lg:text-2xl">
          Dashboard
        </span>
        <nav className="flex gap-1">
          <button
            type="button"
            className="flex items-center border border-slate-500 rounded-2xl hover:text-white hover:bg-slate-500 hover:border-0"
            onClick={ () => setAddIsVisible(true) }
          > 
            <Image
              src="/assets/plus-icon.svg"
              height={24}
              width={24}
              alt="Deploy"
            />
          </button>
          <button type="button">
            <Image
              src="/assets/plus-icon.svg"
              height={24}
              width={24}
              alt="Deploy"
            />
          </button>
        </nav>
      </header>
      <main>
        <div>
          
        {/* <Dialog.Root>
          <Dialog.Trigger asChild>
            <button onClick={ () => console.log('EDITAR')}>EDITAR</button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay>
            <Dialog.Content className='w-2/4 h-2/4 fixed inset-y-1/2'>
            <Dialog.Title>Edit profile</Dialog.Title>
            <Dialog.Description>
              Make changes to your profile here. Click save when you are done.
            </Dialog.Description>
            <Dialog.Close >
              SAVE CHANGES
            </Dialog.Close>
            </Dialog.Content>
            </Dialog.Overlay>
          </Dialog.Portal>
        </Dialog.Root> */}

          { addIsVisible && <AddWork  setAddIsVisible={  setAddIsVisible } /> }
        </div>
        <WorkPanel />
      </main>
    </div>
  )
}

export default Dashboard;