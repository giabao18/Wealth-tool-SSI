import { IUserInvestCardData } from 'src/components/wealthtoolForm/userFinanceGoal/Card/userInvestCard'
import { IUserFinanceStatusData } from 'src/components/wealthtoolForm/userFinanceStatus'
import { IDataSeries } from '..'
import { IBoxDetailInvestmentData } from '../../../leftPanelPlan/financePlanning/boxDetails/boxDetailInvestment'


export const investSeries = (
    data: IBoxDetailInvestmentData,
    longestPeriod: number,
    currentAge: number
): Array<IDataSeries> => {
    const investmentData: IDataSeries[] = Array.from(
        { length: longestPeriod },
        (_, index) => ({
            year: Number(currentAge) + index,
            value: 0,
        })
    )
    var savingMoney: number
    // Sort Array Object
    if (data.annuallyInvestmentBox !== undefined) {
        for (const item of data.annuallyInvestmentBox) {
            if (item.checkBox != false) {
                const index = investmentData.findIndex(
                    (temp) => temp.year === Number(item.age)
                )
                savingMoney =
                    item.periodicInvestment === 'month'
                        ? Number(item.savingMoney) * 12
                        : Number(item.savingMoney)
                for (var i = 1; i <= item.period; i++) {
                    if (index !== -1)
                        investmentData[index + i].value += savingMoney
                }
            }
        }
    }
    if (data.oneTimeInvestmentBox !== undefined) {
        for (const item of data.oneTimeInvestmentBox) {
            if (item.checkBox != false) {
                const index = investmentData.findIndex(
                    (temp) => temp.year === Number(item.age)
                )

                if (index !== -1) {
                    investmentData[index].value += Number(
                        item.initialInvestAmount
                    )
                }
            }
        }
    }

    return investmentData
}
