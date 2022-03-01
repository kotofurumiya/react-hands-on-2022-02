import { FC, PropsWithChildren, useCallback, useState } from "react";
import styled from "styled-components";
import { usePing } from "../../api/api";
import { Page } from "../_layout/Page";
import { HomeContext } from "./context";
import { Counter } from "./Counter";

type HomeComponentProps = PropsWithChildren<{
  className?: string;
  message?: string;
}>;

const HomeComponent: FC<HomeComponentProps> = (props) => (
  <Page>
    <div className={props.className}>
      <div>{props.message}</div>
      <Counter/>
    </div>
  </Page>
);

const StyledHomeComponent = styled(HomeComponent)`
  .card-title {
    margin-bottom: 12px;
  }

  p {
    line-height: 1.5;
    margin: 12px 0;
  }
`;

export type HomeProps = PropsWithChildren<unknown>;

export const Home: FC<HomeProps> = (props) => {
  const message = usePing();
  const [count, setCount] = useState(0);
  
  const addCount = useCallback(() => {
    setCount((c) => c + 1);
  }, [setCount]);

  return (
    <HomeContext.Provider value={{
      count,
      addCount
    }}>
      <StyledHomeComponent {...props} message={message} />
    </HomeContext.Provider>
  );
};
