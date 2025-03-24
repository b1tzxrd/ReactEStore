# ReactEStore - Интернет-магазин игр

ReactEStore - это pet-проект интернет-магазина игр, разработанный с использованием современного стека технологий.

## 🚀 Стек технологий
- **Frontend:** React, Chakra UI
- **Состояние:** React Query, React Hook Form
- **Бэкенд:** Firebase Authentication, Firestore
- **Хранение данных:** Firestore (корзина, заказы)

## 🔥 Возможности
- Просмотр каталога игр
- Добавление игр в корзину
- Оформление заказов (всей корзины или отдельных игр)
- Авторизация и регистрация через Firebase Authentication
- Управление профилем пользователя (смена имени, email, пароля, аватара)
- Отображение истории заказов

## 📦 Запуск проекта
1. Склонировать репозиторий:
   ```sh
   git clone https://github.com/b1tzxrd/ReactEStore.git
   cd ReactEStore
   ```
2. Установить зависимости:
   ```sh
   npm install
   ```
3. Создать файл `.env.local` и указать Firebase-конфигурацию:
   ```sh
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```
4. Запустить проект:
   ```sh
   npm run start
   ```

