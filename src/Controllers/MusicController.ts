import { ClientEvents, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";

import { add, queue, remove } from "../Contexts/Music/Commands";

import BotInstance from "../Core";
import { Command } from "../Core/Decorators/Command";

import * as yt from "youtube-search-without-api-key"

type TMusicPlaylist = {
  name: string;
  link: string;
};

export default class MusicController {
  public Musics: TMusicPlaylist[] = [];

  Next() {}
  Prev() {}
  Playlist() {}

  @Command(add)
  async Add(Bot: BotInstance, ...[e]: ClientEvents["interactionCreate"]) {
    if (!e.isCommand() || e.commandName !== "add") return;

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
      filter: (i) => i.user.id === e.user.id,
      time: 15000,
    });
    collector.on("collect", async (i) => {
      if (i.customId === "yes") {
        this.Musics = [
          ...this.Musics,
          { name: result[0].title, link: result[0].url },
        ];

        e.editReply({
          content: "Adicionado com sucesso!",
          embeds: [],
          components: [],
        });
      }
      if (i.customId === "no") {
        e.editReply({
          content: "Cancelado com sucesso!",
          embeds: [],
          components: [],
        });
        return;
      }
    });
  }

  @Command(queue)
  async Queue(Bot: BotInstance, ...[e]: ClientEvents["interactionCreate"]) {
    if (!e.isCommand() || e.commandName !== "queue") return;
    if (this.Musics.length === 0)
      return await e.reply("Não há músicas na playlist atual.");

    if (this.Musics.length !== 1) {
      const QueueEmbed = new MessageEmbed().setTitle("Musicas na Playlist:");
    }

    const music = this.Musics[0];
    return await e.reply({
      embeds: [
        new MessageEmbed().setTitle("Musica que está na playlist: ").addFields(
          {
            name: "Nome:",
            value: music.name,
          },
          {
            name: "URL:",
            value: music.link,
          }
        ),
      ],
    });
  }

  @Command(remove)
  async Remove(Bot: BotInstance, ...[e]: ClientEvents["interactionCreate"]) {
    if (!e.isCommand() || e.commandName !== "remove") return;
    if (this.Musics.length === 0)
      return await e.reply("Não há músicas na playlist atual.");

    const position = e.options.getInteger("position");
    if (position < 1 || position > this.Musics.length)
      return await e.reply("Defina uma posição válida.");

    let newPlaylist: TMusicPlaylist[] = [];

    for (let index = 0; index < this.Musics.length; index++) {
      if (index !== position)
        newPlaylist = [...newPlaylist, this.Musics[index]];
    }

    this.Musics = newPlaylist;

    return await e.reply("Essa música foi removida da playlist!");
  }
}