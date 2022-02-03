import type { Notification } from "@crowrvo/plume";
import { ICommandResult } from "../../../Shared/Commands";

export default class ResponseCommandResult extends ICommandResult {

  constructor(
    success: boolean,
    message: string,
    notifications: Array<Notification>
  ) {
    super(success, message, notifications)
  }
}