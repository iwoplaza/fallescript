import { LetStatement } from './let';

export enum StatementType {
    LET_STATEMENT = 'LET_STATEMENT',
    ASSIGN_STATEMENT = 'ASSIGN_STATEMENT',
}

export type Statement = LetStatement;

export interface StatementParserOutput {
    statement?: Statement;
    error?: string;
}

export interface StatementParser {
    pattern: RegExp,
    construct(input: string, match: string[]): StatementParserOutput|null
}