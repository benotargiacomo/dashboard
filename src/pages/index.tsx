import type { NextPage } from 'next';

import { prisma } from  '../db/client';
import { trpc } from '../utils/trpc';

const Home: NextPage = (props: any) => {
  const { data, isLoading } = trpc.useQuery(['hello']);

  if (isLoading || !data) return <h1>Loading...</h1>
  
  return (
    <h1>{ data.greeting }</h1>
  );
}

// export const getServerSideProps = async () => {
//   const user = await prisma.user.findFirst({
//     where: {
//       username: 'Bernardo',
//     }
//   });

//   return {
//     props: {
//       user,
//     }
//   }
// }

export default Home
