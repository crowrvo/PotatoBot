import { ICommand, ICommandResult } from "../../../Shared/Commands";
import IHandler from "../../../Shared/Handler/IHandler";
import { PingCommand } from "../Commands/ping";

export default class startUpHandler implements IHandler {
  public execute(command: ICommand): Promise<ICommandResult> {
    throw new Error("Method not implemented.");
  }

};