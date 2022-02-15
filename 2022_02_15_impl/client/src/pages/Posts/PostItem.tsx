import { FC, PropsWithChildren } from "react";
import styled from "styled-components";
import { Post } from "../../model/app";
import { GlassCard } from "../_layout/GlassCard";

type PostItemComponentProps = {
  className?: string;
  post: Post;
};

const PostItemComponent: FC<PostItemComponentProps> = (props) => (
  <GlassCard className={props.className}>
    <div className="photo">
      <img
        className="post-photo"
        alt="user post photo"
        src={props.post.photoUrl}
        width="400"
        height="400"
      />
      <div className="post-title">{props.post.title}</div>
    </div>
    <div className="post-comment">{props.post.comment.slice(0, 30)}</div>
  </GlassCard>
);

const StyledPostItemComponent = styled(PostItemComponent)`
  .photo {
    position: relative;
    width: 100%;
    margin-bottom: 12px;

    .post-photo {
      display: block;
      width: 100%;
      height: auto;
    }

    .post-title {
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.6);
      padding: 8px;
      width: 100%;
    }
  }

  .post-comment {
  }
`;

export type PostItemProps = PropsWithChildren<{
  className?: string;
  post: Post;
}>;

export const PostItem: FC<PostItemProps> = (props) => {
  return <StyledPostItemComponent {...props} />;
};
