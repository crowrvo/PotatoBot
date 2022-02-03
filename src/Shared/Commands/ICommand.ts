import { Notifiable } from "@crowrvo/plume";

export default abstract class ICommand extends Notifiable {
  abstract Validate(): void;
}
