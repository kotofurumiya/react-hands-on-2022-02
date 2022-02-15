import { FC, FormEventHandler, PropsWithChildren, useState } from "react";
import styled from "styled-components";
import { Post as PostData } from "../../model/app";
import { useSession } from "../../state/auth";
import { usePosts, useSubmitPost } from "../../state/post";
import { GlassCard } from "../_layout/GlassCard";
import { Page } from "../_layout/Page";
import { PostItem } from "./PostItem";
import { useForm, UseFormRegister } from "react-hook-form";

type PostComponentProps = PropsWithChildren<{
  className?: string;
  postList: PostData[];
  photoSeed: string;
  formHandler: {
    register: UseFormRegister<{
      title: string;
      comment: string;
    }>;
  };
  onSubmit: FormEventHandler;
}>;

const PostComponent: FC<PostComponentProps> = (props) => (
  <Page>
    <div className={props.className}>
      <div className="post-form">
        <GlassCard>
          <h2>New Post</h2>
          <form className="new-post-form" onSubmit={props.onSubmit}>
            <div>
              <img
                className="post-form-photo"
                alt="photo"
                src={`https://picsum.photos/seed/${props.photoSeed}/400`}
                width="400"
                height="400"
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Title"
                {...props.formHandler.register("title")}
              />
              <input
                placeholder="Comment"
                {...props.formHandler.register("comment")}
              />
              <button type="submit">追加</button>
            </div>
          </form>
        </GlassCard>
      </div>

      <div className="gallery">
        {props.postList.map((p) => (
          <div key={p.id} className="post-item">
            <PostItem post={p} />
          </div>
        ))}
      </div>
    </div>
  </Page>
);

const StyledPostComponent = styled(PostComponent)`
  .post-form {
    margin-bottom: 12px;

    h2 {
      margin-bottom: 8px;
    }
  }

  .new-post-form {
    display: flex;
    align-items: flex-start;
    gap: 8px;

    .post-form-photo {
      width: 120px;
      height: auto;
    }
  }

  .form-group {
    text-align: right;

    input {
      display: block;
      appearance: none;
      background-color: rgba(255, 255, 255, 0.3);
      border: none;
      padding: 8px;
      margin-bottom: 8px;
    }

    input:focus {
      outline: none;
    }

    button[type="submit"] {
      padding: 4px 8px;
      background-color: rgba(255, 255, 255, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.6);
      border-radius: 4px;
    }
  }

  .gallery {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 24px;

    .post-item {
      min-width: 0;
      width: 200px;
    }
  }
`;

export type PostProps = PropsWithChildren<unknown>;

export const Post: FC<PostProps> = (props) => {
  const user = useSession();
  const submitPost = useSubmitPost(user?.id);
  const postList = usePosts(user?.id);
  const [photoSeed, setPhotoSeed] = useState(
    Math.floor(Math.random() * 100000).toString()
  );
  const formHandler = useForm({
    defaultValues: {
      title: "",
      comment: "",
    },
  });

  const onSubmit = formHandler.handleSubmit((data) => {
    submitPost({
      title: data.title,
      comment: data.comment,
      photoUrl: `https://picsum.photos/seed/${photoSeed}/400`,
    });

    formHandler.reset({
      title: "",
      comment: "",
    });

    setPhotoSeed(Math.floor(Math.random() * 100000).toString());
  });

  return (
    <StyledPostComponent
      {...props}
      postList={postList || []}
      photoSeed={photoSeed}
      formHandler={formHandler}
      onSubmit={onSubmit}
    />
  );
};
