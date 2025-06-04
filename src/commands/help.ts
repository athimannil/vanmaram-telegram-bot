import { Context } from "telegraf";
import { escapeMarkdownV2 } from "../utils/markdown";

export const helpCommand = (ctx: Context) => {
  const firstName = ctx.from?.first_name || "Friend";
  const escapedName = escapeMarkdownV2(firstName);

  const helpMessage = `
📖 *Hello ${escapedName}\\! Here's how to use Vanmaram Dictionary Bot:*

🔍 *Regular Search:*
• Send any English word → Get Malayalam meaning
• Send any Malayalam word → Get English meaning
• The bot automatically detects the language

⚡ *Inline Search:*
• Type \`@vanmarambot love\` in any chat
• Get instant results without opening the bot
• Share meanings directly with friends

💡 *Examples:*
• \`book\` → പുസ്തകം
• \`വീട്\` → house, home
• \`@vanmarambot happiness\` → Inline search

🌟 *Features:*
• Instant translations
• Multiple meanings for each word
• Direct links to detailed explanations
• Support for both English and Malayalam
• Works in any Telegram chat \\(inline mode\\)

❓ *Having issues?*
Make sure to send single words for best results\\!

Happy learning\\! 📚✨
  `;

  ctx.reply(helpMessage, {
    parse_mode: "MarkdownV2",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🌐 Visit Vanmaram",
            url: "https://www.vanmaram.com/",
          },
        ],
        [
          {
            text: "🔍 Try Inline Search",
            switch_inline_query: "love",
          },
        ],
      ],
    },
  });
};
