// Client class

export class Client {
    constructor (name, code, password, balance) {
        this.name = name;
        this.code = code;
        this.password = password;
        this.balance = balance;
    }

    withdraw (quantity) {
        const condition = quantity < this.balance;
        if (condition) {
            this.balance -= quantity;
            return true;
        }
        return condition;
    }

    deposit (quantity) {
        const condition = typeof quantity === 'number' && quantity > 0;
        if (condition) {
            this.balance += quantity;
        }
        return condition;
    }

    viewBalance () { return this.balance }
}