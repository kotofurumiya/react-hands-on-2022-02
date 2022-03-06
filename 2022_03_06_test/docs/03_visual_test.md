# ビジュアルテスト

視覚的なテスト。スタイルへの影響や画面上に存在するか否かなどを確認できる。

主にビジュアルリグレッションテストのことを指す。
ビジュアルリグレッションテストでは前回実行時のスクリーンショットを正とし、そこに対するdiffでpass/failを判定する。

## storybook

ビジュアルリグレッションテストでは主にコンポーネント単位でテストする。
もちろん画面単位で行っても良い。

コンポーネントカタログを作るstorybookを導入する。

```
npx -y sb init
```

## chromatic

ビジュアルリグレッションテストを支えるソフトウェアとしてはreg-suitなど様々あるが、
storybookを使用するならchrometicというサービスが最も楽である。

https://www.chromatic.com/

登録したら適当にプロジェクトを作成する。今回は新規作成するが、実際の開発では既存のGitHubリポジトリを選ぶ。

プロジェクトを作成すると画面上に以下のようなコマンドが表示されるので、これを実行する。

```
npx chromatic --project-token=XXXXX
```

これでstorybookのアップロードが行われる。

次に `Counter.tsx` に適当な変更を加える。テキストを追加する、枠線の色を変えるなど。

本来はコミット間のdiffを出すものだが、今回はコミットが変わっていなくてスキップされてしまうので `--force-rebuild` をつける。

```
npx chromatic --project-token=XXXXX --force-rebuild
```

chromatic上で確認してみると、diffやapproveの確認が出るはずだ。