# formatterとlinter

## formatter

コードスタイルを整形するツール。

JavaScript/TypeScriptでは主に[prettier](https://prettier.io/)が使用される。

プロジェクトにインストールするには以下のコマンドでできる。

```
npm install -D prettier
```

`-w` オプションを与えながら実行するとフォーマットして上書きしてくれる。

```
npx prettier -w path/to/file.ts
```

`.prettierrc` ファイルを置くことで設定を変更できる。
拡張子は `json` や `yaml`、`toml` などに対応している。

https://prettier.io/docs/en/options.html

## linter

コードを静的解析するツール。フロントエンドでは[eslint](https://eslint.org/)が有名。

```
npm install -D eslint
npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install -D eslint-plugin-react
```

実行コマンドは

```
npx eslint .
```

設定は `.eslintrc` で行える。拡張子は `json` や `yaml`、`js` など。

## lint-staged

formatterやlinterを `git commit` 時に強制的に実行することで、チーム内での秩序を維持しやすくなる。
しかし毎回すべてのファイルに対してかけていると処理時間が長くなる。

`lint-staged` はコミット対象ファイルのみに対してコマンドを実行する。

https://github.com/okonet/lint-staged

```
npx -y mrm@2 lint-staged
```

今回のような半端なmonorepoのような構成だとセットアップがうまくいかない。
`package.json` の場所とgitのルートが異なるためhuskyがうまくgit hookを作れない。

上記コマンド実行時にhuskyのエラーが出るので、エラー後に少し修正を加える。
`package.json` の `script` に `prepare` が追加されている。

```json
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "format": "prettier -w \"src/**/*.{ts,tsx}\"",
    "lint": "eslint .",
    "prepare": "husky install"
  },
```

`prepare` の部分を書き換える

```json
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "format": "prettier -w \"src/**/*.{ts,tsx}\"",
    "lint": "eslint .",
    "prepare": "cd .. && husky install 2022_03_06_test/.husky"
  },
```

次にpre-commitフックを手動で作る。

```bash
npx husky add .husky/pre-commit "cd 2022_03_06_test && npx lint-staged"
```

これでもう一度 `npm install` を実行すればセットアップされるはずだ。

あとは同じく `package.json` 内に `lint-staged` という項目が増えている。

```json
  "lint-staged": {
    "*.js": "eslint --cache --fix",
    "*.{ts,tsx}": "prettier --write"
  }
```

keyが対象ファイルでvalueがコマンドになっている。この場合だとjsファイルがコミットされればeslintをかけ、tsファイルかtsxファイルがコミットされるとそれらにprettierをかけるようになっている。

これを今回のプロジェクト用に書き換える。

```json
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint",
      "prettier --write"
    ]
  }
```

これでts/tsxファイルにeslint -> prettierの順で処理される。