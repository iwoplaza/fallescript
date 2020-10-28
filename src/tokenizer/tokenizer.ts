import { Token, TokenType } from './token';

interface TokenDescription {
    pattern: RegExp;
    make: (match: string[]) => Token;
}

const tokenDescriptions: TokenDescription[] = [
    {
        pattern: /^\s*\+/,
        make: () => ({ type: TokenType.OPERATOR_ADD }),
    },
    {
        pattern: /^\s*:/,
        make: () => ({ type: TokenType.COLON }),
    },
    {
        pattern: /^\s*=/,
        make: () => ({ type: TokenType.OPERATOR_ASSIGN }),
    },
    {
        pattern: /^\s*let\b/,
        make: () => ({ type: TokenType.KEYWORD_LET }),
    },
    {
        pattern: /^\s*([1-9][0-9]*|[0-9])\b/,
        make: (match) => ({ type: TokenType.LITERAL_INT, value: parseInt(match[0].trim()) }),
    },
    {
        pattern: /^\s*([A-Za-z_]\w*)/,
        make: (match) => ({ type: TokenType.IDENTIFIER, value: match[0].trim() }),
    },
];

const onlyWhitespace = /^\s*$/;

export function tokenize(input: string): Token[] {
    const tokens: Token[] = [];
    let s = input.slice();

    while (s != null) {
        let matched = false;

        for (const tokenDesc of tokenDescriptions) {
            const match = tokenDesc.pattern.exec(s);

            if (match !== null) {
                s = s.substr(match[0].length);

                tokens.push(tokenDesc.make(match));
                matched = true;
            }
        }

        if (onlyWhitespace.test(s)) {
            break;
        }

        if (!matched) {
            console.error(`Couldn't tokenize the input.`);
            break;
        }
    }

    return tokens.reverse();
}