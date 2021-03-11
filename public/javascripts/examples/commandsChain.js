import { ask, display, buildSentence } from '../prompt.js';
import { CommandChain, CommandList, Command } from '../classes/CommandChain.js';
import { Client } from '../classes/Client.js';
import { Database } from '../classes/Database.js';

// [2 list] ------------------------------------------------------

const depositOpts = new CommandList ([
    new Command(
        'Depositar em sua conta', 
        
        /**
         * @param { {client: Client, database: Database} } storage 
         */
        (storage) => {
            const {client, database} = storage;
            console.log(client)
            console.log(client.deposit)

            const quantity = Number(ask('Digite a quantidade'));
            const result = client.deposit(quantity);
            if (result) {
                display(`Depósito realizado! Novo saldo: ${client.balance}`);
            } else {
                display(`Valor inválido! Saldo atual: ${client.balance}`);
            }
        }
        
    ),
    new Command(
        'Depositar em outra conta', 
        
        /**
         * @param { {client: Client, database: Database} } storage 
         */
        (storage) => {
            const {client, database} = storage;

            const codeClientTarget = ask('Digite o código da conta que deseje depositar');
            const clientTarget = database.getClient(codeClientTarget);

            if (clientTarget) {
                const quantity = ask('Digite a quantidade que deseje depositar');

                const result = client.withdraw(quantity);

                if (result) {
                    clientTarget.deposit(quantity);
                    display('Depositário com sucesso')
                }

            } else {
                display(`Conta com código ${codeClientTarget} não encotrada`);
            }
        }
    )
]);

// [1 list] ------------------------------------------------------

const mainOpts = new CommandList ([
    new Command(
        'Saque', 

        /**
         * @param { {client: Client, database: Database} } storage 
         */
        (storage) => null
    ),
    new Command(
        'Depósito',

        /**
         * @param { {client: Client, database: Database} } storage
         * @param { (param0: number) => void } goBackInHistory
         */
        (storage) => {
        },

        depositOpts
    ),
    new Command(
        'Ver detalhes da conta', 
        
        /**
         * @param { {client: Client, database: Database} } storage
         * @param { (param0: number) => void } goBackInHistory
         */
        (storage) => {
            const {client, database} = storage;
            display(`Seu saldo é de ${client.balance}`)
        }

    ),
]);

// !! Deprecated Code !!

// /**
//  * @type { {label: string, action: Function, next?: Array } }
//  */
// const a = [
//     {
//         label: 'Saque',
//         action: () => null,
//         next: null
//     }, {
//         label: 'Depósito',
//         action: () => null,
//         next: [
//             {
//                 label: 'Depositar em sua conta',
//                 action: () => null
//             }, {
//                 label: 'Depositar em outra conta',
//                 action: () => null
//             }
//         ]
//     }, {
//         label: 'Ver detalhes da conta',
//         action: () => null,
//         next: null
//     }
// ]

// ---------------------------------------------------------

export const commandChain = new CommandChain(mainOpts);