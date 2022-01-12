import { SlashCommandBuilder } from "@discordjs/builders";

export default new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Comando de teste, sem função, Retornar um Pong!");
