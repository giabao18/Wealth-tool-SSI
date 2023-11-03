import ReactApexChart from 'react-apexcharts'
import { useTranslation } from 'react-i18next'
import { propertyDataForChart } from 'src/components/financeStrategy/leftPanelFinanceStrategy/dataPreprocessing/userWealthDataPreprocessing/netAssetsData/propertyDataForChart'
import { IProperty } from 'src/components/financeStrategy/leftPanelFinanceStrategy/leftPanelPlan/userWealth/boxDetails/boxDetailNetAssets/property'

interface IPropertyChart {
    propertyData: IProperty[]
}

const PropertyChart = ({ propertyData }: IPropertyChart) => {
    const { t } = useTranslation('wealth_tool')
    var propertyLabels: string[] = [],
        propertySeries: number[] = []

    const propertyDataProcessing = propertyDataForChart(propertyData)

    const label = (title: string) => {
        switch (title) {
            case 'car':
                return t(
                    'finance_strategy.your_assets.net_assets.property.cardList.car'
                )
            case 'house':
                return t(
                    'finance_strategy.your_assets.net_assets.property.cardList.house'
                )
            case 'stock':
                return t(
                    'finance_strategy.your_assets.net_assets.property.cardList.stock'
                )
            default:
                return t(
                    'finance_strategy.your_assets.net_assets.property.cardList.cash'
                )
        }
    }
    // Property Chart data
    for (var property of propertyDataProcessing) {
        if (property.value !== 0) {
            propertyLabels.push(label(property.type))
            propertySeries.push(property.value)
        }
    }

    return (
        <ReactApexChart
            type="donut"
            series={propertySeries}
            options={{
                chart: {
                    type:"pie",
                    width: 300,
                    height: 300,
                    stacked: false,
                },
                labels: propertyLabels,
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
export default PropertyChart
