/**
 * Aqui é onde todo o bot é configurado e inicializado,
 * passando seu token, módulos e suas configurações iniciais
 */

import { Intents } from "discord.js";
import StartUp from "../Contexts/StartUp";
import BotInstance from "../Core";

const Ints = new Intents()
  .add("GUILD_MESSAGES")
  .add("GUILDS")
  .add("GUILD_MEMBERS")
  .add("GUILD_INTEGRATIONS");

const PotatoBot = new BotInstance(Ints);

PotatoBot.AddModule(StartUp);
PotatoBot.Start(process.env.BOT_TOKEN);

export default PotatoBot;
