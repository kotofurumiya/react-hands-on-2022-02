# props

Reactにおいてコンポーネントとは関数である。関数ならば引数を受け取るはずだ。ここでコンポーネントが受け取る引数のことをprops(propertiesの意）という。

## propsを受け取るコンポーネント

propsの動きを確かめるため、`MyApp.tsx` を書き換えてみよう。

```tsx
// FC<P> は FunctionComponent<P> のエイリアス
import { FC } from "react";

// propsとして何を受け取るかを表す型
type RepeatMessageProps = {
  message: string;
  repeat: number;
};

// RepeatMessageProps を受け取る FC と明示的に型付けしている
const RepeatMessage: FC<RepeatMessageProps> = (props) => {
  return <div>{props.message.repeat(props.repeat)}</div>
};

export const MyApp = () => {
  return <RepeatMessage message="Hello" repeat={3} />;
};
```

これを保存すればブラウザには"HelloHelloHello"とだと表示される。もちろん `repeat={2}` を与えれば"HelloHello"になるし、`message="Hi"` を与えれば"HiHiHi"になる。このようにpropsを受け取ることで、いわゆる「再利用可能」なコンポーネントを作れる。

コンポーネントが言語仕様上のただの関数なのだから、propsも言語仕様上のただの引数になる。JavaScriptとしての関数と引数にほかならず、特別な機能や制約はない。

## JSX中の式

JSX中に現れる文字列は、単なるテキストとして扱われる。JavaScript/TypeScriptの式として評価してほしい場合は、`{` と `}` で囲む。

```tsx
const MyComponent = () => {
  const a = 1;
  const b = 2;

  return (
    <div>
      <div>a+bはa+bと表示される</div>
      <div>{a+b}は3と表示される</div>
    </div>
  );
};
```

## HTML要素のprops

`div` や `span` など一般的なHTML要素についてはJSXでも使用でき、なおかつ各々のpropsも定義されている。これらのpropsはHTMLの属性をそのまま書けるようになっているが、一部だけ例外がある。

- すべての要素の `class` 属性は `className` とする
  - `class` はJavaScriptの予約語のため使用できない
- `label` 要素の `for` 属性は `htmlFor` とする
  - `for` はJavaScriptの予約語のため使用できない

## コンポーネントの型

ここで `RepeatMessage` 関数を `FC<RepeatMessageProps>` と明示している。コンポーネントの型の明示にはいくつかやり方がある。

```tsx
// 左辺に型を付ける方法
const RepeatMessage: FC<RepeatMessageProps> = (props) => {};

// 右辺に型をつける方法
const RepeatMessage = (props: RepeatMessageProps) => {};

// 左辺にインラインで型をつける方法（めったに見かけない）
const RepeatMessage: FC<{
  message: string;
  repeat: number;
}> = (props) => {};

// 右辺にインラインで型をつける方法
const RepeatMessage = (props: {
  message: string;
  repeat: number;
}) => {};
```

ほとんど違いはないのでどれを選んでもいいが、プロジェクト内である程度統一しておきたい。