# Hooks

Reactのコンポーネントは関数でしかない。これには大きなメリットもあるが、デメリットもある。
もっともわかりやすい例で言えば、変数の扱いだ。
コンポーネント関数内で宣言した変数はローカル変数でしかないため、関数を抜ければ消える。

## Hooksで値を保持する

コンポーネントに値を保持したいことはあるが、関数では不可能だ。でも少なくともグローバル変数は避けたい。これに関してReactは上手い回避方法を見つけている。

Reactのコンポーネントは、React本体側でツリー構造で管理されている。値の管理をコンポーネントが直接行うのではなく本体側のツリーに管理させれば、消えずに済むのではないだろうか。

コンポーネントを本体側に繋ぎこむ（hooks into）ことでインメモリのストレージとして活用するというアイデアになる。これを行うのがHooksという機能になる。

## Hooks関数

Hooksは関数として提供される。値の読み込み・書き出しを行うHooksである `useState` を例に見ていこう。

`MyApp.tsx` を以下のように書き換えて実行する。

```tsx
import { useState } from "react";

// クリックした時点の日時を記録して表示する
const ClickRecorder = () => {
  const [date, setDate] = useState<Date>();

  return (
    <div>
      <button onClick={() => setDate(new Date())}>Click Me</button>
      <div>{date ? date.toLocaleTimeString() : 'no data'}</div>
    </div>
  );
};

export const MyApp = () => {
  return <ClickRecorder />;
};
```

「Click Me」ボタンを押すと現在の日時が記録され、時間が表示されるコンポーネントになる。

`useState` は以下のような使い方をする。

```ts
const [value, setterFunction] = useState<T | undefined>(initialValue = undefined)
```

`useState` を呼び出すと、保存した値と、新しい値をセットするための関数が配列として返る。
戻り値が配列なのは一見すると非直感的だが、受け側が変数名を自由につけられるというメリットがある。

ジェネリスク`<T>`で値の型を決める。引数は初期値となる。初期値を省略すると `undefined` になる。初期値を入力した場合、`T`は自動的に推論されるので省略できる。

```ts
const [date, setDate] = useState<Date>();
```

よってこの場合は、`Date`型を保持するが初期値は未指定なので`undefined`。現在地を `date` という名前で受け取り、セット関数を `setDate` の名前で受け取る。

これを利用して、

```tsx
      <button onClick={() => setDate(new Date())}>Click Me</button>
      <div>{date ? date.toLocaleTimeString() : 'no data'}</div>
```

ボタンがクリックされたときに現在日時 `new Date()` をセットする。`date` が `undefined` でなければ時刻を表示する。

こうして関数ながらも値を保持できる仕組みができた。

## 注意

Hooksはコンポーネント内で同じ回数・同じ順番で呼び出されることを前提としている。つまりif文やfor文の中にHooksがあると正常に動作しない。

```tsx
const Component = () => {
  const [user, setUser] = useState<User>();

  if(user) {
    const [content, setContent] = useState<Content>();
    return <div>{content}</div>
  }

  return <div>Empty</div>
};
```

React本体側ではHooksの管理は単にリストでされている。そのため呼び出し順序や回数が変わると、接続先がズレてしまう。