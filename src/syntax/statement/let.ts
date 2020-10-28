import { Token, TokenType } from '../../tokenizer/token';
import { ParserContext } from '../parserContext';
import { Statement, StatementType } from './statement';

export interface LetStatement {
    type: StatementType.LET_STATEMENT;
    identifier: string;
    value: number;
}

export function letParser(tokens: Token[], context: ParserContext): LetStatement|null {
    const identifierToken = tokens.pop();
    
    if (identifierToken === undefined) {
        context.logError(`No identifier specified`);
        return null;
    }

    if (identifierToken.type !== TokenType.IDENTIFIER) {
        context.logError(`No identifier provided after 'let'`);
        return null;
    }

    let token = tokens.pop();

    if (token === undefined) {
        context.logError(`No value specified for '${identifierToken.value}'`);
        return null;
    }

    if (token.type === TokenType.OPERATOR_ASSIGN) {
        let valueToken = tokens.pop();

        if (valueToken === undefined) {
            context.logError(`No value specified for '${identifierToken.value}'`);
            return null;
        }

        if (valueToken.type !== TokenType.LITERAL_INT) {
            context.logError(`Value assigned to '${identifierToken.value}' has to be an integer literal`);
            return null;
        }

        return {
            type: StatementType.LET_STATEMENT,
            identifier: identifierToken.value,
            value: valueToken.value,
        };
    }

    context.logError(`No value assigned to '${identifierToken.value}'`);
    return null;
};