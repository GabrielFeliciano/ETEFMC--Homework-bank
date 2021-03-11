import { Client } from './Client.js';

export class Database {

    /**
     * 
     * @param {Client[]} clients 
     */
    constructor (clients) {
        this.clients = clients;
    }

    /**
     * Get a client account with "full permissions" 
     * (No difference from below except password is required)
     * @param {string|number} code 
     * @param {string} password 
     * @returns {Client}
     */
    loginClient (code, password) {
        return this.clients.find(
            client => client.code == code && client.password == password
        );
    }

    /**
     * Get a client accont with "limited permissions" 
     * (No difference from above except password isnt required)
     * @param {string|number} code 
     * @param {string} password 
     * @returns {Client}
     */
    getClient (code) {
        return this.clients.find(
            client => client.code == code
        );
    }
}