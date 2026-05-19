# mail-template

請求書送付時のメール下書き作成ツール（React + Vite + Bun）。

## 開発

```bash
bun install
bun dev      # http://localhost:5555
bun run build
```

## 主な設定ファイル

- `src/templates/default.ts` — 件名・本文テンプレート
- `src/templates/recipients.ts` — 宛名の選択肢
- `src/lib/defaultDueDate.ts` — 支払期限のデフォルト（翌月10日、土日は月曜へ）
