import { FC } from "react";
import styled from "styled-components";
import { User } from "../../../model/app";

type UserProfileComponentProps = {
  className?: string;
  user?: User;
};

const UserProfileComponent: FC<UserProfileComponentProps> = (props) => (
  <div className={props.className}>
    <div>
      <img
        className="user-avatar"
        alt="user icon"
        src={props.user?.avatarUrl || "/avatar.png"}
      />
    </div>
    <div>
      <div>{props.user?.name || "不明なユーザ"}</div>
    </div>
  </div>
);

const StyledUserProfileComponent = styled(UserProfileComponent)`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 100%;

  .user-avatar {
    border: 2px solid white;
    border-radius: 100%;
    width: 48px;
    height: 48px;
  }
`;

export type UserProfileProps = {
  user?: User;
};

export const UserProfile: FC<UserProfileProps> = (props) => {
  return <StyledUserProfileComponent {...props} />;
};
