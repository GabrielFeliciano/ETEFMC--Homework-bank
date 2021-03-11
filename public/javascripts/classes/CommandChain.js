/**
 * Loops a function until it returns a desired data
 * @param {() => any} functionToLoop 
 * @param {(any) => boolean} tester 
 * @returns result of functionToLoop
 */
export function loopUntilGotData (functionToLoop, tester) {
    while (true) {
        const result = functionToLoop();
        if (tester(result)) { return result; }
    }
}

export class Command {

    /**
     * 
     * @param {string} label Describes the use of the command
     * @param {function} action A function that fires when command is selected
     * @param {CommandList} next A pointer to the 
     */
    constructor (label, action, next = null) {
        this.label = label;
        this.action = action;
        this.next = next;
    }

    execute (...params) {
        return this.action(...params);
    }
}

export class CommandList {
    /**
     * 
     * @param {Command[]} commands 
     */
    constructor (commands) {
        this.commands = commands
    }

    /**
     * 
     * @param {number} index 
     * @returns {Command}
     */
    getCommand (index) {
        return this.commands[index];
    }

    listActualCommandsLabel () {
        return this.commands.map(command => command.label);
    }
}

export class CommandChain {

    /**
     * 
     * @param {CommandList} commands 
     * @param {object} storage
     */
    constructor (commands) {

        this.commandChain = commands;

        this.actualCommandList = commands;
        this.commandsRoute = [commands];
    }

    /**
     * 
     * @param {() => number} commandExecutor 
     */
    start (commandExecutor) {
        while (true) {
            console.log(this.storage)
            if (!this.actualCommandList) { 
                console.log('hello')
                return; 
            }

            const index = commandExecutor(this.listActualCommandsLabel()) - 1;
            const command = this.getCommand(index);
            command();
        }
    }

    resetRoute () { this.commandsRoute = [this.commandChain] }

    /**
     * 
     * @param {Object} storage 
     */
    setStorage (storage) {
        this.storage = storage;
    }

    listActualCommandsLabel () {
        return this.actualCommandList.listActualCommandsLabel();
    }

    /**
     * 
     * @param {index} index 
     * @returns 
     */
    getCommand (index) {
        const command = this.actualCommandList.getCommand(index);
        return command 
        ? () => {
            if (command.next) { this.goForward(index);}
            return command.execute(this.storage, this.goBackToHistoryIndex.bind(this));
        } 
        : undefined
    }

    /**
     * 
     * @param {number} index 
     */
    goBackToHistoryIndex (index) {
        this.commandsRoute = this.commandsRoute.filter(
            (command, i) => i <= index
        );
        this.actualCommandList = this.commandsRoute[this.commandsRoute.length - 1];
    }

    /**
     * @private
     * @param {number} indexCommand 
     */
    goForward (indexCommand) {
        const command = this.actualCommandList.getCommand(indexCommand);
        const nextCommands = command.next;

        console.log(nextCommands)
        if (nextCommands instanceof CommandList) {
            this.commandsRoute.push(nextCommands);
            this.actualCommandList = nextCommands;
        }
    }

    /**
     * @private
     */
    goBack () {
        this.commandsRoute.pop();
        this.actualCommandList = this.commandsRoute[this.commandsRoute.length - 1];
    }
}