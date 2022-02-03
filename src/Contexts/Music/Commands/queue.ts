import { SlashCommandBuilder } from "@discordjs/builders";
import { ICommand } from "../../../Shared/Commands";

export default new SlashCommandBuilder()
  .setName("queue")
  .setDescription("Veja o que tocará na playlist atual.");

export class QueueCommand extends ICommand {
  Validate(): void {
    return;
  }
}
