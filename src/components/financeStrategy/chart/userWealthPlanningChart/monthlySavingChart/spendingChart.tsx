import ReactApexChart from 'react-apexcharts'
import { useTranslation } from 'react-i18next'
import { IDataType } from 'src/components/financeStrategy/leftPanelFinanceStrategy/dataPreprocessing/userWealthDataPreprocessing'
import { spendingDataForChart } from 'src/components/financeStrategy/leftPanelFinanceStrategy/dataPreprocessing/userWealthDataPreprocessing/monthlySavingData/spendingDataForChart'
import { ISpending } from 'src/components/financeStrategy/leftPanelFinanceStrategy/leftPanelPlan/userWealth/boxDetails/boxDetailMonthlySaving/spending'

interface ISpendingChart {
    spendingData: ISpending[]
}

const SpendingChart = ({ spendingData }: ISpendingChart) => {
    const { t } = useTranslation('wealth_tool')
    var spendingLabels: string[] = [],
        spendingSeries: number[] = []

    const spendingDataProcessing = spendingDataForChart(spendingData)

    const label = (title: string) => {
        switch (title) {
            case 'family':
                return t(
                    'finance_strategy.your_assets.monthly_saving.spending.cardList.forFamily'
                )
            case 'business':
                return t(
                    'finance_strategy.your_assets.monthly_saving.spending.cardList.forBusiness'
                )
            default:
                return title
        }
    }
    // Spending Chart data
    for (var spending of spendingDataProcessing) {
        if (spending.value !== 0) {
            spendingLabels.push(label(spending.type))
            spendingSeries.push(spending.value)
        }
    }

    return (
        <ReactApexChart
            type="donut"
            series={spendingSeries}
            options={{
                // chart: {
                //     width: 350,
                //     stacked: false,
                // },
                plotOptions: {
                    pie: {
                        donut: {
                            size: '70',
                        },
                    },
                },
                labels: spendingLabels,
                legend: {
                    show: true,
                    horizontalAlign: 'right',
                    fontSize: '15px',
                    itemMargin: {
                        vertical: 5,
                    },
                },
            }}
        />
    )
}
export default SpendingChart
