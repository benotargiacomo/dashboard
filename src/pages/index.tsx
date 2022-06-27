import type { NextPage } from 'next';

import { trpc } from '@/utils/trpc';

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(['work.getAll']);
  
  if (isLoading || !data) return <h1>Loading...</h1>;

  return (
    <>
      <li>
        {data?.map((work) => (
          <ul key={work.id}>
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
