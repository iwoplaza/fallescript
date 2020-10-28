export enum ParserErrorType {
    ERROR,
}

export interface ParserContext {
    logError(message: string): void;
    hasErrors(): boolean;
    clearErrors(): void;
}

export function createParserContext(): ParserContext {
    let hasErrors = false;

    return {
        logError(message: string) {
            console.error(`[SYNTAX ERROR] ${message}`);
            hasErrors = true;
        },
        hasErrors() {
            return hasErrors;
        },
        clearErrors() {
            hasErrors = false;
        }
    };
}