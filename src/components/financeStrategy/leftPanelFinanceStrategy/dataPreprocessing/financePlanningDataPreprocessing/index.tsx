import { IWealthToolFormDataType } from 'src/redux/store'
// X axis time data calculation import
import { longestPeriod } from './time'
// Draw Chart import
// import DrawChart from './drawChart'
// Interest series
import { investSeries } from './investment'
// Spending series
import { spendingSeries } from './spending'
import { recurringProfit } from './recurringProfit'
import BoxDetailAge, {
    IBoxDetailAgeData,
} from '../../leftPanelPlan/financePlanning/boxDetails/boxDetailAge'
import BoxDetailInvestment, {
    IBoxDetailInvestmentData,
} from '../../leftPanelPlan/financePlanning/boxDetails/boxDetailInvestment'
import { IBoxDetailGoalData } from '../../leftPanelPlan/financePlanning/boxDetails/boxDetailGoal'

export interface IChartDataPreprocessing {
    getValues: IWealthToolFormDataType
}
export interface IDataSeries {
    year: number
    value: number
}
interface ITimeData {
    period: number
}

// Column Chart Data
export interface IColumnChartSeriesData {
    investment?: Array<IDataSeries>
    spending?: Array<IDataSeries>
}

// Line Chart Data
export interface IAreaChartSeriesData {
    recurringProfit: Array<IDataSeries>
}

// Chart Series Data
export interface IChartDrawSeriesData {
    timeData: Array<number>
    investmentData: Array<number>
    spendingData: Array<number>
    recurringProfitData: Array<number>
}

export interface IChartSeriesData {
    column: IColumnChartSeriesData
    area: IAreaChartSeriesData
}

const financePlanningChartsDataPreprocessing = (
    boxDetailInvest: IBoxDetailInvestmentData,
    boxDetailGoal: IBoxDetailGoalData,
    boxDetailAge: IBoxDetailAgeData
): IChartSeriesData => {
    if (BoxDetailAge === undefined && BoxDetailInvestment === undefined)
        throw new Error('Invalid data')
    const age = Number(boxDetailAge.age)
    const chartSeriesData: IChartSeriesData = {
        column: {},
        area: { recurringProfit: [] },
    }
    // Longest period
    const longestPeriodData = longestPeriod(boxDetailInvest, boxDetailGoal, age)
    chartSeriesData.column.investment = investSeries(
        boxDetailInvest,
        longestPeriodData,
        age
    )

    chartSeriesData.column.spending = spendingSeries(
        boxDetailGoal,
        longestPeriodData,
        age
    )

    chartSeriesData.area.recurringProfit = recurringProfit(
        age,
        longestPeriodData,
        chartSeriesData.column
    )

    return chartSeriesData
}

export default financePlanningChartsDataPreprocessing
