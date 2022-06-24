import type { NextPage } from 'next';

import { prisma } from  '../db/client';

const Home: NextPage = (props: any) => {
  return (
    <h1>{ props.user.username }</h1>
  );
}

export const getServerSideProps = async () => {
  const user = await prisma.user.findFirst({
    where: {
      username: 'Bernardo',
    }
  });

  return {
    props: {
      user,
    }
  }
}

export default Home
