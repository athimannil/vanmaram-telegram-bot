import { Context } from "telegraf";
import { escapeMarkdownV2 } from "../utils/markdown";

export const startCommand = (ctx: Context) => {
  const firstName = ctx.from?.first_name || "Friend";
  const escapedName = escapeMarkdownV2(firstName);

  const welcomeMessage = `
🙏 സ്വാഗതം ${escapedName}\\! Welcome to Vanmaram Dictionary Bot\\!

📚 *What I can do:*
• English to Malayalam translation
• Malayalam to English translation
• Instant word meanings
• Direct links to Vanmaram website

🔍 *How to use:*
Just send me any word in English or Malayalam, and I'll provide its meaning\\!

💡 *Examples:*
• Send: \`love\` → Get Malayalam meaning
• Send: \`സ്നേഹം\` → Get English meaning

Ready to explore words\\? Send me a word to get started\\! 🚀
  `;

  ctx.reply(welcomeMessage, {
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
      ],
    },
  });
};
