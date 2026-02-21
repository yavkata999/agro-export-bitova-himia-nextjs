# Битова Химия ООД - статичен Next.js сайт

## Инсталация
```bash
npm install
```

## Локално стартиране
```bash
npm run dev
```

## Тестове
```bash
npm test
```

## Build и export
```bash
npm run build
npm run export
```

## cPanel deployment
1. Изпълнете `npm run build && npm run export`.
2. Качете съдържанието на `out/` в `public_html/`.
3. Уверете се, че `.htaccess` поддържа статични HTML страници.
4. За контактната форма използвайте cPanel Form-to-Email пренасочване или CGI mail handler.

## Източник на данни
Проектът използва само `data/strapi-data.json` и няма runtime зависимости към CMS/API.
