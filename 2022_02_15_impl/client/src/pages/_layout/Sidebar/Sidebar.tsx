import { FC } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { User } from "../../../model/app";
import { useSession } from "../../../state/auth";
import { GlassCard } from "../GlassCard";
import { UserProfile } from "./UserProfile";

type SidebarComponentProps = {
  className?: string;
  user?: User;
};

const SidebarComponent: FC<SidebarComponentProps> = (props) => (
  <div className={props.className}>
    <GlassCard>
      <div className="user-profile">
        <UserProfile user={props.user} />
      </div>
    </GlassCard>

    <GlassCard>
      <nav className="navigation">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "link active-link" : "link")}
        >
          Home
        </NavLink>
        <NavLink
          to="/posts"
          className={({ isActive }) => (isActive ? "link active-link" : "link")}
        >
          Posts
        </NavLink>
      </nav>
    </GlassCard>
  </div>
);

const StyledSidebarComponent = styled(SidebarComponent)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: system-ui, sans-serif;
  width: 100%;
  height: 100%;

  .user-profile {
    width: max-content;
    margin: auto;
  }

  .link {
    display: block;
    font-size: 16px;
    color: currentColor;
    text-decoration: none;
    padding: 4px;
    padding-left: 8px;
    margin: 8px 0;
    border-left: 6px solid transparent;
  }

  .active-link {
    border-left-color: white;
  }
`;

export type SidebarProps = {};

export const Sidebar: FC<SidebarProps> = (props) => {
  const user = useSession();

  return <StyledSidebarComponent {...props} user={user} />;
};
