import { useCallback } from "react";
import useSWR, { useSWRConfig } from "swr";
import { config } from "../config";
import { jsonFetcher } from "../lib/swr";
import { Post } from "../model/app";

const sendPost = async (userId: string, post: Post) => {
  return fetch(`${config.apiHost}/post`, {
    method: "POST",
    body: JSON.stringify({
      userId,
      post,
    }),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};

export const usePosts = (userId?: string) => {
  const { data, error } = useSWR<{ posts: Post[] }>(
    `${config.apiHost}/user/${userId}/post/list`,
    jsonFetcher
  );

  if (error) {
    console.error(error);
  }

  return data?.posts;
};

export const useSubmitPost = (selfUserId?: string) => {
  const { mutate } = useSWRConfig();

  const submitPost = useCallback(
    (post: Post) => {
      if (selfUserId) {
        sendPost(selfUserId, post).then(() => {
          mutate(`${config.apiHost}/user/${selfUserId}/post/list`);
        });
      }
    },
    [selfUserId, mutate]
  );

  return submitPost;
};
