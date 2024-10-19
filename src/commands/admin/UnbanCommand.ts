import { ChatInputCommandInteraction, Embed, Guild, GuildMemberRoleManager, SlashCommandBuilder, TextBasedChannel } from "discord.js";
import BaseCommand from "../../../framework/structures/BaseCommand";
import Jonathon from "../../bot/Jonathon";
import EmbedReply from "../../utils/EmbedReply";
import config from "../../utils/config";


export default class MembershipCommand extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName("unban")
                .setDescription("Globally unbans a user from Empire Network")
                .addStringOption(option => 
                    option
                        .setName("target")
                        .setDescription("The member to unban")
                        .setRequired(true)
                    )
                .addStringOption(option =>
                    option
                        .setName("reason")
                        .setDescription("Reason to unban user")
                        .setRequired(true)
                    )
        )
    }

    async run(client: Jonathon, interaction: ChatInputCommandInteraction) {
        let member = interaction.member;
        let roles = member?.roles as GuildMemberRoleManager;

        if(!roles.cache.some((role) => config.allowedUsers.includes(role.id))) {
            return interaction.reply({ content: `This is not allowed`, ephemeral: true });
        }
        
        let user = interaction.options.getString("target");
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
                    await server.members.ban(user ?? "", { reason: reason ?? "" });
                    servers.push(server.name);
                    console.log("Successfully unbanned in:", server.name);
                }
            } catch (error) {
                errors.push(guild.name);
                console.error("Error unbanning in guild:", guild.name);
            }
        }));
        
        let channel = await client.channels.fetch("1211865715792150528") as TextBasedChannel;
        if(!channel.isTextBased() && !channel) return;
        channel.send(`**Global Unban**\nUser: ${user}\nReason: ${reason}\nModerator: ${interaction.user.globalName} (${interaction.user.id})`);

        const replyContent = `Unbanned ${user} in ${servers.length} server${servers.length === 1 ? "" : "s"}. These servers are: **${servers.length > 0 ? servers.join(", ") : "None"}**${errors.length > 0 ? `\n\n\nI had an issue unbanning in **${errors.join(", ")}**` : ""}`;
        return interaction.reply({ content: replyContent });
    }
}