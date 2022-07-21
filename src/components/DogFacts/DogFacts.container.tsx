import { useState } from 'react';
import { debounce } from '~/utils/functions';
import { trpc } from '~/utils/trpc';
import { DogFacts as Component } from './DogFacts';

export const DogFacts = () => {
  const [number, setNumber] = useState<number | undefined>(undefined);
  const { data, isFetching, isError, error, refetch } = trpc.useQuery([
    'dogFacts.get-random-fact',
    { number },
  ]);

  if (isFetching) {
    return <h1>Is Fetching ...</h1>;
  }

  if (isError) {
    return (
      <h1>
        <>Is Error ... {error}</>
      </h1>
    );
  }

  return (
    <Component
      facts={data?.facts || []}
      number={number}
      onClick={refetch}
      onChange={debounce(setNumber, 1000)}
    />
  );
};
