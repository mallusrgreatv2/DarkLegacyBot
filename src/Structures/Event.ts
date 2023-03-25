import { ClientEvents } from "discord.js";
import IEvent from "../interfaces/Event.js";
import Client from "./Client.js";

class Event<K extends keyof ClientEvents> implements IEvent<K> {
  public event: K;
  public run: (client: Client, ...args: ClientEvents[K]) => unknown;

  constructor(options: IEvent<K>) {
    this.event = options.event;
    this.run = options.run;
  }
}

export default Event;
