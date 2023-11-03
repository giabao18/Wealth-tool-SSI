import { IDataType } from '..'
import { IProperty } from '../../../leftPanelPlan/userWealth/boxDetails/boxDetailNetAssets/property'

export const propertyDataForChart = (property: IProperty[]): IDataType[] => {
    const propertyChartData: IDataType[] = [
        { type: 'cash', value: 0 },
        { type: 'stock', value: 0 },
        { type: 'car', value: 0 },
        { type: 'house', value: 0 },
    ]

    if (property !== undefined) {
        for (var item of property) {
            propertyChartData.find((data, index) => {
                if (item.propertyType === data.type)
                    data.value += Number(item.value)
            })
        }
    }
    return propertyChartData
}
