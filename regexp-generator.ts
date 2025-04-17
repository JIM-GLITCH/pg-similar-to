import { Range, BaseRegExpVisitor, IRegExpAST, RegExpAstPart, RegExpPattern, RegExpFlags, Disjunction, Alternative, Assertion, Character, Set, Group, GroupBackReference, Quantifier } from "@chevrotain/regexp-to-ast";
import { matches } from "lodash-es"
export class RegExpGenerator implements BaseRegExpVisitor {
    visitChildren(node: IRegExpAST): void {
        for (const key in node) {
            const child = (node as any)[key];
            /* istanbul ignore else */
            if (node.hasOwnProperty(key)) {
                if (child.type !== undefined) {
                    this.visit(child);
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
        return this.visit(node.value);
    }
    visitFlags(node: RegExpFlags): string {
        throw new Error("Method not implemented.");
    }
    visitDisjunction(node: Disjunction): string {
        const parts = node.value.map(x => this.visit(x));
        return `${parts.join("|")}`;
    }
    visitAlternative(node: Alternative): string {
        const parts = node.value.map(x => this.visit(x));
        return parts.join("");
    }
    visitStartAnchor(node: Assertion): string {
        throw new Error("Method not implemented.");
    }
    visitEndAnchor(node: Assertion): string {
        throw new Error("Method not implemented.");
    }
    visitWordBoundary(node: Assertion): string {
        throw new Error("Method not implemented.");
    }
    visitNonWordBoundary(node: Assertion): string {
        throw new Error("Method not implemented.");
    }
    visitLookahead(node: Assertion): string {
        throw new Error("Method not implemented.");
    }
    visitNegativeLookahead(node: Assertion): string {
        throw new Error("Method not implemented.");
    }
    visitCharacter(node: Character): string {
        // https://www.postgresql.org/docs/current/functions-matching.html#:~:text=Like%20LIKE%2C%20the,POSIX%20regular%20expressions).
        function transformCharacter(c: string) {
            if (c === "_") {
                return '.';
            }
            if (c === "%") {
                return '.*';
            }
            if (c === '.') {
                return String.raw`\.`;
            }
            return c;
        }
        let c = transformCharacter(String.fromCodePoint(node.value));

        const quantifier = this.tryVisitQuatifier(node.quantifier);
        return `${c}${quantifier}`;

    }
    visitSet(node: Set): string {
        if (matches<Partial<Set>>({
            type: "Set",
            complement: true,
            value: [cc("\n"), cc("\r"), cc("\u2028"), cc("\u2029")],
            quantifier: {
                type: "Quantifier",
                atLeast: 0,
                atMost: Infinity,
                greedy: false,
            } as Quantifier
        })(node)) {
            return '.*'
        }
        const quantifier = this.tryVisitQuatifier(node.quantifier);

        let content = ""

        if (matches<Partial<Set>>({
            type: "Set",
            complement: true,
            value: [cc("\n"), cc("\r"), cc("\u2028"), cc("\u2029")],
        })(node)) {
            return `.${quantifier}`
        } else {
            const parts = node.value.map(x => {
                if (typeof x === "number") {
                    return String.fromCodePoint(x);
                } else {
                    return `${String.fromCodePoint(x.from)}-${String.fromCodePoint(x.to)}`;
                }
            });
            content = parts.join("");
        }




        if (node.complement == true) {
            return `[^${content}]${quantifier}`;
        } else {
            return `[${content}]${quantifier}`;
        }
    }
    visitGroup(node: Group): string {
        const quantifier = this.tryVisitQuatifier(node.quantifier);
        const content = this.visit(node.value);
        return `(?:${content})${quantifier}`;
    }
    visitGroupBackReference(Node: GroupBackReference): string {
        throw new Error("Method not implemented.");
    }
    visitQuantifier(Node: Quantifier): string {
        let res = ""
        const { atLeast, atMost, greedy } = Node;
        if (atLeast === 0 && atMost === undefined) {
            res = "*";
        }
        else if (atLeast === 1 && atMost === undefined) {
            res = "+";
        }
        else if (atLeast === 0 && atMost === 1) {
            res = "?";
        }
        else if (atMost === Infinity) {
            res = `{${atLeast},}`;
        }
        else if (atLeast === atMost) {
            res = `{${atLeast}}`;
        } else {
            res = `{${atLeast},${atMost}}`;
        }

        if (greedy === false) {
            res = `${res}?`;
        }
        return res
    }
    tryVisitQuatifier(node: Quantifier | undefined) {
        if (node === undefined) {
            return "";
        }
        return this.visit(node);
    }

}
function cc(char: string): number | Range {
    const num = char.codePointAt(0)
    if (num === undefined) {
        throw Error(`${char} codepoint is undefined`)
    }
    return num
}

