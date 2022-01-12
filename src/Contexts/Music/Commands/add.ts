import { SlashCommandBuilder } from "@discordjs/builders";

export default new SlashCommandBuilder()
  .setName("add")
  .addStringOption((opt) =>
    opt
      .setName("busca")
      .setDescription("Link ou nome da musica")
      .setRequired(true)
  )
  .setDescription("Adiciona uma musica para a playlist");
