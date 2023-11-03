import { IUserEducationCardData } from 'src/components/wealthtoolForm/userFinanceGoal/Card/userEducationCard'
import { IUserShoppingCardData } from 'src/components/wealthtoolForm/userFinanceGoal/Card/userShoppingCard'
import { IDataSeries } from '..'
import { IBoxDetailGoalData } from '../../../leftPanelPlan/financePlanning/boxDetails/boxDetailGoal'

export const spendingSeries = (
    data: IBoxDetailGoalData,
    longestPeriod: number,
    currentAge: number
) => {
    const spendingSeries: IDataSeries[] = Array.from(
        { length: longestPeriod },
        (_, index) => ({
            year: Number(currentAge) + index,
            value: 0,
        })
    )

    // Education card
    if (data?.educationBox !== undefined) {
        for (const item of data?.educationBox) {
            if (item.checkBox != false) {
                const spendingYear = Number(item.age)
                const educationPeriod = Number(item.collegeTime)
                const tuitionFees = Number(item.tuitionFees)

                const index = spendingSeries.findIndex(
                    (item) => spendingYear === item.year
                )
                if (index !== -1)
                    for (var i = 0; i < educationPeriod; i++) {
                        spendingSeries[i + index].value += tuitionFees
                    }
            }
        }
    }

    // Shopping card
    if (data?.shoppingBox !== undefined) {
        for (const item of data.shoppingBox) {
            if (item.checkBox != false) {
                const spendingYear = Number(item.age)
                const index = spendingSeries.findIndex(
                    (item) => spendingYear === item.year
                )
                if (index !== -1) {
                    const price = Number(item.price)
                    spendingSeries[index].value += price
                }
            }
        }
    }
    return spendingSeries
}
