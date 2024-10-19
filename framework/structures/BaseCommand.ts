import { ChatInputCommandInteraction, Client, SlashCommandBuilder, SlashCommandOptionsOnlyBuilder, SlashCommandStringOption, SlashCommandSubcommandsOnlyBuilder } from "discord.js";


export default class BaseCommand {
    public data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder | Omit<SlashCommandBuilder, any>
    
    constructor(data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder | Omit<SlashCommandBuilder, any>) {
        this.data = data;
    }

    run(client: Client, interaction: ChatInputCommandInteraction) {
        throw new Error("Method not implemented")
    }
}