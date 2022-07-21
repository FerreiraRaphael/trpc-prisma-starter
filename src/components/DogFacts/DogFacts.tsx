import { memo, PropsWithChildren, useMemo } from 'react';

interface IDogFactsProps {
  facts: string[];
  number?: number;
  onClick(): void;
  onChange(value?: number): void;
}

const DogFact: React.FC<PropsWithChildren> = ({ children }) => {
  return <p>{children}</p>;
};

export const DogFacts = memo(
  ({ facts, number, onClick, onChange }: IDogFactsProps) => {
    const Facts = useMemo(
      () => facts.map((fact, index) => <DogFact key={index}>{fact}</DogFact>),
      [facts],
    );
    return (
      <div className="container">
        {Facts}
        <p>Number of facts: {number}</p>
        <input
          type="number"
          value={number}
          onChange={(e) => {
            const value = Number(e.target.value);
            onChange(isNaN(value) ? undefined : value);
          }}
        />
        <button onClick={onClick}>Buscar outra</button>
        <style jsx>{`
          .container {
            display: flex;
            flex-direction: column;
          }
        `}</style>
      </div>
    );
  },
);

DogFacts.displayName = 'DogFacts';
