import { IColumnChartSeriesData, IDataSeries } from '..'
import { interestRate } from './interestRate'


export const recurringProfit = (
    currentAge: number,
    longestPeriod: number,
    columnChartSeriesData: IColumnChartSeriesData
): Array<IDataSeries> => {
    const recurringProfitSeries: IDataSeries[] = Array.from(
        { length: longestPeriod },
        (_, index) => ({
            year: Number(currentAge) + index,
            value: 0,
        })
    )
    const investmentSeries = columnChartSeriesData.investment
    const spendingSeries = columnChartSeriesData.spending

    if (investmentSeries !== undefined) {
        for (var i = 0; i < longestPeriod; i++) {
            if (spendingSeries !== undefined) {
                if (i == 0)
                    recurringProfitSeries[i].value += Math.floor(
                        investmentSeries[i].value - spendingSeries[i].value
                    )
                else
                    recurringProfitSeries[i].value += Math.floor(
                        investmentSeries[i].value -
                            spendingSeries[i].value +
                            recurringProfitSeries[i - 1].value *
                                (1 + interestRate.banking / 100)
                    )
            } else {
                if (i == 0)
                    recurringProfitSeries[i].value += Math.floor(
                        investmentSeries[i].value
                    )
                else
                    recurringProfitSeries[i].value += Math.floor(
                        recurringProfitSeries[i - 1].value *
                            (1 + interestRate.banking / 100) +
                            investmentSeries[i].value
                    )
            }
        }
        return recurringProfitSeries
    } else throw new Error('Invest Fields are not allowed to empty')
}
