import { describe, it } from "vitest";
import {
    AST,
    RegExpParser,
    RegExpValidator,
    parseRegExpLiteral,
    validateRegExpLiteral,
    visitRegExpAST
} from "regexpp"
describe('regexpp.test.ts', () => {
    it('should pass', () => {
        const res = new RegExpParser().parsePattern('/a/')
        console.log(res)
    });

})