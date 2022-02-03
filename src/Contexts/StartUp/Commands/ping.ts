import { SlashCommandBuilder } from "@discordjs/builders";
import { ICommand } from "../../../Shared/Commands";

export default new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Comando de teste, sem função, Retornar um Pong!");

export class PingCommand extends ICommand {
  Validate(): void {
    throw new Error("Method not implemented.");
  }

}