import { Context } from "telegraf";
import { getMeaning } from "../services/dictionary";
import { Message } from "telegraf/typings/core/types/typegram";
import { escapeMarkdownV2 } from "../utils/markdown";

export const handleText = async (
  ctx: Context & { message: Message.TextMessage }
) => {
  const { text } = ctx?.message as Message.TextMessage;

  if (!text || text.trim().length === 0) {
    await ctx.reply("Please send a valid word to search!");
    return;
  }

  if (text.trim().length > 100) {
    await ctx.reply("Please send a shorter word (max 100 characters).");
    return;
  }

  try {
    const {
      word = text.trim(),
      meaning = [],
      source = "https://www.vanmaram.com/",
    } = await getMeaning(escapeMarkdownV2(text.trim()));

    const meaningText = meaning
      .map((item, index) => `${index + 1}\\. ${item}`)
      .join("\n");

    await ctx.reply(`📚 *${word}*\n\n${meaningText}`, {
      parse_mode: "MarkdownV2",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🌐 വൻമരം സന്ദർശിക്കുക",
              url: source,
            },
          ],
        ],
      },
    });
  } catch (error) {
    await ctx.reply(
      `❌ ക്ഷമിക്കണം നിങ്ങള്‍ 🔍 അന്വേഷിക്കുന്ന *${escapeMarkdownV2(
        text
      )}* പദത്തിന്റെ അര്‍ഥം കണ്ടെത്താനായില്ല\\. ⚡ എത്രയും പെട്ടന്ന് നിഘണ്ടുവിൽ ചേർക്കുന്നതാണ്`,
      {
        parse_mode: "MarkdownV2",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🌐 വൻമരം സന്ദർശിക്കുക",
                url: "https://www.vanmaram.com/",
              },
            ],
          ],
        },
      }
    );
    return;
  }
};
