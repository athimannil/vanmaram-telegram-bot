import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import { handleText } from "./handlers/textHandler";
import { handleInlineQuery } from "./handlers/inlineHandler";
import { startCommand, helpCommand, aboutCommand } from "./commands";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN || "");

bot.catch((err, ctx) => {
  console.error("❌ Bot error:", err);
  ctx.reply("Sorry, something went wrong. Please try again.");
});

// Register all commands
bot.start(startCommand);
bot.help(helpCommand);
bot.command("about", aboutCommand);

// Handle callback queries for inline buttons
bot.action("help", helpCommand);
bot.action("start", startCommand);
bot.action("about", aboutCommand);

// Handle inline queries
bot.on("inline_query", handleInlineQuery);

// Handle text messages
bot.on("text", handleText);

// Graceful shutdown
process.once("SIGINT", () => {
  console.log("🛑 Stopping bot...");
  bot.stop("SIGINT");
});

process.once("SIGTERM", () => {
  console.log("🛑 Stopping bot...");
  bot.stop("SIGTERM");
});

bot
  .launch()
  .then(() => {
    console.log("✅ Vanmaram bot is running...");
    console.log("📱 Bot username: @vanmarambot");
    console.log("🔗 API URL:", process.env.API_URL);
    console.log("🔍 Inline search: ENABLED");
  })
  .catch((error) => {
    console.error("❌ Error launching the bot:", error);
    process.exit(1);
  });
