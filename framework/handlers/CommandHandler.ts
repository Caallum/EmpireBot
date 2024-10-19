import { Client, Collection, Interaction, REST, Routes, SlashCommandBuilder } from "discord.js";
import { readdirSync } from "fs"
import { join } from "path";
import BaseCommand from "../structures/BaseCommand";

export default class CommandHandler {
    public client: Client;
    public commandFolder: string;
    public subFolders: boolean;
    public commands: Collection<string, BaseCommand>;

    constructor(client: Client, commandFolder: string, subFolders: boolean) {
        this.client = client;
        this.commandFolder = commandFolder;
        this.subFolders = subFolders;

        this.commands = new Collection();
    }

    public async guildCommandHandling(guildId: string) {
        if(!this.client.user) {
            return console.log(`[GAMESYNC COMMAND HANDLER] Put initial command handler function inside the Ready Event`);
        }

        if(!this.client.token) {
            return console.log(`[GAMESYNC COMMAND HANDLER] Put initial command handler function inside the Ready Event`);
        }

        let clientId = this.client.user.id;
        let commands: SlashCommandBuilder[] = [];

        const commandPaths: string[] = readdirSync(join(process.cwd(), this.commandFolder));
        
        for(const path of commandPaths) {
            if(this.subFolders) {
                const commandFolders: string[] =  readdirSync(join(process.cwd(), this.commandFolder, path)).filter((file: string) => file.endsWith(".ts"));
                for(const file of commandFolders) {
                    let Command = await import(join(process.cwd(), this.commandFolder, path, file));
                    if(Command.default.prototype instanceof BaseCommand) {
                        let command = new Command.default();
                        commands.push(command.data.toJSON());
                        this.commands.set(command.data.name, command);
                    }
                }
            } else {
                let Command = await import(join(process.cwd(), this.commandFolder, path));
                if(Command.default.prototype instanceof BaseCommand) {
                    let command = new Command.default();
                    commands.push(command.data.toJSON());
                    this.commands.set(command.data.name, command);
                }
            }
        }

        const rest = new REST().setToken(this.client.token);

        (async () => {
            try {
                console.log(`[GAMESYNC COMMAND HANDLER] Starting to refresh ${commands.length} command${commands.length == 1 ? ""  : "s"}`);

                const data: any = await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId),
                    { body: commands }
                );

                console.log(`[GAMESYNC COMMAND HANDLER] Successfully refreshed ${data.length} commands`);
            } catch(err: any) {
                console.log(`[GAMESYNC COMMAND HANDLER] Error DETECTED`)
                console.log(err)
                console.log(`[GAMESYNC COMMAND HANDLER] Error DETECTED`)
            }
        })();
    }

    public async globalCommandHandling() {
        if(!this.client.user) {
            return console.log(`[GAMESYNC COMMAND HANDLER] Put initial command handler function inside the Ready Event`);
        }

        if(!this.client.token) {
            return console.log(`[GAMESYNC COMMAND HANDLER] Put initial command handler function inside the Ready Event`);
        }

        let clientId = this.client.user.id;
        let commands: SlashCommandBuilder[] = [];

        const commandPaths: string[] = readdirSync(join(process.cwd(), this.commandFolder));
        
        for(const path of commandPaths) {
            if(this.subFolders) {
                const commandFolders: string[] =  readdirSync(join(process.cwd(), this.commandFolder, path)).filter((file: string) => file.endsWith(".ts"));
                for(const file of commandFolders) {
                    let Command = await import(join(process.cwd(), this.commandFolder, path, file));
                    if(Command.default.prototype instanceof BaseCommand) {
                        let command = new Command.default();
                        commands.push(command.data.toJSON());
                        this.commands.set(command.data.name, command);
                    }
                }
            } else {
                let Command = await import(join(process.cwd(), this.commandFolder, path));
                if(Command.default.prototype instanceof BaseCommand) {
                    let command = new Command.default();
                    commands.push(command.data.toJSON());
                    this.commands.set(command.data.name, command);
                }
            }
        }

        const rest = new REST().setToken(this.client.token);
        
        (async () => {
            try {
                console.log(`[GAMESYNC COMMAND HANDLER] Starting to refresh ${commands.length} command${commands.length == 1 ? ""  : "s"}`);

                const data: any = await rest.put(
                    Routes.applicationCommands(clientId),
                    { body: commands }
                );

                console.log(`[GAMESYNC COMMAND HANDLER] Successfully refreshed ${data.length} commands`);
            } catch(err: any) {
                console.log(`[GAMESYNC COMMAND HANDLER] Error DETECTED`)
                console.log(err)
                console.log(`[GAMESYNC COMMAND HANDLER] Error DETECTED`)
            }
        })();
    }
    
    public async interactionHandler(interaction: Interaction) {
        if(!interaction.isChatInputCommand()) return;

        const command = this.commands.get(interaction.commandName);

        if(!command) {
            console.log(`[GAMESYNC COMMAND HANDLER] ${interaction.commandName} isn't a valid command`);
            return {
                status: "error",
                message: "Invalid Command Provided",
                action: "reply"
            };
        }

        try {
            await command.run(this.client, interaction);
        } catch(err: any) {
            console.log(err);
            if(interaction.replied || interaction.deferred) {
                return {
                    status: "error",
                    message: "Something went wrong while executing command",
                    action: "followUp"
                }
            } else {
                return {
                    status: "error",
                    message: "Something went wrong while executing command",
                    action: "reply"
                }
            }
        }
    }
}