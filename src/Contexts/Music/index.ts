import type BotInstance from "../../Core";
import {
  ClientEvents,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
} from "discord.js";
import { Command } from "../../Core/Decorators/Command";
import { add } from "./Commands";
import * as yt from "youtube-search-without-api-key";

export default class Music {
  Next() {}
  Prev() {}
  Playlist() {}
  Remove() {}

  @Command(add)
  async Add(Bot: BotInstance, ...[e]: ClientEvents["interactionCreate"]) {
    if (!e.isCommand()) return;
    if (e.commandName !== "add") return;
    const filter = (i) => i.user.id === e.user.id;
    const Row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("yes")
        .setLabel("Sim")
        .setStyle("SUCCESS"),
      new MessageButton().setCustomId("no").setLabel("Não").setStyle("DANGER")
    );

    let busca = e.options.getString("busca");
    let result = await yt.search(busca);
    let reply = new MessageEmbed()
      .setImage(result[0].snippet.thumbnails.url)
      .setTitle("Deseja adicionar essa música na playlist?")
      .setThumbnail(e.user.avatarURL())
      .setDescription(`**${result[0].title}**`)
      .addField(`Views: ${result[0].views}`, "\u200B", true)
      .addField(`Duração: ${result[0].duration_raw}`, "\u200B", true)
      .setURL(result[0].url);

    let rep = await e.reply({
      embeds: [reply],
      components: [Row],
      fetchReply: true,
    });

    const collector = e.channel.createMessageComponentCollector({
      filter,
      time: 15000,
    });
    collector.on("collect", async (i) => {
      if (i.customId === "yes")
        e.editReply({
          content: "Adicionado com sucesso!",
          embeds: [],
          components: [],
        });
      if (i.customId === "no")
        e.editReply({
          content: "Cancelado com sucesso!",
          embeds: [],
          components: [],
        });
    });
  }
}
