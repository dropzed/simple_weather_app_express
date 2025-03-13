# Используем официальный образ Bun
FROM oven/bun:latest

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и lock-файл (если есть)
COPY package*.json ./

# Устанавливаем зависимости через Bun
RUN bun install

# Копируем остальные файлы проекта
COPY . .

# Экспонируем порт (например, 3000 для Express)
EXPOSE 3000

# Запускаем приложение
CMD ["bun", "run", "dev"]