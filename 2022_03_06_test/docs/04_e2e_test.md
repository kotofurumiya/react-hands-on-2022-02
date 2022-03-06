# E2Eテスト

enzymeとかpuppeteerとかいろいろあるが、playwrightが簡単。

## playwright

インストール

```
npm init playwright
```

実行

```
npx playwright test
```

設定は `playwright.config.ts` で変更できる。

## data-test-id

テスト用にHTMLに `data-test-id` を仕込むことが多いが、本番ビルドでは削除したい。

これを処理してくれるbabel用のプラグインがある。

```
npm i -D babel-plugin-jsx-remove-data-test-id
```

viteの設定でこのプラグインを有効化する。

```ts
export default defineConfig({
  plugins: [react({
    babel: {
      "plugins": ["babel-plugin-jsx-remove-data-test-id"]
    }
  })]
})
```