/**
 * Aqui é onde todo o bot é configurado e por fim inicializado, passando seu token e suas configurações iniciais
 */

import { Intents } from "discord.js";
import BotInstance from "../Core/BotCore";

const Ints = new Intents()
  .add("GUILD_MESSAGES")
  .add("GUILDS")
  .add("GUILD_MEMBERS")
  .add("GUILD_INTEGRATIONS");

let HestiaBot = new BotInstance(Ints);

HestiaBot.Start(process.env.BOT_TOKEN);

export default HestiaBot;
