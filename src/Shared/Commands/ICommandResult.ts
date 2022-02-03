import type { Notification } from "@crowrvo/plume";

export default abstract class ICommandResult {
  public Success: boolean;
  public Message: string;
  public Notifications: Array<Notification>;
  constructor(
    success: boolean,
    message: string,
    notifications: Array<Notification>
  ) {
    this.Message = message;
    this.Success = success;
    this.Notifications = notifications;
  }
}
