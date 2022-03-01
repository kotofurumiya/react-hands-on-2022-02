import useSWR from "swr";
import { config } from "../config";
import { jsonFetcher } from "../lib/swr";

export const usePing = () => {
  const { data, error } = useSWR<{message: string}>(`${config.apiHost}/ping`, jsonFetcher);

  return data ? 'Received: ' + data.message : 'Empty';
};