import ReactApexChart from 'react-apexcharts'
import { useTranslation } from 'react-i18next'
import { IDataType } from 'src/components/financeStrategy/leftPanelFinanceStrategy/dataPreprocessing/userWealthDataPreprocessing'
import { incomeDataForChart } from 'src/components/financeStrategy/leftPanelFinanceStrategy/dataPreprocessing/userWealthDataPreprocessing/monthlySavingData/incomeDataForChart'
import { IIncome } from 'src/components/financeStrategy/leftPanelFinanceStrategy/leftPanelPlan/userWealth/boxDetails/boxDetailMonthlySaving/income'

interface IIncomeChart {
    incomeData: IIncome[]
}

const IncomeChart = ({ incomeData }: IIncomeChart) => {
    const { t } = useTranslation('wealth_tool')
    var incomeLabels: string[] = [],
        incomeSeries: number[] = []
    const label = (title: string) => {
        switch (title) {
            case 'car':
                return t(
                    'finance_strategy.your_assets.monthly_saving.income.cardList.car'
                )
            case 'house':
                return t(
                    'finance_strategy.your_assets.monthly_saving.income.cardList.house'
                )
            case 'stock':
                return t(
                    'finance_strategy.your_assets.monthly_saving.income.cardList.stock'
                )
            case 'cash':
                return t(
                    'finance_strategy.your_assets.monthly_saving.income.cardList.cash'
                )
            case 'wage':
                return t(
                    'finance_strategy.your_assets.monthly_saving.income.cardList.wage'
                )
            default:
                return t(
                    'finance_strategy.your_assets.monthly_saving.income.cardList.business'
                )
        }
    }

    const incomeDataProcessing = incomeDataForChart(incomeData)
    // Income Chart data
    for (var income of incomeDataProcessing) {
        if (income.value !== 0) {
            incomeSeries.push(income.value)
            incomeLabels.push(label(income.type))
        }
    }

    return (
        <ReactApexChart
            type="donut"
            series={incomeSeries}
            options={{
                // chart: {
                //     // height: 350,
                //     width: 200,
                //     stacked: false,
                // },
                plotOptions: {
                    pie: {
                        donut: {
                            size: '70',
                        },
                    },
                },
                labels: incomeLabels,
                dataLabels: {
                    enabled: false,
                    enabledOnSeries: undefined,
                },
                legend: {
                    show: true,
                    fontSize: '15px',
                    horizontalAlign: 'right',
                    itemMargin: {
                        vertical: 5,
                    },
                },
            }}
        />
    )
}
export default IncomeChart
