# ユニットテスト

jestなどが有名だが、今回はuvuというパッケージを使用する

https://github.com/lukeed/uvu

## uvu

uvuは軽量かつ高速に動作する。jestの10倍速ほど。

uvu本体とTypeScript用のローダーをインストールする。

```
npm install -D uvu tsm
```

## testing-library

uvuやjestといったテストランナーだけでReactのテストを記述するのは難しい。そこでTesting Libraryというユーティリティ群も導入する。

```
npm install -D global-jsdom @testing-library/react @testing-library/react-hooks
```