import { Client } from "discord.js";
import { readdirSync } from "fs";
import BaseEvent from "../structures/BaseEvent";
import { join } from "path";

export default class EventHandler {
    public client: Client;
    public eventFolder: string;
    
    constructor(client: Client, eventFolder?: string) {
        this.client = client;
        this.eventFolder = eventFolder ? eventFolder : "/src/events";

        this.Events();
    }

    private async Events() {
        const eventFiles = readdirSync(join(process.cwd(), this.eventFolder)).filter((file: string) => file.endsWith(".ts"));
        for(const file of eventFiles) {
            const Event = await import(`${join(process.cwd(), this.eventFolder)}/${file}`);
            if(Event.default.prototype instanceof BaseEvent) {
                const event = new Event.default();
                this.client.on(event.name, event.run.bind(null, this.client))
            }
        }
    }
}