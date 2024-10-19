import { ChatInputCommandInteraction, Embed, Guild, GuildChannel, SlashCommandBuilder, TextBasedChannel } from "discord.js";
import BaseCommand from "../../../framework/structures/BaseCommand";
import Jonathon from "../../bot/Jonathon";
import EmbedReply from "../../utils/EmbedReply";
import config from "../../utils/config";


export default class MembershipCommand extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName("ban")
                .setDescription("Globally bans a user from Empire Network")
                .addUserOption(option => 
                    option
                        .setName("target")
                        .setDescription("The member to ban")
                        .setRequired(true)
                    )
                .addStringOption(option =>
                    option
                        .setName("reason")
                        .setDescription("Reason to ban user")
                        .setRequired(true)
                    )
        )
    }

    async run(client: Jonathon, interaction: ChatInputCommandInteraction) {
        if(!config.allowedUsers.includes(interaction.user.id)) {
            return interaction.reply({ content: "Permissions denied", ephemeral: true });
        }
        
        let user = interaction.options.getUser("target");
        let reason = interaction.options.getString("reason");
        await client.guilds.fetch();
        const guilds = client.guilds.cache;
        const servers: string[] = [];
        const errors: string[] = [];
        
        await Promise.all(guilds.map(async (guild: Guild) => {
            try {
                const server = await guild.fetch();
                const me = await server.members.fetchMe();
                
                if (me && me.permissions.has("BanMembers")) {
                    await server.members.ban(user?.id ?? "", { reason: reason ?? "" });
                    servers.push(server.name);
                    console.log("Successfully banned in:", server.name);
                }
            } catch (error) {
                errors.push(guild.name);
                console.error("Error banning in guild:", guild.name);
            }
        }));
        
        user?.send({ content: "**Empire Network Global Ban**\n\nYou just got banned from all Empire Network servers.\n\nReason: " + reason});

        let channel = await client.channels.fetch("1211865715792150528") as TextBasedChannel;
        if(!channel.isTextBased() && !channel) return;
        channel.send(`**Global Ban**\nUser: ${user?.globalName ?? user?.tag} (${user?.id})\nReason: ${reason}\nModerator: ${interaction.user.globalName} (${interaction.user.id})`);

        const replyContent = `Banned ${user?.globalName ?? user?.tag} in ${servers.length} server${servers.length === 1 ? "" : "s"}. These servers are: **${servers.length > 0 ? servers.join(", ") : "None"}**${errors.length > 0 ? `\n\n\nI had an issue banning in **${errors.join(", ")}**` : ""}`;
        return interaction.reply({ content: replyContent });
    }
}