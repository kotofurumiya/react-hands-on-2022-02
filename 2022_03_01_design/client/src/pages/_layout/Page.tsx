import { FC, PropsWithChildren } from "react";
import styled from "styled-components";

export const pageVariableNames = {
  primaryColor: "--color-primary",
  textColor: "--color-text",
};

type PageComponentProps = PropsWithChildren<{
  className?: string;
}>;

const PageComponent: FC<PageComponentProps> = (props) => (
  <div className={props.className}>
    <main className="content">{props.children}</main>
  </div>
);

const StyledPageComponent = styled(PageComponent)`
  ${pageVariableNames.primaryColor}: rgb(197, 82, 82);
  ${pageVariableNames.textColor}: rgb(0, 0, 0);

  display: flex;
  align-items: flex-start;
  
  color: var(${pageVariableNames.textColor});
  font-family: system-ui, sans-serif;
  width: 100%;
  height: 100%;
  overflow: auto;

  & > .sidebar {
    width: 30%;
    max-width: 300px;
    padding: 24px;
  }

  & > .content {
    flex: 1;
    padding: 24px;
  }
`;

export type PageProps = PropsWithChildren<unknown>;

export const Page: FC<PageProps> = (props) => {
  return <StyledPageComponent {...props} />;
};
