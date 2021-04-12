// Client class

/**
 * @class
 */
export class Client {
    /**
     * @constructor
     * @param {string} name 
     * @param {string|number} code 
     * @param {string} password 
     * @param {number} balance 
     */
    constructor (name, code, password, balance) {
        this.name = name;
        this.code = code;
        this.password = password;
        this.balance = balance;
    }

    /**
     * @method
     * @param {number} quantity 
     * @returns {boolean}
     */
    withdraw (quantity) {
        const condition = quantity < this.balance;
        if (condition) {
            this.balance -= quantity;
            return true;
        }
        return condition;
    }

    /**
     * @method
     * @param {number} quantity 
     * @returns {boolean}
     */
    deposit (quantity) {
        const condition = typeof quantity === 'number' && quantity > 0;
        if (condition) {
            this.balance += quantity;
        }
        return condition;
    }

    /**
     * @method
     * @returns {number}
     */
    viewBalance () { return this.balance }
}