import type { Awaitable } from "../../Utils";
import ICommand from "../Commands/ICommand";
import ICommandResult from "../Commands/ICommandResult";

export default abstract class IHandler {
  public abstract execute(command: ICommand): Awaitable<ICommandResult>;
}