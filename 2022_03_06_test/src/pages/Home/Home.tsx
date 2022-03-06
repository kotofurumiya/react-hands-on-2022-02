import { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { Page } from '../_layout/Page';
import { Counter } from './Counter';

type HomeComponentProps = PropsWithChildren<{
  className?: string;
}>;

const HomeComponent: FC<HomeComponentProps> = (props) => (
  <Page>
    <div className={props.className}>Hello!</div>
    <Counter />
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
  return <StyledHomeComponent {...props} />;
};
