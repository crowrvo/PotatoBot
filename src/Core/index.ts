import { Client, ClientEvents, HexColorString } from "discord.js";
import { EInstanceStatus } from "../Shared/Enums";
import type { Intents } from "discord.js";

/**
 * Essa é uma parte complicada e delicada do código.
 * Nesse ponto é onde passamos todos os eventos do discord para a nossa instancia do bot
 * e também configuramos e ligamos seus módulos(Contextos) automaticamente
 */

// Representa um item da lista de eventos do discord
type EventPair = {
  [key in keyof ClientEvents]: Array<(...args: ClientEvents[key]) => void>;
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
  /**
   * @param intents - Pontos de acesso
   */
  constructor(intents: Intents) {
    this._Client = new Client({ intents });
    this._InstanceStatus = EInstanceStatus.Stopped;
    this._EventsList = {} as EventPair;
  }

  /**
   * Comando que Adiciona um novo Módulo(contexto) na instancia do bot
   * @param token DISCORD TOKEN
   */
  AddModule(module: new () => object): BotInstance {
    const instance = new module();
    const Events = Reflect.getMetadata("events", module);
    Events.forEach((Event) => {
      if (!this._EventsList[Event.Name]) this._EventsList[Event.Name] = [];
      this._EventsList[Event.Name].push(instance[Event.Method]);
    });

    return this;
  }

  /**
   * Comando que inicializa o Bot
   * @param token DISCORD TOKEN
   */
  Start(token: string): void {
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
  }
}
