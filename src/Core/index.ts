import type { Intents } from "discord.js";
import { Client, ClientEvents, HexColorString } from "discord.js";
import { REST } from "@discordjs/rest";
import {
  RESTPostAPIApplicationCommandsJSONBody,
  Routes,
} from "discord-api-types/v9";
import { EInstanceStatus } from "../Shared/Enums";
import { SlashCommandBuilder } from "@discordjs/builders";
import glob from "glob";

/**
 * Essa é uma parte complicada e delicada do código.
 * Nesse ponto é onde passamos todos os eventos do discord para a nossa instancia do bot
 * e também configuramos e ligamos seus módulos(Contextos) automaticamente
 */

// Representa um item da lista de eventos do discord
type EventPair = {
  [key in keyof ClientEvents]: Array<(...args: ClientEvents[key]) => void>;
};

type CommandPair = {
  [key: string]: RESTPostAPIApplicationCommandsJSONBody;
};

// Principal estrutura do bot
export default class BotInstance {
  private readonly _Client: Client;

  public get GetClient() {
    return this._Client;
  }

  private _InstanceStatus: EInstanceStatus;
  public get GetInstanceStatus(): EInstanceStatus {
    return this._InstanceStatus;
  }

  private _EventsList: EventPair;
  private _CommandsList: CommandPair;
  /**
   * @param intents - Pontos de acesso
   */
  constructor(intents: Intents) {
    this._Client = new Client({ intents });
    this._InstanceStatus = EInstanceStatus.Stopped;
    this._EventsList = {} as EventPair;
    this._CommandsList = {} as CommandPair;

    // Load Controllers
    glob(`${__dirname}/../Controllers/*`, (er, files) => {
      files.forEach(async (file, i) => {
        console.info(`Registrando controller ${i + 1} de ${files.length}`);
        let Controller = await require(file).default;
        this.AddController(Controller);
      });
      console.info(`Controllers registrados com sucesso!`);
    });
  }

  public get Events() {
    return Object.keys(this._EventsList);
  }

  public get Commands() {
    return Object.keys(this._CommandsList);
  }
  /**
   * Comando que Adiciona um novo Módulo(contexto) na instancia do bot
   */
  AddController(module: new () => object): BotInstance {
    const instance = new module();
    const Events = Reflect.getMetadata("events", module);

    if (Events)
      Events.forEach((Event) => {
        if (!this._EventsList[Event.Name]) this._EventsList[Event.Name] = [];
        this._EventsList[Event.Name].push(instance[Event.Method]);
      });
    const Commands = Reflect.getMetadata("commands", module);
    if (Commands)
      Commands.forEach(
        (Command: { Builder: SlashCommandBuilder; Method: string }) => {
          if (!this._EventsList["interactionCreate"])
            this._EventsList["interactionCreate"] = [];
          this._EventsList["interactionCreate"].push(instance[Command.Method]);
          if (this._CommandsList[Command.Builder.name]) return;
          this._CommandsList[Command.Builder.name] = Command.Builder.toJSON();
        }
      );
    return this;
  }

  /**
   * Comando que inicializa o Bot
   * @param token DISCORD TOKEN
   */
  async Start(token: string) {
    const rest = new REST({ version: "9" }).setToken(token);
    this._Client.login(token);
    this._InstanceStatus = EInstanceStatus.Running;

    // Carrega os eventos do bot
    for (let event in this._EventsList) {
      this._Client.on(event, (...args) => {
        this._EventsList[event].forEach((func) => {
          func(this, ...args);
        });
      });
    }

    // Carrega os comandos do bot
    const Commands = Object.values(this._CommandsList);
    try {
      console.log("Started refreshing application (/) commands.");
      await rest.put(
        Routes.applicationGuildCommands(
          "930587431021973565",
          "909235406837542952"
        ),
        {
          body: Commands,
        }
      );
      console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
      console.error(error);
    }
  }
}
