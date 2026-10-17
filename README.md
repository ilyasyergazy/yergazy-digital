# yergazy.digital

Сайт Ильяса Ергазы на Next.js 15. Деплой – Vercel.

## Запуск локально

```bash
npm install
npm run dev
```

## Переменные окружения (Vercel → Settings → Environment Variables)

| переменная | что это |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://yergazy.digital` |
| `TELEGRAM_BOT_TOKEN` | токен бота от @BotFather |
| `TELEGRAM_CHAT_ID` | ваш chat id (от @userinfobot) |
| `SHEETS_WEBHOOK_URL` | адрес Apps Script, см. `docs/google-sheets.md` |
| `NEXT_PUBLIC_YM_ID` | номер счётчика Яндекс Метрики |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXX` из Google Analytics 4 |
| `NEXT_PUBLIC_META_PIXEL_ID` | номер Meta Pixel |

После изменения переменных – Deployments → Redeploy.

## Где что лежит

- `src/site/markup.ts` – вёрстка главной (собрана из утверждённого макета)
- `src/site/runtime.ts` – анимации, формы, ответы на частые вопросы (`ANSWERS`)
- `src/site/overlays.ts` – всплывающие формы и меню
- `src/app/api/lead/route.ts` – отправка заявок в Telegram и Google-таблицу
- `src/app/*/page.tsx` – внутренние страницы («скоро»)
- `public/checklist.pdf` – файл чек-листа (положите сюда PDF)

Цели для аналитики: `lead` (заявка) и `checklist` (чек-лист) – в Метрике создайте JavaScript-события с такими идентификаторами.
