import { Contract } from "@crowrvo/plume";
import { SlashCommandBuilder } from "@discordjs/builders";
import { ICommand } from "../../../Shared/Commands";

export default new SlashCommandBuilder()
  .setName("add")
  .addStringOption((opt) =>
    opt
      .setName("busca")
      .setDescription("Link ou nome da musica")
      .setRequired(true)
  )
  .setDescription("Adiciona uma musica para a playlist");

export class AddCommand extends ICommand {
  public busca: string;

  constructor(busca: string) {
    super();
    this.busca = busca;
  }
  Validate(): void {
    this.AddNotification(
      new Contract().Equal(
        this.busca,
        "",
        "Command.Add",
        "Busca não pode ser vazia"
      )
    );
    return;
  }
}
