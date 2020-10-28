import chalk from 'chalk';
//import ora from 'ora';
import meow from 'meow';
import readline from 'readline';
import config from '../package.json';
import { Interpreter } from './interpreter/interpreter';
import { createParserContext } from './syntax/parserContext';
import { parseExpression, parseStatement } from './syntax/syntaxTree';
import { tokenize } from './tokenizer/tokenizer';

console.log(chalk.blue('--FalleScript--') + chalk.gray(` v${config.version}`));

const promptInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function waitForCommand(): Promise<string> {
    return new Promise((resolve, reject) => promptInterface.question('> ', (answer) => {
        resolve(answer);
    }));
}

const cli = meow(`
    Usage
        $ falle <entry point>

    Options
        --version, -v Prints out the version of FalleScript being used.

    Examples
        $ falle
`);

async function run() {
    const intepreter = new Interpreter();

    while (true) {
        const answer = await waitForCommand();
        const tokens = tokenize(answer);

        console.log(tokens);

        const context = createParserContext();
        const statement = parseStatement(tokens, context);

        if (context.hasErrors()) {
            context.clearErrors();
            continue;
        }

        if (statement !== null) {
            console.log(statement);
            intepreter.executeStatement(statement);
        }
        else {
            const expression = parseExpression(answer, context);

            if (expression === null) {
                console.error('Invalid code');
                continue;
            }

            console.log(expression);
            intepreter.executeExpression(expression);
        }
    }
}

run();

//const spinner = ora('Compiling...').start();