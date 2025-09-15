# Как деплоить

## Подготовка (один раз)

### Логинимся в docker registry

```bash
docker login registry.ljournalist.ru -u registry
```
вводим пароль, Enter

### Создаем docker context
Важно: у вас должна быть своя учетка на сервере, проще всего если у вас будет вход по ssh-ключу.

Допустим у вас учетка `username`.

В файле ~/.ssh/config у вас должна быть запись с хостом сервера, например:
```
Host loco
    HostName 46.149.68.112
    Port 22
    User username
    IdentityFile "/path/to/your/ssh/key"
    IdentitiesOnly Yes
```
Создаем docker context:
```bash
docker context create loco --docker "host=ssh://loco"
```
проверим работу.
Подгрузим ключ в память:
```bash
ssh-add /path/to/your/ssh/key
```
Посмотрим удаленные контейнеры
```bash
docker --context=loco ps
```
Если вывел удаленные контейнеры, то все хорошо.

## Сборка и деплой
Если у вас в текущей сессии ключ уже подгружен, можно продолжать, иначе:

```bash
ssh-add /path/to/your/ssh/key
```
Убедитесь, что у вас есть файл `.env` в папке с проектом, если таковой используете в проекте.

Для удобства сделал скрипт `deploy.sh`, в котором используется контекст с именем `loco`, если у вас другой, измените скрипт.

Запускаем:
```bash
./deploy.sh
```