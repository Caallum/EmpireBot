import { Events, Interaction } from "discord.js";
import BaseEvent from "../../framework/structures/BaseEvent";
import Jonathon from "../bot/Jonathon";
import EmbedReply from "../utils/EmbedReply";


export default class InteractionEvent extends BaseEvent {
    constructor() {
        super(Events.InteractionCreate)
    }

    async run(client: Jonathon,  interaction: Interaction) {
        let message = await client.CommandHandler.interactionHandler(interaction);
        
        if(interaction.isChatInputCommand()) {
            if(message?.status == "error") {
                if(message?.action == "followUp") {
                    interaction.followUp({ content: message?.message });
                    new EmbedReply({ Title: message.message }).commandFollowUp(interaction);
                } else if(message?.action == "reply") {
                    new EmbedReply({ Title: message.message }).commandReply(interaction, true);
                }
            } 
        }
    }
}