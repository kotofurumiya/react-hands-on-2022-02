export type Post = {
  id?: string;
  title: string;
  comment: string;
  photoUrl?: string;
};

export type User = {
  id: string;
  name: string;
  avatarUrl?: string;
};
