import { FC, PropsWithChildren, useContext } from "react";
import styled from "styled-components";
import { usePing } from "../../api/api";
import { HomeContext } from "./context";

type CounterComponentProps = {
  className?: string;
  count: number;
  addCount: () => void;
};

const CounterComponent: FC<CounterComponentProps> = (props) => (
  <div className={props.className} onClick={props.addCount}>
    Count: {props.count}
  </div>
);

const StyledCounterComponent = styled(CounterComponent)`
`;

export type CounterProps = PropsWithChildren<unknown>;

export const Counter: FC<CounterProps> = (props) => {
  const context = useContext(HomeContext);

  return <StyledCounterComponent {...props} count={context.count} addCount={context.addCount} />;
};
