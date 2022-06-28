import React from 'react';
import Link from 'next/link';
import { trpc } from '@/utils/trpc';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const Home: React.FC = () => {
  const { data, status } = trpc.useQuery(['work.getAll']);
  
  if (status === 'loading') return <h1>Loading...</h1>;

  return (
    <>
      <Header />
          <li>
        {data?.map((work) => (
          <ul className="flex flex-col gap-2" key={work.id}>
            <Link href={`/work/${work.id}`}>
              <div>
                <span>{work.id}</span>
                <span>{work.name}</span>
                <span>{work.description}</span>
                <span>{work.repository}</span>
                <span>{work.deploy}</span>
                <span>{work.thumbnail}</span>
                <span>{ JSON.stringify(work.tags, null, 2)}</span>
              </div>
            </Link>
          </ul>
        ))}
      </li>
      <Footer />
    </>
  );
};

export default Home;
