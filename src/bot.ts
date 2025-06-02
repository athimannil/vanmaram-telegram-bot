import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import { handleText } from "./handlers/textHandler";
import { startCommand, helpCommand } from "./commands";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN || "");

bot.catch((err, ctx) => {
  console.error("❌ Bot error:", err);
  ctx.reply("Sorry, something went wrong. Please try again.");
});

bot.start(startCommand);
bot.help(helpCommand);
bot.on("text", handleText);

// Graceful shutdown
process.once('SIGINT', () => {
  console.log('🛑 Stopping bot...');
  bot.stop('SIGINT');
});

process.once('SIGTERM', () => {
  console.log('🛑 Stopping bot...');
  bot.stop('SIGTERM');
});

bot
  .launch()
  .then(() => {
    console.log("✅ Vanmaram bot is running...");
    console.log("📱 Bot username: @vanmarambot");
    console.log("🔗 API URL:", process.env.API_URL);
  })
  .catch((error) => {
    console.error("❌ Error launching the bot:", error);
    process.exit(1);
  });
