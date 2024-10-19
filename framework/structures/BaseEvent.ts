import { Client, Events } from "discord.js"

export default class BaseEvent {
    public name: Events;

    constructor(name: Events) {
        this.name = name;
    }

    async run(...any: any[]) {
        throw new Error("Method not implemented")
    }
}