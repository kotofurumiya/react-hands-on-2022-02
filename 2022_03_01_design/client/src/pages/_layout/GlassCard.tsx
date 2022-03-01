import { FC, PropsWithChildren } from "react";
import styled from "styled-components";

type GlassCardComponentProps = PropsWithChildren<{
  className?: string;
}>;

const GlassCardComponent: FC<GlassCardComponentProps> = (props) => (
  <div className={props.className}>{props.children}</div>
);

const StyledGlassCardComponent = styled(GlassCardComponent)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
  height: 100%;
  padding: 12px;
`;

export type GlassCardProps = PropsWithChildren<{
  className?: string;
}>;

export const GlassCard: FC<GlassCardProps> = (props) => {
  return <StyledGlassCardComponent {...props} />;
};
