import { Alternative, Assertion, BaseRegExpVisitor, Character, Disjunction, Group, GroupBackReference, IRegExpAST, Quantifier, RegExpAstPart, RegExpFlags, RegExpParser, RegExpPattern, Set } from "@chevrotain/regexp-to-ast"
const regexpPaser = new RegExpParser()
const baseRegExpVisitor = new BaseRegExpVisitor()
function similarTo(text: string, pattern: string) {
    const regexpStr = compileSimilarToPatternToRegExpPattern(pattern)
    // return RegExp(regexpStr).test(text)
}
export function compileSimilarToPatternToRegExpPattern(pattern: string) {
    const ast = regexpPaser.pattern(`/${pattern}/`)
    const similarToPattern = baseRegExpVisitor.visit(ast)
}
async function main() {
    let parser = new RegExpParser()
    let ast = parser.pattern('/[^1-2]/')
}

function useArray<T>() {
    const arr: T[] = []
    function accept(e: T) {
        arr.push(e)
    }
    return [arr, accept]
}

class similarToPatternGenerator implements BaseRegExpVisitor {
    visitChildren(node: IRegExpAST): void {
        const parts: string[] = []
        function accept(part: string) {
            return parts.push(part)
        }
        for (const key in node) {
            const child = (node as any)[key];
            /* istanbul ignore else */
            if (node.hasOwnProperty(key)) {
                if (child.type !== undefined) {
                    accept(this.visit(child));
                } else if (Array.isArray(child)) {
                    child.map((subChild) => {
                        return this.visit(subChild);
                    }, this);
                }
            }
        }
    }
    public visit(node: RegExpAstPart): string {
        switch (node.type) {
            case "Pattern":
                return this.visitPattern(node);
                break;
            case "Flags":
                return this.visitFlags(node);
                break;
            case "Disjunction":
                return this.visitDisjunction(node);
                break;
            case "Alternative":
                return this.visitAlternative(node);
                break;
            case "StartAnchor":
                return this.visitStartAnchor(node);
                break;
            case "EndAnchor":
                return this.visitEndAnchor(node);
                break;
            case "WordBoundary":
                return this.visitWordBoundary(node);
                break;
            case "NonWordBoundary":
                return this.visitNonWordBoundary(node);
                break;
            case "Lookahead":
                return this.visitLookahead(node);
                break;
            case "NegativeLookahead":
                return this.visitNegativeLookahead(node);
                break;
            case "Character":
                return this.visitCharacter(node);
                break;
            case "Set":
                return this.visitSet(node);
                break;
            case "Group":
                return this.visitGroup(node);
                break;
            case "GroupBackReference":
                return this.visitGroupBackReference(node);
                break;
            case "Quantifier":
                return this.visitQuantifier(node);
                break;
        }

        this.visitChildren(node);
    }

    visitPattern(node: RegExpPattern): string {
        return this.visit(node.value)
    }
    visitFlags(node: RegExpFlags): string {
        throw new Error("Method not implemented.")
    }
    visitDisjunction(node: Disjunction): string {
        const parts = node.value.map(x => this.visit(x))
        return `(?:${parts.join("|")})`
    }
    visitAlternative(node: Alternative): string {
        const parts = node.value.map(x => this.visit(x))
        return parts.join("")
    }
    visitStartAnchor(node: Assertion): string {
        throw new Error("Method not implemented.")
    }
    visitEndAnchor(node: Assertion): string {
        throw new Error("Method not implemented.")
    }
    visitWordBoundary(node: Assertion): string {
        throw new Error("Method not implemented.")
    }
    visitNonWordBoundary(node: Assertion): string {
        throw new Error("Method not implemented.")
    }
    visitLookahead(node: Assertion): string {
        throw new Error("Method not implemented.")
    }
    visitNegativeLookahead(node: Assertion): string {
        throw new Error("Method not implemented.")
    }
    visitCharacter(node: Character): string {
        // https://www.postgresql.org/docs/current/functions-matching.html#:~:text=Like%20LIKE%2C%20the,POSIX%20regular%20expressions).
        function transformCharacter(c: string) {
            if (c === "_") {
                return '.'
            }
            if (c === "%") {
                return '.*'
            }
            if (c === '.') {
                return String.raw`\.`
            }
            return c
        }
        let c = transformCharacter(String.fromCodePoint(node.value))

        const quantifier = this.tryVisitQuatifier(node.quantifier)
        return `${c}${quantifier}`

    }
    visitSet(node: Set): string {
        const quantifier = this.tryVisitQuatifier(node.quantifier)
        const parts = node.value.map(x => {
            if (typeof x === "number") {
                return String.fromCodePoint(x)
            } else {
                return `${String.fromCodePoint(x.from)}-${String.fromCodePoint(x.to)}`
            }
        })
        const content = parts.join("")
        if (node.complement == true) {
            return `[^${content}]${quantifier}`
        } else {
            return `[${content}]${quantifier}`
        }
    }
    visitGroup(node: Group): string {
        const quantifier = this.tryVisitQuatifier(node.quantifier)
        const content = this.visit(node.value)
        return `(?:${content})${quantifier}`
    }
    visitGroupBackReference(Node: GroupBackReference): string {
        throw new Error("Method not implemented.")
    }
    visitQuantifier(Node: Quantifier): string {
        
    }
    tryVisitQuatifier(node: Quantifier | undefined) {
        if (node === undefined) {
            return ""
        }
        return this.visit(node)
    }

}