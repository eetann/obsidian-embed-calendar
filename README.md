# Obsidian Embed Calendar

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
- [ ] エラー表示
- [ ] D&Dによる日時変更
- [ ] 新しいノートの作成
- [ ] 
