import { Client } from '../classes/Client.js';
import { Database } from '../classes/Database.js';

export const clients = new Database([
    new Client('Bruno', '123', '123', 100),
    new Client('Joaozinho', '456', '456', 200),
]);