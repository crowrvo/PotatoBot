import { ClientEvents } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

/**
 * São os atalhos encontrados nos contextos iniciados com @ que definem a utilidade daquela função
 * @param event
 * @returns
 */
export const Command = (Command: SlashCommandBuilder): MethodDecorator => {
  return (target, propertyKey: string): void => {
    //? Caso a array de eventos ainda não exista, Cria ela.
    if (!Reflect.hasMetadata("commands", target.constructor)) {
      Reflect.defineMetadata("commands", [], target.constructor);
    }

    //? Recupera todos methods cadastrados anteriormente.
    const commands = Reflect.getMetadata("commands", target.constructor);

    //? Adiciona o novo method.
    commands.push({
      Builder: Command,
      Method: propertyKey,
    });

    //? Atualiza nossa lista de eventos.
    Reflect.defineMetadata("commands", commands, target.constructor);
  };
};
