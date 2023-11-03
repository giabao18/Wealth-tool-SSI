import { IUserWealthDataReduxType } from 'src/redux/store'
import { IUserWealthDataForChart } from 'src/components/financeStrategy/chart/userWealthPlanningChart'
import { incomeDataForChart } from './monthlySavingData/incomeDataForChart'
import { spendingDataForChart } from './monthlySavingData/spendingDataForChart'
import { debtDataForChart } from './netAssetsData/debtDataForChart'
import { propertyDataForChart } from './netAssetsData/propertyDataForChart'
export interface IDataType {
    type: string
    value: number
}

const userWealthChartDataPreprocessing = ({
    income,
    spending,
    debt,
    property,
}: IUserWealthDataReduxType): IUserWealthDataForChart => {
    console.log('income', income)
    return {
        incomeData: income.length != 0 ? incomeDataForChart(income) : undefined,
        spendingData:
            spending !== undefined ? spendingDataForChart(spending) : undefined,
        propertyData:
            property !== undefined ? propertyDataForChart(property) : undefined,
        debtData: debt != undefined ? debtDataForChart(debt) : undefined,
    }
}

export default userWealthChartDataPreprocessing
