import type BotInstance from "../../Core";
import { ClientEvents, Interaction } from "discord.js";
import { Event } from "../../Core/Decorators/Event";
import { Command } from "../../Core/Decorators/Command";
import { ping } from "./Commands";

/**
 *? Essa classe StartUp serve como exemplo de como construir novos módulos para o bot
 *? Crie uma função adicione o decorador de evento selecione o evento no qual ele deve escutar
 *? Passe os argumentos e por fim execute a função
 *
 *? Em caso de comando, construa todas as suas dependências antes de adiciona-lo.
 *? Você também pode importa-lo de fora
 *! Comandos sempre são do tipe interactionCreate
 */

export default class StartUp {
  @Event("ready")
  start(Bot: BotInstance, ...[e]: ClientEvents["ready"]) {
    console.log("Bot Iniciado");
  }

  @Command(ping)
  async ping(Bot: BotInstance, ...[e]: ClientEvents["interactionCreate"]) {
    if (!e.isCommand()) return;
    if (e.commandName !== "ping") return;
    await e.reply("Pong!");
  }
}
