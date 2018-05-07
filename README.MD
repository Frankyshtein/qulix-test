# Qulix FrontEnd developer trial task

## Задание:

Реализовать поиск и отображение входящих сообщений Gmail используя GmailRESTAPI

[https://developers.google.com/gmail/api/v1/reference/users/messages](https://developers.google.com/gmail/api/v1/reference/users/messages)

## Дополнительное задание (опционально):

- Отображение информации о текущем пользователе (Правый верхний угол в макете)
- Переключение между папками сообщений в левом меню (Draft, Trash, Userlabels)
- Реализовать удаление сообщений
- Добавление и отсылку нового сообщения (&quot;Newitem&quot;)
- Локализацию сайта, в зависимости от текущего местоположения

## Требования:

- Возможно использование сторонних JS библиотек и фреймворков кроме JS препроцессоров
- Запрещено использование готовых клиентов и SDK для GmailAPI (Включая GoogleAPIClientlibraries, кроме модуля авторизации)
- Формат строки поиска аналогичен формату в Gmail search box (Например:&quot;from:someuser@example.comrfc822msgid: is:unread&quot;)

## Поддерживаемые браузеры:

- Microsoft Edge Latest version
- Firefox (Windows) Latest version
- Chrome (Windows, Android, iOS ) Latest version
- Safari (iOS, Mac OS X)

## Требования к верстке (Если не предоставлена в задании):

- Адаптивная верстка для 3-х разрешений (Mobile 320px, Tablet 780px, Desktop 1280px)
- DOCTYPE: HTML5
- Encoding: UTF-8
- Пре-процессор для CSS (LESS или SASS)
- Возможно использование сторонних UI библиотек и фреймворков.

## Авторизация GoogleAPI:

[https://developers.google.com/api-client-library/javascript/features/authentication](https://developers.google.com/api-client-library/javascript/features/authentication)

В задании подключен виджет авторизации от Google с настройками для аккаунта &quot;Qulix.Test&quot;, установлен идентификатор приложения в мета-тегах и добавлен скрипт устанавливающий обработчик события **onAuthorize.**

Для работы в авторизованной зоне Google API необходимо:

- Развернуть проект на локальном веб-сервере, например MSIIS
- Привязать развернутый проект к домену qulix.test
  - Для MSWindows в файле host настроить маппинг 127.0.0.1 qulix.test (Обычно файл host находится в %SystemRoot%\System32\drivers\etc\hosts)
- Использовать полученный **access\_token** в параметрах запроса к GoogleAPI, например:
  - В URL: https://content.googleapis.com/gmail/v1/users/me/messages/20?access\_token=yaGlwWBH0K6aRweeu8kZKbOTEPhWTMG73iXWU-dYEmskOEPFqymIOvtDgkR78UaKAnPZeo3wKIIfYisVN3KDtMr-Qrh4S67zNdkHQD0GZAAuB0PY3Jg82LZmTMJpAZNQ
  - В HTTP заголовке **Authorization** :

Authorization: Bearerya29.GlwWBH0K6aRweeu8kZKbOTEPhWTMG73iXWU-dYEmskOEPFqymIOvtDgkR78UaKAnPZeo3wKIIfYisVN3KDtMr-Qrh4S67zNdkHQD0GZAAuB0PY3Jg82LZmTMJpAZNQ

**Note**** :** Допускается использование GoogleClientID отличных от Qulix.Test, при соответствующей реализации приложения.