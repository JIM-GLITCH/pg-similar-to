import { match } from "arktype"
import { describe, it } from "vitest"
describe("similarTo", () => {
    it("should match", () => {
        const discriminateValue = match
            // .in allows you to specify the input TypeScript allows for your matcher
            // .at allows you to specify a key at which your input will be matched
            // .match({
            //     1: o => `${(o as any).oneValue}!`,
            //     2: o => (o as any).twoValue.length,
            //     default: "assert"
            // })
            .case({ id: 1 } as any, o => `${(o as any).oneValue}!`)
            .default(o => (o as any).twoValue.length)
        console.log(discriminateValue({ id: 1, oneValue: 1 })) // "1!"
        discriminateValue({ id: 2, twoValue: "two" }) // 3
        discriminateValue({ oneValue: 3 })
    })
})