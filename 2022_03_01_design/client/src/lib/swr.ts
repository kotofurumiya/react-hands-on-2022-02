export const jsonFetcher = (...args: Parameters<typeof fetch>) =>
  fetch(args[0], {
    ...args[1],
    mode: "cors",
  }).then((res) => res.json());
