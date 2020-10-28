import { Expression, ExpressionParser, ExpressionType } from './expression';

export type LiteralExpression = Expression & ({
    literalType: LiteralType.INTEGER;
    value: number;
} | {
    literalType: LiteralType.STRING;
    value: string;
})

export enum LiteralType {
    INTEGER = 'INTEGER',
    STRING = 'STRING',
}

export const literalParsers: ExpressionParser[] = [
    {
        pattern: new RegExp(`^\\s*([0-9]|[1-9][0-9]*)\\s*$`),
        construct(input: string, match: (string|undefined)[]) {
            const [_, textValue] = match;

            if (textValue === undefined) {
                return null;
            }

            const value = Number.parseInt(textValue);

            return {
                expression: {
                    type: ExpressionType.LITERAL,
                    literalType: LiteralType.INTEGER,
                    value,
                } as LiteralExpression,
            };
        }
    },
];