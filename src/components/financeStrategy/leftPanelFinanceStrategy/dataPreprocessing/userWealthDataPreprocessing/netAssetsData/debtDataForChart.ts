import { type } from 'os'
import { IDataType } from '..'
import { IDebt } from '../../../leftPanelPlan/userWealth/boxDetails/boxDetailNetAssets/debt'

export const debtDataForChart = (debt: IDebt[]): IDataType[] => {
    const debtChartData: IDataType[] = []
    if (debt !== undefined)
        for (var data of debt)
            debtChartData.push({
                type: data.debtType,
                value: data.value,
            })
    return debtChartData
}
