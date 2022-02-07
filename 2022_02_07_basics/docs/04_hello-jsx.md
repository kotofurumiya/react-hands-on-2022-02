# コンポーネント

## コンポーネントとJSX

Reactにおいてコンポーネントとは、ReactNodeを `return` する関数である。ReactNodeは一般的にJSXで記述する。

```tsx
export const MyComponent = () => {
  return <div>Hello!</div>;
};
```

この `<div>` の部分がJSXとなる。JSXは正しいJavaScriptではない。開発者がツリー構造を記述しやすいように、HTMLを模した記法を導入しただけだ。

JSXは実際は以下のような関数に変換される。

```tsx
export const MyComponent = () => {
  return jsx('div', { children: 'Hello!' });
};
```

この `jsx` 関数はツリー構造オブジェクト、つまりReactNodeを返す。ネストされたJSONをイメージしてもらえばいい。

```json
{
  "type": "div",
  "props": {
    "children": "Hello!"
  }
}
```

ReactはこのReactNodeをReactのレンダラに渡し、レンダラはオブジェクトの中身を実際のDOMに転写していく。`type` が `div` なので `div` タグだろう。`children` が `"Hello!"` なので中身はテキストで、内容は `Hello!` だろう。といった具合にだ。

この回りくどい二段構えにはいくつか理由があるが、普通に使うだけならメリットを受けることはない。

## Hot Module Replacement(HMR)

HMRは開発中にローカルファイルを編集したとき、すぐさまブラウザに反映される機能だ。画面全体を描画しなおすのではなく、変更されたモジュールのみを入れ替える。

viteではデフォルトで有効になっている。`npm run dev` を実行したままファイルを編集しても反映されるということになる。

## コンポーネントの作成

自分でコンポーネントを作ってみよう。既存ファイルを編集してもいいが、ここでは新規ファイルを作ることにする。

`App.tsx` などがある `src` ディレクトリに新しいファイルを作ろう。ここでは `MyApp.tsx` とする。ここにコンポーネントを書く。

```tsx
export const MyApp = () => {
  return <div>Hello My First App</div>;
};
```

"Hello My First App"とだけ表示する、簡単なコンポーネントとなる。

JavaScript/TypeScriptにおいて、値や関数、クラスなどはファイルプライベートである。他のファイルから使用する場合は明示的に `export` する必要がある。

コンポーネントは先述の通り、単なる関数である。名前は言葉の先頭だけを大文字にする、いわゆるアッパーキャメルケース（パスカルケース）になる。先頭が小文字だとReactがHTMLタグと誤認識する可能性がある。ファイル名と関数名が一致している必要性はないが、一致していたほうが混乱はないだろう。

ファイル内に何を書くか/何を書いてはいけないかについて、特に決まりがあるわけではないので自由にしていい。言語標準でサポートされている一般的な関数でしかないので、そういった制約は必要ない。

次にこれを表示したい。もともと `App` があった場所を置き換えれば楽だろう。これは`main.tsx` にある。

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
```

2箇所変更する。

- `MyApp` を `import` する
- `<App />` を `<MyApp />` に置き換える

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { MyApp } from './MyApp'

ReactDOM.render(
  <React.StrictMode>
    <MyApp />
  </React.StrictMode>,
  document.getElementById('root')
)
```

書き換えて保存すれば、HMRによってすぐにブラウザに反映されるはずだ。もし反映されない場合はリロードしたり、一度 `Ctrl + C` で止めてもう一度 `npm run dev` するといい。

これで"Hello My First App"とだけ表示される画面が現れたはずだ。