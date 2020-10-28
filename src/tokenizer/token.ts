export enum TokenType {
    LITERAL_INT = 'LITERAL_INT',
    KEYWORD_LET = 'KEYWORD_LET',
    OPERATOR_ADD = 'OPERATOR_ADD',
    OPERATOR_ASSIGN = 'OPERATOR_ASSIGN',
    IDENTIFIER = 'IDENTIFIER',
    COLON = 'COLON',
}

export interface LiteralIntToken {
    type: TokenType.LITERAL_INT;
    value: number;
}

export interface IdentifierToken {
    type: TokenType.IDENTIFIER;
    value: string;
}

export type Token = LiteralIntToken | IdentifierToken | {
    type: TokenType.KEYWORD_LET | TokenType.COLON | TokenType.OPERATOR_ADD | TokenType.OPERATOR_ASSIGN,
};