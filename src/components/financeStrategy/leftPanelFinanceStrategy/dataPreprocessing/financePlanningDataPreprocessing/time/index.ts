import { IBoxDetailInvestmentData } from '../../../leftPanelPlan/financePlanning/boxDetails/boxDetailInvestment'
import { IBoxDetailGoalData } from '../../../leftPanelPlan/financePlanning/boxDetails/boxDetailGoal'

export const longestPeriod = (
    boxDetailInvest: IBoxDetailInvestmentData,
    boxDetailGoal: IBoxDetailGoalData,
    currentAge: number
): number => {
    var longestPeriod = 0
    if (boxDetailGoal.educationBox !== undefined) {
        const educationBox = boxDetailGoal.educationBox

        const maxAgeEducationBox: number = Math.max(
            ...educationBox.map(
                (item) => Number(item.age) + Number(item.collegeTime)
            )
        )

        longestPeriod =
            longestPeriod >= maxAgeEducationBox
                ? longestPeriod
                : maxAgeEducationBox
    }

    if (boxDetailGoal.shoppingBox !== undefined) {
        const shoppingBox = boxDetailGoal.shoppingBox

        const maxAgeShoppingBox: number = Math.max(
            ...shoppingBox.map((item) => item.age)
        )

        longestPeriod =
            longestPeriod >= maxAgeShoppingBox
                ? longestPeriod
                : maxAgeShoppingBox
    }

    if (boxDetailInvest.annuallyInvestmentBox !== undefined) {
        const annuallyInvestment = boxDetailInvest.annuallyInvestmentBox

        const maxAgeAnnuallyInvestment: number = Math.max(
            ...annuallyInvestment.map(
                (item) => Number(item.period) + Number(item.age)
            )
        )

        longestPeriod =
            longestPeriod >= maxAgeAnnuallyInvestment
                ? longestPeriod
                : maxAgeAnnuallyInvestment
    }

    if (boxDetailInvest.oneTimeInvestmentBox !== undefined) {
        const oneTimeInvestment = boxDetailInvest.oneTimeInvestmentBox

        const maxAgeOneTimeInvestment: number = Math.max(
            ...oneTimeInvestment.map((item) => item.age)
        )

        longestPeriod =
            longestPeriod >= maxAgeOneTimeInvestment
                ? longestPeriod
                : maxAgeOneTimeInvestment
    }

    return longestPeriod - currentAge + 1
}
