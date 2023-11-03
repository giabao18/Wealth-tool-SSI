import { IDataType } from '..'
import { IIncome } from '../../../leftPanelPlan/userWealth/boxDetails/boxDetailMonthlySaving/income'

export const incomeDataForChart = (income: IIncome[]): IDataType[] => {
    const incomeChartData: IDataType[] = [
        { type: 'wage', value: 0 },
        { type: 'business', value: 0 },
        { type: 'cash', value: 0 },
        { type: 'stock', value: 0 },
        { type: 'car', value: 0 },
        { type: 'house', value: 0 },
    ]

        for (var item of income) {
            incomeChartData.find((data, index) => {
                if (item.incomeType === data.type)
                    data.value += Number(item.value)
            })
        }
        return incomeChartData
}
