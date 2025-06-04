import { Context } from "telegraf";
import { InlineQueryResult } from "telegraf/typings/core/types/typegram";
import { getMeaning } from "../services/dictionary";
import { escapeMarkdownV2 } from "../utils/markdown";

export const handleInlineQuery = async (ctx: Context) => {
  const query = ctx.inlineQuery?.query?.trim();

  if (!query || query.length === 0) {
    return ctx.answerInlineQuery([
      {
        type: "article",
        id: "help",
        title: "📚 Vanmaram Dictionary",
        description: "Type a word to search for its meaning",
        url: "https://www.vanmaram.com/",
        input_message_content: {
          message_text:
            "🔍 Send me any word in English or Malayalam to get started!",
        },
      },
    ]);
  }

  try {
    const {
      word = query,
      meaning = [],
      source = "https://www.vanmaram.com/",
    } = await getMeaning(query);
    const meaningText = meaning
      .map((item, index) => `${index + 1}\\. ${escapeMarkdownV2(item)}`)
      .join("\n");

    const results: InlineQueryResult[] = [
      {
        type: "article",
        id: `meaning_${query}`,
        title: `📚 ${word} meaning`,
        description: meaning.slice().join(", "),
        input_message_content: {
          parse_mode: "MarkdownV2",
          message_text: `📚 *${escapeMarkdownV2(word)}*\n\n${meaningText}\n\n`,
        },
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
      },
    ];

    return ctx.answerInlineQuery(results, {
      cache_time: 300, // Cache for 5 minutes
      is_personal: false,
    });
  } catch (error) {
    return ctx.answerInlineQuery([
      {
        type: "article",
        id: "error",
        title: `❌ "${query}" not found`,
        description: "Word not found in dictionary",
        input_message_content: {
          parse_mode: "MarkdownV2",
          message_text: `❌ ക്ഷമിക്കണം നിങ്ങള്‍ 🔍 അന്വേഷിക്കുന്ന *${escapeMarkdownV2(
            query
          )}* പദത്തിന്റെ അര്‍ഥം കണ്ടെത്താനായില്ല\\, മറ്റൊരു പദം പരീക്ഷിക്കുക\\.`,
        },
      },
    ]);
  }
};
