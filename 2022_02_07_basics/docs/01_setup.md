# セットアップ

Docker環境で利用するか、マシンに直接インストールするかになる。

## Dockerを使用する

`node:16-slim` をpullしてこればよい。

```
docker pull node:16-slim
```

あとはコンテナを立ち上げ、その中で作業する。VSCodeの[Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)を導入するとコンテナとVSCodeを接続して、シームレスに作業ができる。

## マシンにインストール

Node.jsを直接入れるのではなく、バージョン管理ソフト経由で入れほうが良い。

現在何も使用していなければ `nvm` を入れる。すでに直接Node.jsが入っている場合は先にアンインストールしておく。

```
# macOS / Linux / WSL
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

このときに `~/.bashrc` や `~/.zshrc` にローディングスクリプトを追記するか聞かれるが、誤ってNoにした場合は手動で以下を追記する。

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

`nvm` を使用してNode.jsのLTS版を導入する。

```
nvm install --lts
```

LTS版が導入されているか確認する。現在のLTSはv16。

```
node -v
```