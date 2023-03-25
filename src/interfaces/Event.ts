import Client from "./Client.js";
import { ClientEvents } from "discord.js";

interface Event<K extends keyof ClientEvents> {
  event: K;
  run: (client: Client, ...args: ClientEvents[K]) => any;
}

export default Event;
