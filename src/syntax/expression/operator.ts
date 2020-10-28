import { Expression, ExpressionParser, ExpressionType } from './expression';

export interface OperatorExpression extends Expression {
    operator: Operator;
    lhs: Expression;
    rhs: Expression;
}

export enum Operator {
    ADD = 'ADD',
    SUBTRACT = 'SUBTRACT',
}

export const operatorParsers: ExpressionParser[] = [
    {
        pattern: new RegExp(`^\\s*\\s*$`),
        construct(input: string, match: (string|undefined)[]) {
            const [_, textValue] = match;

            if (textValue === undefined) {
                return null;
            }

            const value = Number.parseInt(textValue);

            return {
                expression: {
                    type: ExpressionType.OPERATOR,
                    operator: Operator.ADD,
                } as OperatorExpression,
            };
        }
    },
];