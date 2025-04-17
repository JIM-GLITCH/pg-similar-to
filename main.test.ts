import { describe, expect, it } from "vitest"
import { compileSimilarToPatternToRegExpPattern } from "."
describe("compileSimilarToPatternToRegExpPattern", () => {
    it("should warp with ^ and $", () => {
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

describe("some cases", () => {
    const patterns = `%会诊记录%
%死亡病例讨论%
%抢救记录%
%手术记录%
%手术记录%
%手术风险评估表%
%(24小时内入院死亡记录|二十四小时内入院死亡记录|出院记录|死亡记录)%
%(阶段小结|((交接|转入|转出|交班|接班)记录))%
%病程记录%
%(日常病程记录|首次病程记录|入出院记录|查房记录)%
%输血%同意书%
%知情告知书%入院%
%抢救记录%
%((医师%查房记录)|病程记录)%
%((医师%查房记录)|病程记录)%
%疑难病例讨论%
%疑难病例讨论%
%首次病程记录%
%抢救记录%
%手术记录%
%反应报告%
%麻醉%同意书%
%手术安全核查表%
%一次性高值医用耗材使用同意书%
%危急值%记录%
%危急值%记录%
%危急值%记录%
%危急值%记录%
%危急值%记录%
%危急值%记录%
%危急值%记录%
%危急值%记录%
%危急值%记录%
%危急值%记录%
%危急值%记录%
%危急值%记录%
%(病程记录|查房记录|阶段小结)%
%危急值%记录%
%危急值%记录%
%危急值%记录%
%危急值%记录%
%危急值%记录%
%危急值%记录%
%(营养风险筛查|营养不良)%
%(病程记录|查房记录|阶段小结|((交接|转入|转出|交班|接班)记录))%
%((交接|转入|转出|交班|接班)记录)%
自动出院或转院告知书
%会诊记录%
%会诊记录%
%麻醉记录%
%(丙型肝炎抗病毒|乙型肝炎抗病毒|人工肝支持|人工肝血浆置换术|微波治疗|急性心梗静脉溶栓|抗结核治疗|支气管镜检查|支气管镜检|支气管镜检查|无创机械通气|气管切开术|气管插管和机械通|液基薄层细胞检测|特殊检查及治疗|电复律|病理细针针吸细胞学穿刺|硬质气管镜手|结肠镜检|肿瘤免疫治|胃镜|胃镜检|腹水回|艾滋病抗病毒|血液透|静脉临时性置管)%(通知书|同意书|告知书|申请单)%
%疑难病例讨论%
%住院期间病情评估%
%入院病情评估%
%危急值%记录%
%危急值%记录%
%危急值%记录%
%危急值%记录%
%危急值%记录%
%危急值%记录%
%危急值%记录%
%危急值%记录%
%危急值%记录%
%危急值%记录%
%危急值%记录%
%危急值%记录%
%危急值%记录%
%危急值%记录%
%危急值%记录%
%危急值%记录%
%危急值%记录%
%转出记录%
%危急值%记录%
%危急值%记录%
%危急值%记录%
%危急值%记录%
%危急值%记录%
%(病程记录|查房记录|阶段小结)%
%(病程记录|查房记录|阶段小结)%
%转入记录%
%输血%记录%
%输血前评估%
%(出院病情评估|入出院记录)%
%(穿刺|手术)%记录%
%术前%讨论|术前小结%
%((穿刺%同意书)|ICU气管插管知情同意书|剖宫产知情同意书|新生儿疾病筛查知情同意书|气管切开手术同意书|深静脉置管术知情同意书|胎盘处理告知、处置单|胸腔闭式引流术知情同意书|阴道分娩知情同意书|腹水回输%同意书|(术%同意书))%
%术前%讨论|术前小结%
%输血后评价%
%术前%讨论|术前小结%
%术前%讨论|术前小结%
%术前小结%
%病程记录%
%(手术同意书|手术知情同意书|((术|介入|镜|剖宫产|麻醉|穿刺|回输)%知情同意书))%
%手术记录%
%(病危|病重)%(告知|通知)书%
%(出院记录|死亡记录)%
%(24小时内入出院记录|二十四小时内入出院记录|出院记录|死亡记录)%
%死亡记录%
%危急值%记录%
%(入院记录|入出院记录)%`.split("\n")
    patterns.forEach(x => console.log(compileSimilarToPatternToRegExpPattern(x)))
})