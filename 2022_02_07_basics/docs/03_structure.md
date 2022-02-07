# プロジェクト構造

viteで作成したディレクトリは以下のような構造になる。

```bash
hello-react
├ src
│ ├ main.tsx        # スクリプト側エントリポイント
│ ├ App.tsx         # コンポーネントファイル
│ └ vite-env.d.ts
├ index.html        # エントリポイント
├ package.json      # プロジェクト設定ファイル
├ package-lock.json # 依存パッケージバージョン情報
├ tsconfig.json     # TypeScript設定ファイル
└ vite.config.ts    # vite設定ファイル
```

## index.html

エントリポイント。

viteはビルド時に[rollup](https://github.com/rollup/rollup)を使用している。rollupはHTMLファイルをエントリポイントにすることが可能なので、viteもそれにならっている。

HTMLファイルをエントリポイントにすると言っても実際は `<script>` タグで指定されたスクリプトをビルドしている。

## main.tsx

スクリプトのエントリポイント。メインコンポーネントである `App` をDOMの `<div id="root"></div>` にレンダリングしている。

拡張子の `.tsx` はJSXが有効になったTypeScriptファイルになる。JSXが使える以外の差異は基本的に無いが、ジェネリクスの `<T>` がJSXのタグと誤認識され使いにくくなるので、普通のユーティリティ関数を書くファイルは `.ts` のほうが良い。

## App.tsx

`App` コンポーネントを定義しているファイル。Reactのコンポーネントファイルは大文字で始めることが多い。

まずは `App` という名前のコンポーネントを作って、その中にページコンポーネントやルーターを記述していくという流れが一般的になる。

## package.json / package-lock.json

`package.json` にはこのパッケージ（プロジェクト）の設定が書かれている。どんなパッケージに依存しているのか、どんなサブコマンドを定義しているのかなど。

`scripts` を見れば `npm run` で実行できるサブコマンドがわかる。`npm run dev` もここで定義されている。

```
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
```

`vite` コマンド自体はインストールしていないが、問題なく実行できる。`npm run` を実行するときは自動的にPATHに `./node_modules/.bin` が追加されるためだ。この中に実行ファイルが入っている。

`package-lock.json` には依存パッケージのバージョン情報が記載されている。依存パッケージについては `package.json` に書いてあるが、あちらはセマンティックバージョニングに基づいた、ある程度の曖昧さを持つバージョン指定だ。一方で `package-lock.json` に書かれているのはインストール時の完全なバージョンだ。

## tsconfig.json

TypeScriptの設定ファイル。デフォルトの設定で十分なことが多いので、あまり変更する機会はない。

## vite.config.ts

viteの設定ファイル。ビルド設定などの細かい設定をしたいときに変更する。