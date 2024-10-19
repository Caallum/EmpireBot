import { Client, GatewayIntentBits } from "discord.js";
import EventHandler from "../../framework/handlers/EventHandler";
import Logger from "../utils/Logger";
import CommandHandler from "../../framework/handlers/CommandHandler";
import config from "../utils/config";

export default class Jonathon extends Client {
    public logger: Logger;
    public CommandHandler: CommandHandler;
    
    constructor() {
        super({ intents: [ GatewayIntentBits.Guilds ]})

        this.login(config.token);
        this.EventHandling();

        this.logger = new Logger();
        this.CommandHandler = new CommandHandler(this, "./src/commands", true);
    }

    async EventHandling() {
        new EventHandler(this, "./src/events")
    }
}