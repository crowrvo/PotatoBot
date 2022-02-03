import { SlashCommandBuilder } from "@discordjs/builders";

export default new SlashCommandBuilder()
  .setName("remove")
  .addIntegerOption((options) =>
    options
      .setName("position")
      .setDescription("posição da lista")
      .setRequired(true)
  )
  .setDescription("Remova a música que deseja.");
