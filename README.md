# Vanmaram Telegram Bot 📘🤖

A Telegram bot built with [Telegraf.js](https://telegraf.js.org) to provide fast Malayalam-English and English-Malayalam dictionary lookup using the [Vanmaram](https://vanmaram.com) API.

## 🔗 Live Bot

👉 [@vanmarambot](https://t.me/vanmarambot)

## 🚀 Features

- 🔎 Search English and Malayalam words instantly
- 🌐 Language auto-detection
- 📘 Returns multiple meanings and relevant translations
- 🔗 Link to full details on Vanmaram website
- 💬 Fast, clean responses
- ⚡ Real-time error handling

## 📦 Tech Stack

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Telegraf.js](https://telegraf.js.org)
- [Axios](https://axios-http.com/)
- [Vanmaram API](https://vanmaram.com)

## 🛠 Installation

```bash
# Clone the repository
git clone https://github.com/athimannil/vanmaram-telegram-bot.git
cd vanmaram-telegram-bot

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your bot token
# BOT_TOKEN=your_telegram_bot_token_from_botfather
```

## 🚀 Usage

```bash
# Development (with hot reload)
npm start

# Build for production
npm run build

# Run production build
npm run serve
```

## 📁 Project Structure

```
src/
├── bot.ts              # Main bot entry point
├── commands/           # Bot commands (/start, /help)
├── handlers/           # Message handlers
├── services/           # External API services
└── utils/              # Utility functions
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

ISC License
