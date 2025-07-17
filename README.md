# Сайт преподавателя английского языка - Самвел Шишманян

## 📁 Структура проекта

```
netlify-teacher-site/
├── index.html                           # Главная страница
├── netlify.toml                         # Конфигурация Netlify
├── netlify/functions/
│   └── send-telegram.js                 # Функция отправки в Telegram
├── Pics/
│   ├── avatar.JPG                       # Фото преподавателя
│   └── icons8-english-96.png           # Иконка сайта
└── Papers/
    ├── TESOL certificate.jpg           # Сертификат TESOL
    ├── TKT.jpg                         # Cambridge TKT
    ├── Foxford.png                     # Курс Фоксфорд
    └── Master's degree.png             # Диплом магистра
```

## 🚀 Деплой на Netlify

### 1. Загрузка изображений
Скопируйте все изображения в соответствующие папки:
- `Pics/` - фото преподавателя и иконки
- `Papers/` - сертификаты и дипломы

### 2. Деплой сайта
1. Перейдите на [netlify.com](https://netlify.com)
2. Подключите GitHub репозиторий или загрузите папку drag&drop
3. Netlify автоматически определит настройки

### 3. Настройка переменных окружения
В панели Netlify → Site settings → Environment variables добавьте:

- `TELEGRAM_BOT_TOKEN` = `7661355079:AAFuwrMyfeJCVeX9Hlu_4ltuu-pCu1mkPQI`
- `TELEGRAM_CHAT_ID` = `7661355079`

### 4. Проверка работы
После деплоя протестируйте форму записи на урок.

## 🛠 Функциональность

- ✅ Адаптивный дизайн
- ✅ Форма записи на урок с отправкой в Telegram
- ✅ Анимации и эффекты
- ✅ Секции: О преподавателе, Методы, Образование, Контакты
- ✅ Резервная отправка через WhatsApp при ошибках

## 📱 Контакты

- **Телефон:** +84 938852334
- **Email:** samaelser@gmail.com
- **Telegram:** @sh_samvel