import { IDataType } from '..'
import { ISpending } from '../../../leftPanelPlan/userWealth/boxDetails/boxDetailMonthlySaving/spending'

export const spendingDataForChart = (spending: ISpending[]): IDataType[] => {
    const spendingChartData: IDataType[] = [
        { type: 'family', value: 0 },
        { type: 'investment', value: 0 },
        { type: 'debt', value: 0 },
    ]

    if (spending !== undefined)
        for (var item of spending) {
            spendingChartData.find((data, index) => {
                if (item.spendingPurpose === data.type)
                    data.value += Number(item.value)
            })
        }

    return spendingChartData
}
