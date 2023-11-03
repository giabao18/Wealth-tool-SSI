import { useWatch } from 'react-hook-form'
import './UserWealthChart.scss'
import userWealthChartDataPreprocessing, {
    IDataType,
} from '../../leftPanelFinanceStrategy/dataPreprocessing/userWealthDataPreprocessing'
import { IIncome } from '../../leftPanelFinanceStrategy/leftPanelPlan/userWealth/boxDetails/boxDetailMonthlySaving/income'
import { ISpending } from '../../leftPanelFinanceStrategy/leftPanelPlan/userWealth/boxDetails/boxDetailMonthlySaving/spending'
import { IDebt } from '../../leftPanelFinanceStrategy/leftPanelPlan/userWealth/boxDetails/boxDetailNetAssets/debt'
import { IProperty } from '../../leftPanelFinanceStrategy/leftPanelPlan/userWealth/boxDetails/boxDetailNetAssets/property'
import { IFormControl } from 'src/pages/wealthTool'
import IncomeChart from './monthlySavingChart/incomeChart'
import SpendingChart from './monthlySavingChart/spendingChart'
import { Box, Stack, Typography } from '@mui/material'
import PropertyChart from './netAssetsChart/propertyChart'
import DebtChart from './netAssetsChart/debtChart'
import { useTranslation } from 'react-i18next'
import { Container } from '@mui/system'

export interface IUserWealthDataForChart {
    incomeData?: IDataType[]
    spendingData?: IDataType[]
    propertyData?: IDataType[]
    debtData?: IDataType[]
}

const UserWealthChart = ({ name, control }: IFormControl) => {
    const { t } = useTranslation('wealth_tool')
    const debtData: IDebt[] = useWatch({
        name: 'userWealth.netAssets.debt',
        control,
    })

    const propertyData: IProperty[] = useWatch({
        name: 'userWealth.netAssets.property',
        control,
    })

    // monthlySaving

    const spendingData: ISpending[] = useWatch({
        name: 'userWealth.monthlySaving.spending',
        control,
    })

    const incomeData: IIncome[] = useWatch({
        name: 'userWealth.monthlySaving.income',
        control,
    })

    return (
        <Box className="chart">
            <div className="draw">
                {incomeData != undefined && (
                    <>
                        <Typography className="title">
                            {t(
                                'finance_strategy.right_panel.userWealth_chart.income_chart'
                            )}
                        </Typography>
                        <IncomeChart incomeData={incomeData} />
                    </>
                )}
            </div>
            <div className="draw">
                {propertyData != undefined && (
                    <>
                        <Typography className="title">
                            {t(
                                'finance_strategy.right_panel.userWealth_chart.netAssets_chart'
                            )}
                        </Typography>
                        <PropertyChart propertyData={propertyData} />
                    </>
                )}
            </div>

            <div className="draw">
                {spendingData !== undefined && (
                    <>
                        <Typography className="title">
                            {t(
                                'finance_strategy.right_panel.userWealth_chart.spending_chart'
                            )}
                        </Typography>
                        <SpendingChart spendingData={spendingData} />
                    </>
                )}
            </div>
            <div className="draw">
                {debtData !== undefined && (
                    <>
                        <Typography className="title">
                            {t(
                                'finance_strategy.right_panel.userWealth_chart.debt_chart'
                            )}
                        </Typography>
                        <DebtChart debtData={debtData} />
                    </>
                )}
            </div>
        </Box>
    )
}

export default UserWealthChart
