import React from 'react'

export const Header: React.FC = () => {
    return (
      <header className="fixed top-0 w-full bg-white">
        <main className='flex items-center justify-between my-6'>
          <div className='w-36 h-10'>LOGO</div>
          <div className='w-36 h-10'>LOGO</div>
          <div className='w-36 h-10'>LOGO</div>
        </main>
      </header>
    );
}