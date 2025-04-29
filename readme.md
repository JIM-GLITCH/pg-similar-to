# Introduction
Transform postgres `similar to` operator pattern to regexp pattern

# Bundle
```
yarn run tsup
```

# Usage
main.test.ts
```ts
import { describe, expect, it } from "vitest"
import { compileSimilarToPatternToRegExpPattern } from "."
describe("compileSimilarToPatternToRegExpPattern", () => {
    it("any should warp with ^ and $", () => {
        const res = compileSimilarToPatternToRegExpPattern("")
        console.log(res)
        expect(res).toBe('^(?:)$')
    })
    it("% should compile to .*", () => {
        const res = compileSimilarToPatternToRegExpPattern("%")
        console.log(res)
        expect(res).toBe('^(?:.*)$')
    })
    it("_ should compile to .", () => {
        const res = compileSimilarToPatternToRegExpPattern("_")
        console.log(res)
        expect(res).toBe('^(?:.)$')
    })
    it("| should compile to |", () => {
        const res = compileSimilarToPatternToRegExpPattern("|")
        console.log(res)
        expect(res).toBe('^(?:|)$')
    })
    it("chinese should compile to cheninese", () => {
        const res = compileSimilarToPatternToRegExpPattern("汉字")
        console.log(res)
        expect(res).toBe('^(?:汉字)$')
    })
    it("charSet should compile to charSet", () => {
        const res = compileSimilarToPatternToRegExpPattern("[123-45]")
        console.log(res)
        expect(res).toBe('^(?:[123-45])$')
    })
})
```