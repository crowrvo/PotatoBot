import type IPlaylistRepository from "../Repositories/IPlaylistRepository";
import type IHandler from "../../../Shared/Handler/IHandler";
import { ICommandResult } from "../../../Shared/Commands";
import { AddCommand } from "../Commands";
import ResponseCommandResult from "../Commands/response";
import IYoutubeService from "../Service/IYoutubeService";

export default class AddMusicHandler implements IHandler {

  private _playListRepository: IPlaylistRepository;
  private _playListService: IYoutubeService;

  constructor(repository: IPlaylistRepository, service: IYoutubeService) {
    this._playListRepository = repository;
    this._playListService = service;
  }
  public execute(command: AddCommand) {
    command.Validate();
    if (!command.isValid())
      return new ResponseCommandResult(
        false,
        "Comando inválido",
        command.GetNotifications
      );

    const serv = this._playListService.Search(command.busca);


    return;
  }
}
