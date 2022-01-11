import type BotInstance from "../../Core";
import type { ClientEvents } from "discord.js";
import { Event } from "../../Core/Decorators/DEvents";

/**
 * Essa classe StartUp serve como exemplo de como construir novos módulos para o bot
 * Crie uma função adicione o decorador de evento selecione o evento no qual ele deve escutar
 * Passe os argumentos  e por fim execute a função
 */
export default class StartUp {
  @Event("ready")
  start(Bot: BotInstance, ...[e]: ClientEvents["ready"]) {
    console.log("Iniciado");
  }
}
