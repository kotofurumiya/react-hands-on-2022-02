# API Spec

オンメモリでデータを保持するAPIサーバ。

## GET /auth

実際には何も認証などはせず、固定レスポンスが返ってくる。

```ts
type Response = {
  id: '1';
  name: '渋井丸拓男';
  avatarUrl: '/avatar.png';
}
```

## GET /user/:userid/post/list

```ts
type Post = {
  title: string;
  comment: string;
  photoUrl: string;
}

type Response = {
  posts: Post[];
}
```

## POST /post

```ts
type Request = {
  userId: string;
  post: {
    title: string;
    comment: string;
  }
}
```

## POST /reset

`POST /post` で追加したデータをすべて削除する。