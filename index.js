const TelegramBot = require("node-telegram-bot-api");
const fetch = require("node-fetch");
require("dotenv").config();

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });
let temp = 0;
const callTemp = () => {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=28.70&lon=77.10&appid=bd324bff35df95a5a59867bcfdc633b4"
  )
    .then((res) => res.json())
    .then((data) => (temp = data.main.temp));
};

callTemp();

bot.on("message", (message) => {
  bot.sendMessage(
    message.from.id,
    "Hi My Name is Kelvin and I will let you know the temp of Delhi in every hour."
  );

  setTimeout(() => {
    bot.sendMessage(
      message.from.id,
      `Right now the temp is ${Math.round(temp - 273.15)}*C`
    );
  }, 2000);

  const tempInterval = setInterval(() => {
    bot.sendMessage(
      message.from.id,
      `Temperature in Delhi is ${Math.round(temp - 273.15)}*C`
    );
  }, 1 * 60 * 60 * 1000);
});
