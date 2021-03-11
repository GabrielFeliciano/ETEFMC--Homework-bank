// ------------------------
// Building Block Functions
// ------------------------

/**
 * Ask the client for some data
 * @param {string} sentence 
 * @returns {string}
 */
export function ask (sentence) {
    return window.prompt(sentence);
}

/**
 * Display some data to the client
 * @param {string} data 
 * @returns {string}
 */
export function display (sentence) {
    window.alert(sentence);
}

/**
 * Builds a simple sentence and displays to the client
 * @param {string} data 
 * @returns {string}
 */
export function buildSentence (data) {
    const pronoun = data.endsWith('a') ? 'sua' : 'seu';
    return ask(`Digite ${pronoun} ${data}`);
}