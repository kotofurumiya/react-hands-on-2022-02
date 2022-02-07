# プロジェクト作成

プロジェクトの作成は `vite` で行うと楽になる。発音はveet（ヴィート）。

適当なところで以下のコマンドを実行すると `hello-react` ディレクトリが作られ、React + TypeScriptの構成で初期セットアップされる。

```
npm init vite@latest hello-react -- --template react-ts
```

いろいろ作成されるが依存パッケージのインストールはされていない状態なので、自分でコマンドを実行する。

```
cd hello-react
npm install
```

あとは一度動かしてみればいい。以下のコマンドを実行する。

```
npm run dev
```

ローカルサーバのURLが表示される。デフォルトでは `http://localhost:3000/` となる。