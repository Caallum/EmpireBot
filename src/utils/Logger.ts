import chalk from "chalk";

export default class Logger {
    constructor() {

    }

    good(message: string): void {
        console.log(`${chalk.green("[GOOD]")} ${message}`)
    }

    warning(message: string): void {
        console.log(`${chalk.yellow("[WARNING]")} ${message}`)
    }

    error(message: string): void {
        console.log(`${chalk.red("[ERROR]")} ${message}`)
    }
}