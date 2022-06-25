import type { NextPage } from 'next';

import { trpc } from '../utils/trpc';

const Home: NextPage = (props: any) => {
  const { data, isLoading } = trpc.useQuery(['getWork']);

  if (isLoading || !data) return <h1>Loading...</h1>
  
  return (
    <h1>{ data.username }</h1>
  );
}

export default Home
