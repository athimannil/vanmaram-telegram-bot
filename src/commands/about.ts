import { Context } from "telegraf";
import { escapeMarkdownV2 } from "../utils/markdown";

export const aboutCommand = (ctx: Context) => {
  const aboutMessage = `
🤖 *About Vanmaram Dictionary Bot*

📚 *What is Vanmaram?*
Vanmaram is a comprehensive online Malayalam\\-English dictionary that helps bridge language gaps\\.

🎯 *Our Mission:*
To make Malayalam language learning and translation accessible to everyone worldwide\\.

⚡ *Bot Features:*
• Instant word translations
• Bidirectional support \\(Malayalam ↔ English\\)
• Smart language detection
• Multiple meanings per word
• Direct website integration

👨‍💻 *Developer:*
Built with ❤️ using TypeScript and Telegraf\\.js

🌐 *Links:*
• Website: [vanmaram\\.com](https://www.vanmaram.com/)
• Bot: [@vanmarambot](https://t.me/vanmarambot)

📈 *Version:* 1\\.0\\.0
🔄 *Last Updated:* ${escapeMarkdownV2(new Date().toLocaleDateString())}
  `;

  ctx.reply(aboutMessage, {
    parse_mode: "MarkdownV2",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🌐 Visit Vanmaram",
            url: "https://www.vanmaram.com/",
          },
          {
            text: "📖 Help",
            callback_data: "help",
          },
        ],
        [
          {
            text: "🔍 Start Searching",
            callback_data: "start_search",
          },
        ],
      ],
    },
  });
};