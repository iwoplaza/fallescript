import { letParser } from './statement/let';
import { Statement, StatementParser, StatementParserOutput } from './statement/statement';
import { Expression, ExpressionParser, ExpressionParserOutput} from './expression/expression';
import { literalParsers } from './expression/literal';
import { Token, TokenType } from '../tokenizer/token';
import { ParserContext } from './parserContext';

export function parseStatement(tokens: Token[], context: ParserContext): Statement|null {
    const firstToken = tokens.pop();
    if (firstToken === undefined) {
        return null;
    }

    if (firstToken.type === TokenType.KEYWORD_LET) {
        return letParser(tokens, context);
    }

    return null;
}

const expressionParsers: ExpressionParser[] = [
    ...literalParsers,
];

export function parseExpression(input: string, context: ParserContext): Expression|null {
    return null;
}

interface FalleProgram {
    statements: Statement[];
}