import ReactApexChart from 'react-apexcharts'
import { useTranslation } from 'react-i18next'
import { debtDataForChart } from 'src/components/financeStrategy/leftPanelFinanceStrategy/dataPreprocessing/userWealthDataPreprocessing/netAssetsData/debtDataForChart'
import { IDebt } from 'src/components/financeStrategy/leftPanelFinanceStrategy/leftPanelPlan/userWealth/boxDetails/boxDetailNetAssets/debt'

interface IDebtChart {
    debtData: IDebt[]
}

const DebtChart = ({ debtData }: IDebtChart) => {
    var debtLabels: string[] = [],
        debtSeries: number[] = []

    const debtDataProcessing = debtDataForChart(debtData)

    console.log(debtDataProcessing)
    // Spending Chart data
    for (var debt of debtDataProcessing) {
        debtLabels.push(debt.type)
        debtSeries.push(Number(debt.value))
    }

    return (
        <ReactApexChart
            type="donut"
            series={debtSeries}
            options={{
                chart: {
                    width: 350,
                    stacked: false,
                },
                labels: debtLabels,
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
export default DebtChart
