import type { NextPage } from 'next';

import { trpc } from '@/utils/trpc';

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(['work.getAll']);

  if (isLoading || !data) return <h1>Loading...</h1>
  
  return (
    <h1>{ data.length }</h1>
  );
}

export default Home
