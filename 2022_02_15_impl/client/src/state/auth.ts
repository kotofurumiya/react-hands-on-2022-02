import useSWR from "swr";
import { config } from "../config";
import { jsonFetcher } from "../lib/swr";
import { User } from "../model/app";

export const useSession = () => {
  const { data, error } = useSWR<User>(`${config.apiHost}/auth`, jsonFetcher);

  return data;
};
