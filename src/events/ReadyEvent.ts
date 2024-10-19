import BaseEvent from "../../framework/structures/BaseEvent";
import { ActivityType, Events, Guild} from "discord.js"
import CommandHandler from "../../framework/handlers/CommandHandler";
// import { InitialiseDB } from "../../framework/handlers/DatabaseHandlerOld"; 
import Jonathon from "../bot/Jonathon";

export default class Ready extends BaseEvent {
    constructor() {
        super(Events.ClientReady)
    }

    async run(client: Jonathon) {
        client.logger.good(`${client.user?.tag} is ONLINE`);

        console.log(client.user?.id);

        // await InitialiseDB()

        client.user?.setActivity({ name: "test", type: ActivityType.Watching });
        setInterval(() => {
            client.user?.setActivity({ name: "test", type: ActivityType.Watching });
        }, 3600000)

        client.CommandHandler.globalCommandHandling();
    }
}