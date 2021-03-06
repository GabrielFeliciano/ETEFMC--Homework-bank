/**
 * Description of the function
 * @name FunctionToLoop
 * @function
 * @returns {any}
*/

/**
 * Description of the function
 * @name Tester
 * @function
 * @param {any}
 * @returns {boolean}
*/

/**
 * Loops a function until it returns a desired data
 * @function
 * @param {FunctionToLoop} functionToLoop 
 * @param {Tester} tester 
 * @returns result of functionToLoop
 */
export function loopUntilGotData (functionToLoop, tester) {
    while (true) {
        const result = functionToLoop();
        if (tester(result)) { return result; }
    }
}

/**
 * @class
 */
export class Command {

    /**
     * @constructor
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

/**
 * @class
 */
export class CommandList {
    /**
     * @constructor
     * @param {Command[]} commands 
     */
    constructor (commands) {
        this.commands = commands
    }

    /**
     * @method
     * @param {number} index 
     * @returns {Command}
     */
    getCommand (index) {
        return this.commands[index];
    }

    /**
     * @method
     * @returns {string[]}
     */
    listActualCommandsLabel () {
        return this.commands.map(command => command.label);
    }
}

/**
 * @class
 */
export class CommandChain {

    /**
     * @constructor
     * @param {CommandList} commands 
     * @param {object} storage
     */
    constructor (commands) {

        this.commandChain = commands;

        this.actualCommandList = commands;
        this.commandsRoute = [commands];
    }

    /**
     * @method
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
     * @method
     * @param {Object} storage 
     */
    setStorage (storage) {
        this.storage = storage;
    }

    listActualCommandsLabel () {
        return this.actualCommandList.listActualCommandsLabel();
    }

    /**
     * @method
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
     * @method
     * @param {number} index 
     */
    goBackToHistoryIndex (index) {
        this.commandsRoute = this.commandsRoute.filter(
            (command, i) => i <= index
        );
        this.actualCommandList = this.commandsRoute[this.commandsRoute.length - 1];
    }

    /**
     * @method
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
     * @method
     * @private
     */
    goBack () {
        this.commandsRoute.pop();
        this.actualCommandList = this.commandsRoute[this.commandsRoute.length - 1];
    }
}