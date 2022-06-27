import React from 'react';
import { trpc } from '@/utils/trpc';

const Home: React.FC = () => {
  const { data, isLoading } = trpc.useQuery(['work.getAll']);
  
  if (isLoading || !data) return <h1>Loading...</h1>;

  return (
    <>
      <li>
        {data?.map((work) => (
          <ul className="flex flex-col gap-2" key={work.id}>
            <span>{work.id}</span>
            <span>{work.name}</span>
            <span>{work.description}</span>
            <span>{work.repository}</span>
            <span>{work.deploy}</span>
            <span>{work.thumbnail}</span>
            <span>{ JSON.stringify(work.tags, null, 2)}</span>
          </ul>
        ))}
      </li>
    </>
  );
};

export default Home;
