# 暑さ指数表示機能の追加計画

## Summary

- 探鳥地ごとに API 用 ID（例: `3/14/14341`）を保存できるようにし、一覧ページ上部の日付選択で選んだ日の暑さ指数を各カードに表示する。
- 当該 API は CORS 全オリジン許可が実装される前提で、ブラウザから直接 `https://7mm01bt4ii.execute-api.ap-northeast-1.amazonaws.com/{heatIndexId}` を fetch する。
- API 用 ID が未設定、取得失敗、選択日のデータなしの場合はカード上で控えめに状態表示する。

## Key Changes

- Prisma `Spot` に nullable な `heatIndexId String?` を追加し、migration と Prisma client 生成を行う。
- `Spot` 型、`getBirdwatchingSpots`、`upsertSpot`、`updateSpot`、追加フォーム schema に `heatIndexId` を通す。
- 追加フォームに「暑さ指数 API ID」入力欄を追加し、`3/14/14341` 形式を任意入力として保持する。
- `SpotList` に日付選択（初期値は JST の今日）を追加し、選択日を `SpotCard` に渡す。
- `SpotCard` に暑さ指数表示コンポーネントを追加し、`heatIndexId` がある場合だけ外部 API を直接取得する。
- レベル表示は以下の固定マッピングにする:
  - `danger`: 危険 / Danger
  - `severe_alert`: 厳重警戒 / Severe alert
  - `alert`: 警戒 / Alert
  - `caution`: 注意 / Caution
  - `safe`: ほぼ安全 / Safe
  - 未知の値は raw value を表示
- `messages/ja.json` と `messages/en.json` に日付選択、未設定、読み込み中、取得失敗、データなし、各レベル名を追加する。

## Test Plan

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- 手動確認:
  - `heatIndexId = 3/14/14341` のスポットで、`2026-07-10` を選ぶと `severe_alert` 相当の表示になる。
  - 日付を `2026-07-13` に変えると `caution` 相当の表示になる。
  - `heatIndexId` 未設定スポットは「暑さ指数未設定」表示になる。
  - API エラーまたは選択日のキーなしではカード全体を壊さず状態表示になる。

## Assumptions

- API 用 ID は自動推測せず、DB に手入力で保存する。
- 既存スポットは migration 後 `heatIndexId = null` のままにし、必要に応じて追加フォームの upsert で補完する。
- 一覧の並び替え条件には暑さ指数を追加しない。
- 表示するのは選択日の暑さ指数のみで、8日分の予報一覧はカードに出さない。
- CORS 全オリジン許可が API 側で有効になるため、Next.js の API route handler によるプロキシは作らない。
