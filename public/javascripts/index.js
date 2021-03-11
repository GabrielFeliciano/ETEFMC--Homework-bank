import { clients } from './examples/clients.js';
import { commandChain } from './examples/commandsChain.js';
import { ask, display, buildSentence } from './prompt.js';

// ---------------
// *Main function*
// ---------------

function main () {
    const client = clients.loginClient(
        buildSentence('código'),
        buildSentence('senha')
    );
    
    if (client) {
        commandChain.setStorage({
            client,
            database: clients
        });
        commandChain.start((commandsLabel) => {
            return ask(
                'Digite o número do comando que deseja executar\n'
                +
                commandsLabel
                .map(
                    (commandLabel, i) => `\n${i+1} - ` + commandLabel
                ).join('')
            )
        })
    } else {
        display('Credenciais inválidos');
    }
}

/**
 * Loops the function main with a 3 second delay each run
 */
function loopyMain () {
    try {
        main();
    } catch (err) {
        console.error(err);
    }
    display('Restarting Program in 3 seconds after you clicked the "ok" button...');
    setTimeout(loopyMain, 3000);
}
// Run
loopyMain();