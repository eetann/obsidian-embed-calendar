🚧 WIP!!! 🚧

# Obsidian Embed Calendar
This plugin provides the feature of displaying an embeddable calendar in obsidian.

<!-- TODO: ここに画像 -->

## Features

- ホバー
- 自由に表示できるスペースがある
- metadataのプラグインと連携可能


## Installation


## QuickStart

````
```embed-calendar

```
````


## Usage

## Contributing
WIP

Set your vault path in `.env` as follows.

```sh
VAULT_PATH="<your-vault>"
# VAULT_PATH="/mnt/z/example-vault"
```

(Optional) Copy Example Vault as follows.

```sh
npm run copy-vault
# pnpm run copy-vault
```

Install [pjeby/hot-reload](https://github.com/pjeby/hot-reload).

Execute the following two commands simultaneously.

```sh
npm run dev
# pnpm run dev
```

```sh
npm run watch
# pnpm run watch
```

## Roadmap

- [x] リンクを有効化
- [x] allDayのときのend
- [ ] カレンダーの初期表示の日付 (デフォルトは今日)
	- [x] 今日
	- [x] 固定
	- [ ] プロパティと連動(書き換えあり)
- [x] カレンダーの初期表示のView (デフォルトは月)
- [x] フォントサイズの変更
- [x] スタイルの調整
- [x] 2行
- [x] 言語の変更
- [x] エラー表示
- [x] titleの改行を有効化
- [x] D&Dによる日時移動
- [x] allDayの期間の終わりを正しく表示
- [x] D&Dによる日時範囲の変更
- [x] 新しいノートの作成
- [x] weekやDayで、短い期間でも選択可能にする
	- [x] weekやdayでホバーの範囲を文字列以外でも可能にする
- [x] Dataviewの読み込みができるまでは表示しない
- [x] metadataの表示
	- [x] metadataを複数表示
- [x] metadata menuの対応
- [x] リンクCSSの解除
- [ ] DnDでendが無い場合は二日以上にさせない
- [ ] テストの追加
  - [ ] 参考: https://github.com/ycnmhd/obsidian-lineage
