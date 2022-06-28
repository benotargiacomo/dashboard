
import React from 'react';
import { useRouter } from 'next/router';
import { trpc } from '@/utils/trpc';

const Work: React.FC = (props) => {
  const id = useRouter().query.id as string;
  const { data, status } = trpc.useQuery(['work.getById', { id }]);

  if (status === 'loading') return <h1>Loading...</h1>

  return (
    <div>
      <h1>{ JSON.stringify(data, null, 4) }</h1>
    </div>
  );
};

export default Work;
