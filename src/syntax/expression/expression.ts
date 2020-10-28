export enum ExpressionType {
    LITERAL = 'LITERAL',
    FUNCTION_CALL = 'FUNCTION_CALL',
    OPERATOR = 'OPERATOR',
}

export interface Expression {
    type: ExpressionType;
}

export interface ExpressionParserOutput {
    expression?: Expression;
    error?: string;
}

export interface ExpressionParser {
    pattern: RegExp,
    construct(input: string, match: (string|undefined)[]): ExpressionParserOutput|null
}