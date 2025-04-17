import { Atom, RegExpParser } from "@chevrotain/regexp-to-ast"
import { SimilarToPatternParser } from "./similar-to-regexp-parser"
import { RegExpGenerator } from "./regexp-generator"

function similarTo(text: string, pattern: string) {
    const regexpStr = compileSimilarToPatternToRegExpPattern(pattern)
    // return RegExp(regexpStr).test(text)
}
const similarToPatternParser = new SimilarToPatternParser()
const regexpGenerator = new RegExpGenerator()
// const RegExpGenerator = new RegExpGenerator()
export function compileSimilarToPatternToRegExpPattern(pattern: string) {
    const ast = similarToPatternParser.pattern(`/${pattern}/`)
    const similarToPattern = regexpGenerator.visit(ast)
    return `^${similarToPattern}$`
}


