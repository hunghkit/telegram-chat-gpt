const { Telegraf } = require("telegraf");;

const TELEGRAM = "ENTER TELEGRAM SECRET KEY";
const OPENAI_API_KEY = "ENTER CHAT GPT KEY";

const { Configuration, OpenAIApi } = require("openai");

const bot = new Telegraf(TELEGRAM);

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

bot.start((ctx) => ctx.reply("Welcome GPT Bot"));

bot.command("answer", async (ctx) => {
  try {
    const command = ctx.update?.message?.text?.replace("/answer ", "")?.trim();

    if (!command || command === "/answer") {
      ctx.reply("Ask me somthing ^-^");
    } else {
      // Check the document at: https://platform.openai.com/docs/
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: command,
        temperature: 0,
        max_tokens: 1000,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });
      ctx.reply(response.data.choices[0]?.text);
    }
  } catch (e) {
    console.log('Error:', e)
    ctx.reply("I dont know your question");
  }
});

bot.launch();