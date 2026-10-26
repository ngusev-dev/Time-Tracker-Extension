# Развёртывание

Проект состоит из двух частей:

- **api** — NestJS + GraphQL, запускается на сервере в Docker. Миграции БД применяются автоматически при старте контейнера.
- **client** — браузерное расширение. Собирается локально и загружается в браузер вручную.

---

## 1. API на сервере

### Настроить переменные окружения

Все переменные задаются в `docker-compose.yml` в секции `environment`:

| Переменная       | Описание                                                                        |
| ---------------- | ------------------------------------------------------------------------------- |
| `DATABASE_URL`   | Строка подключения к PostgreSQL                                                 |
| `MAIL_HOST`      | SMTP-сервер (`smtp.resend.com`)                                                 |
| `MAIL_PORT`      | Порт SMTP (`465`)                                                               |
| `MAIL_USER`      | Пользователь SMTP (`resend`)                                                    |
| `MAIL_PASSWORD`  | API-ключ Resend — без него не будут отправляться письма восстановления пароля   |
| `SESSION_SECRET` | Ключ подписи сессионных cookie — длинная случайная строка                       |
| `COOKIE_SECURE`  | `"true"`, если API доступен по HTTPS; `"false"` — только для локального запуска |

## 2. Расширение (client)

Расширение собирается локально и загружается в браузер вручную.

### 2.1. Указать адрес API

В `client/.env.production` укажите адрес API на сервере (без `/graphql` и без `/` в конце):

```
VITE_API_URL=https://api.example.com
```

Из этого адреса берутся и URL для запросов, и `host_permissions` в манифесте — без них браузер не пустит расширение к API.

### 2.2. Собрать

```sh
cd client
npm i
npm run build:chrome    # Chrome / Edge / Яндекс Браузер → client/dist
npm run build:firefox   # Firefox → client/dist-firefox
```

Сборки отличаются манифестом: для Firefox фон подключается через `background.scripts` вместо `service_worker` и добавляется `browser_specific_settings.gecko`.

### 2.3. Загрузить в браузер

**Chrome / Edge / Яндекс Браузер:**

1. Открыть `chrome://extensions` (в Edge — `edge://extensions`).
2. Включить **Режим разработчика**.
3. Нажать **Загрузить распакованное расширение** и выбрать папку `client/dist`.

**Firefox (121+):**

1. Открыть `about:debugging#/runtime/this-firefox`.
2. Нажать **Загрузить временное дополнение…** и выбрать `client/dist-firefox/manifest.json`.
3. Открыть `about:addons` → Time Tracker → вкладка **Разрешения** и включить доступ к хосту API.

> В Firefox разрешения на хосты (`host_permissions`) не выдаются при установке. Пока доступ к API не включён вручную, запросы блокируются CORS: API отвечает `Access-Control-Allow-Origin: *`, а браузер не принимает его вместе с cookie.

> Временное дополнение удаляется при перезапуске Firefox. Чтобы установить расширение постоянно, его нужно подписать на [addons.mozilla.org](https://addons.mozilla.org/developers/) (можно как unlisted). Перед подписью замените `gecko.id` в `client/manifest.config.ts` на свой и проверьте сборку: `npx web-ext lint --source-dir dist-firefox`.

### 2.4. Обновление расширения

**Chrome:**

1. Пересобрать: `npm run build:chrome`.
2. На странице `chrome://extensions` нажать кнопку обновления ↻ на карточке расширения.

**Firefox:**

1. Пересобрать: `npm run build:firefox`.
2. На странице `about:debugging` нажать **Перезагрузить** на карточке расширения.

---

## 3. Локальная разработка

API для разработки берётся из `client/.env.development`.

**Chrome** — с HMR:

```sh
npm run dev
```

Загрузить `client/dist` как распакованное расширение (см. 2.3). Dev-сервер должен быть запущен, пока расширение открыто.

**Firefox** — без HMR. `npm run dev` в Firefox не работает: страницы расширения в dev-режиме crxjs отдаёт через service worker, а у расширений Firefox его нет. Вместо этого используется пересборка с автоперезагрузкой, в двух терминалах:

```sh
npm run dev:firefox   # пересобирает dist-firefox при изменениях
npm run run:firefox   # запускает Firefox с расширением и перезагружает его после пересборки
```

`run:firefox` открывает отдельный чистый профиль Firefox, поэтому доступ к хосту API в нём нужно включить один раз (см. 2.3, шаг 3).
