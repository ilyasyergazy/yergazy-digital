# Заявки в Google-таблицу

1. Создайте Google-таблицу «заявки yergazy.digital».
2. В первой строке напишите заголовки:
   `время | форма | имя | телефон | нужно | откуда | страница | utm_source | utm_medium | utm_campaign | utm_content | utm_term`
3. Меню **Расширения → Apps Script**, удалите всё и вставьте код ниже.
4. **Начать развертывание → Новое развертывание → Тип: веб-приложение**.
   - Выполнять как: **я**
   - Доступ: **все**
5. Скопируйте адрес веб-приложения и вставьте его в Vercel → Settings → Environment Variables → `SHEETS_WEBHOOK_URL`.

```js
function doPost(e) {
  var d = JSON.parse(e.postData.contents);
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  sh.appendRow([
    d.time, d.form, d.name, d.phone, d.needs, d.source, d.page,
    d.utm_source || '', d.utm_medium || '', d.utm_campaign || '', d.utm_content || '', d.utm_term || ''
  ]);
  return ContentService.createTextOutput('ok');
}
```
