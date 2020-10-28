import { Expression } from '../syntax/expression/expression';
import { Statement, StatementType } from '../syntax/statement/statement';

interface Variable {
    identifier: string;
    type: string;
    value: number;
}

export class Interpreter {
    private variableDictionary: {[key: string]: Variable} = {};

    constructor() {}

    executeStatement(statement: Statement) {
        if (statement.type === StatementType.LET_STATEMENT) {
            let record = this.variableDictionary[statement.identifier];

            if (record !== undefined) {
                console.error(`Cannot redeclare '${statement.identifier}'`);
                return;
            }

            record = this.variableDictionary[statement.identifier] = {
                type: statement.type,
                identifier: statement.identifier,
                value: statement.value,
            };
        }
    }

    executeExpression(expression: Expression) {

    }
}