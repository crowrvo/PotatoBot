/**
 * Aqui é onde todo o bot é configurado e inicializado,
 * passando seu token, módulos e suas configurações iniciais
 */

import dotenv from "dotenv";
import "reflect-metadata";
dotenv.config();

import { Intents } from "discord.js";
import StartUp from "../Contexts/StartUp";
import BotInstance from "../Core";
import Music from "../Contexts/Music";
const Ints = new Intents()
  .add("GUILDS")
  .add("GUILD_MESSAGES")
  .add("GUILD_MEMBERS")
  .add("GUILD_VOICE_STATES");

const PotatoBot = new BotInstance(Ints);

PotatoBot.AddModule(Music);
PotatoBot.Start(process.env.BOT_TOKEN);

console.log(PotatoBot.Events);
console.log(PotatoBot.Commands);

export default PotatoBot;
