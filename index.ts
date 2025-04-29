import { SimilarToPatternParser } from "./similar-to-regexp-parser"
import { RegExpGenerator } from "./regexp-generator"

const similarToPatternParser = new SimilarToPatternParser()
const regexpGenerator = new RegExpGenerator()
// const RegExpGenerator = new RegExpGenerator()
export function compileSimilarToPatternToRegExpPattern(pattern: string) {
    const ast = similarToPatternParser.pattern(`/${pattern}/`)
    const similarToPattern = regexpGenerator.visit(ast)
    return `^(?:${similarToPattern})$`
}

