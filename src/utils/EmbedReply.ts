import { APIEmbedField, ActionRowBuilder, ButtonInteraction, ChatInputCommandInteraction, EmbedAuthorOptions, EmbedBuilder, EmbedFooterOptions, Interaction, MessageComponent } from "discord.js";
import { EmbedOptions } from "../types/main";

export default class EmbedReply {
    public Title?: string;
    public Description?: string;
    public Footer?: EmbedFooterOptions;
    public Author?: EmbedAuthorOptions;
    public Fields?: APIEmbedField[];
    public Thumbnail?: string;
    public Image?: string;
    public Colour: number;
    
    constructor(options: EmbedOptions) {

        let { Title, Description, Fields, Author, Thumbnail, Image } = options;

        if(Title) this.Title = Title;
        if(Description) this.Description = Description;
        if(Author) this.Author = Author;
        if(Fields) this.Fields = Fields;
        if(Thumbnail) this.Thumbnail = Thumbnail;
        if(Image) this.Image = Image;

        this.Colour = 0x000000
    }

    build(): EmbedBuilder {
        const embed = new EmbedBuilder();

        if(this.Title) embed.setTitle(this.Title);
        if(this.Description) embed.setDescription(this.Description);
        if(this.Author) embed.setAuthor(this.Author);
        if(this.Fields) embed.setFields(this.Fields);
        if(this.Thumbnail) embed.setThumbnail(this.Thumbnail);
        if(this.Image) embed.setImage(this.Image);

        embed.setColor(this.Colour);
        embed.setFooter({ text: "Empire Network", iconURL: "" })

        return embed;
    }

    commandReply(interaction: ChatInputCommandInteraction, ephemeral: boolean) {
        let embed: EmbedBuilder = this.build();

        return interaction.reply({ embeds: [embed], ephemeral: ephemeral ? true : false });
    }

    editCommandReply(interaction: ChatInputCommandInteraction) {
        return interaction.editReply({ embeds: [this.build()] })
    }

    buttonReply(interaction: ButtonInteraction, ephemeral: boolean) {
        let embed: EmbedBuilder = this.build();

        return interaction.reply({ embeds: [embed], ephemeral: ephemeral ? true : false });
    }

    editButtonReply(interaction: ButtonInteraction) {
        return interaction.editReply({ embeds: [this.build()] })
    }

    buttonFollowUp(interaction: ButtonInteraction, ephemeral?: boolean) {
        return interaction.followUp({ embeds: [this.build()], ephemeral: ephemeral ? true : false })
    }

    commandFollowUp(interaction: ChatInputCommandInteraction) {
        return interaction.followUp({ embeds: [this.build()] })
    }

    buttonUpdate(interaction: ButtonInteraction, components?: MessageComponent[]) {
        return interaction.update({ embeds: [this.build()], components: components ? [new ActionRowBuilder<any>().addComponents(...components)] : [] });
    }
}