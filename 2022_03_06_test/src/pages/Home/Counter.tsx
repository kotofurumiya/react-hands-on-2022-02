import { FC, useCallback, useState } from 'react';
import styled from 'styled-components';

type CounterComponentProps = {
  className?: string;
  count: number;
  addCount: () => void;
};

const CounterComponent: FC<CounterComponentProps> = (props) => (
  <div className={props.className} onClick={props.addCount} data-test-id="counter">
    Count: {props.count}
  </div>
);

const StyledCounterComponent = styled(CounterComponent)`
  padding: 2em;
  border: 2px solid gray;
`;

export const useCounter = () => {
  const [count, setCount] = useState(0);
  const increase = useCallback(() => setCount((current) => current + 1), [setCount]);
  return [count, increase] as const;
};

export const Counter = () => {
  const [count, addCount] = useCounter();

  return <StyledCounterComponent count={count} addCount={addCount} />;
};
