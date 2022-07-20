import React from 'react';
import Image from 'next/image';
import { trpc } from '@/utils/trpc';

const Home: React.FC = () => {
  const { data, status } = trpc.useQuery(['work.getAll']);

  if (status === 'loading')
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1>Loading...</h1>
      </div>
    );

  if (status === 'success')
    return (
      <div className="min-h-screen flex flex-col items-center">
        <ul className="w-[90%] max-w-5xl grid [grid-template-columns:repeat(auto-fit,_minmax(250px,_1fr))] gap-4 drop-shadow-hard">
          {data?.map((work) => (
            <li
              className="flex flex-col rounded-md bg-blue-500 transition ease-in-out hover:scale-105 hover:bg-indigo-500 duration-300"
              key={work.id}
            >
              <section className="flex flex-col m-6">
                <header className="flex items-center justify-between mb-4">
                  {/* <Link href={`/work/${work.id}`}> */}
                  <strong>{work.name}</strong>
                  {/* </Link> */}
                  <nav>
                    <a className="cursor-pointer" href={work.repository}>
                      <Image
                        src="/assets/repository-icon.svg"
                        height={24}
                        width={24}
                        alt="Repository"
                      />
                    </a>
                    <a className="cursor-pointer" href={work.deploy}>
                      <Image
                        src="/assets/external-icon.svg"
                        height={24}
                        width={24}
                        alt="Deploy"
                      />
                    </a>
                  </nav>
                </header>
                {/* <Link href={`/work/${work.id}`}> */}
                <p className="mb-6">{work.description}</p>
                {/* </Link> */}
                <ul className="flex gap-4">
                  {work.tags.map((tag) => (
                    <li className="capitalize" key={tag.name}>{tag.name}</li>
                  ))}
                </ul>
              </section>
            </li>
          ))}
        </ul>
      </div>
    );

  return null;
};

export default Home;
