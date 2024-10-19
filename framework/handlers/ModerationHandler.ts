import { BaseChannel, Channel, Client, User } from "discord.js";


export default class ModerationHandler {
    public client: Client;
    private channel?: Channel
    
    constructor(client: Client, channelId: string) {
        this.client = client;
        
        async () => {
            this.channel = await client.channels.fetch(channelId) ?? undefined;
        };
    }

    private async log (type: string, user: User, moderator: User): Promise<boolean> {


        return false;
    }
}