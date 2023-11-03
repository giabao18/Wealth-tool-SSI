import { Box, Container } from '@mui/material'
import Grid from '@mui/material/Grid'
import React, { createContext, useEffect, useMemo, useState } from 'react'
import './FinanceStrategy.scss'
import {
    UseFormGetValues,
    UseFormHandleSubmit,
    UseFormSetValue,
    useWatch,
} from 'react-hook-form'
import LeftPanelFinance from './leftPanelFinanceStrategy/leftPanelPlan'

// Form Hooks
import { IWealthToolFormDataType, RootState } from 'src/redux/store'
import ChartsDataPreprocessing from './leftPanelFinanceStrategy/dataPreprocessing/financePlanningDataPreprocessing'
import { IEducationBox } from './leftPanelFinanceStrategy/leftPanelPlan/financePlanning/boxDetails/boxDetailGoal/boxDetailEducationGoal'
import { IShoppingBox } from './leftPanelFinanceStrategy/leftPanelPlan/financePlanning/boxDetails/boxDetailGoal/boxDetailShoppingGoal'
import { IBoxDetailGoalData } from './leftPanelFinanceStrategy/leftPanelPlan/financePlanning/boxDetails/boxDetailGoal'
import { IBoxDetailInvestmentData } from './leftPanelFinanceStrategy/leftPanelPlan/financePlanning/boxDetails/boxDetailInvestment'
import { IFormControl } from 'src/pages/wealthTool'
import RightPanel from './rightPanel'
import financePlanningChartsDataPreprocessing from './leftPanelFinanceStrategy/dataPreprocessing/financePlanningDataPreprocessing'
import { IIncome } from './leftPanelFinanceStrategy/leftPanelPlan/userWealth/boxDetails/boxDetailMonthlySaving/income'
import { ISpending } from './leftPanelFinanceStrategy/leftPanelPlan/userWealth/boxDetails/boxDetailMonthlySaving/spending'
import { IDebt } from './leftPanelFinanceStrategy/leftPanelPlan/userWealth/boxDetails/boxDetailNetAssets/debt'
import { IProperty } from './leftPanelFinanceStrategy/leftPanelPlan/userWealth/boxDetails/boxDetailNetAssets/property'
import { useDispatch } from 'react-redux'
import { passProps } from 'src/features/users/UserWealthSlice'
import userWealthChartDataPreprocessing from './leftPanelFinanceStrategy/dataPreprocessing/userWealthDataPreprocessing'

export interface IFormControlFinanceStrategy extends IFormControl {
    getValues: UseFormGetValues<IWealthToolFormDataType>
    setValue: UseFormSetValue<IWealthToolFormDataType>
    handleSubmit: UseFormHandleSubmit<IWealthToolFormDataType, undefined>
}

interface IDataContextUserWealth {
    income: IIncome[]
    spending: ISpending[]
    property: IProperty[]
    debt: IDebt[]
}

const FinanceStrategy: React.ComponentType<IFormControlFinanceStrategy> = ({
    control,
    name,
    getValues,
    setValue,
    handleSubmit,
}) => {

    const [tab, setTab] = useState('1')

    // Your Plan
    // set default data
    useMemo(() => {
        const currentAge: number = Number(getValues('UserInfoForm.age'))
        setValue('financePlanning.age.age', currentAge)

        // set and reset investment and spending box detail if current age
        const BoxDetailInvestment = {
            BoxDetailInvest: {
                annuallyInvestmentBox: [
                    {
                        savingMoney: Number(
                            getValues('UserFinanceStatusForm.savingMoney')
                        ),
                        period: Number(
                            getValues(
                                'UserFinanceGoalForm.UserInvestCard.period'
                            )
                        ),
                        age: currentAge,
                        periodicInvestment: 'month',
                        checkBox: true,
                    },
                ],
                oneTimeInvestmentBox: [
                    {
                        initialInvestAmount: Number(
                            getValues(
                                'UserFinanceStatusForm.initialInvestmentAmount'
                            )
                        ),
                        age: currentAge,
                        checkBox: true,
                    },
                ],
            },
        }

        if (getValues('UserFinanceGoalForm.UserShoppingCard.status')) {
            const shoppingBoxData: IShoppingBox[] = [
                {
                    age:
                        Number(
                            getValues(
                                'UserFinanceGoalForm.UserShoppingCard.period'
                            )
                        ) + currentAge,
                    price: getValues(
                        'UserFinanceGoalForm.UserShoppingCard.price'
                    ),
                    checkBox: true,
                },
            ]
            setValue('financePlanning.goal.shoppingBox', shoppingBoxData)
        }
        // eduction card status checking
        if (getValues('UserFinanceGoalForm.UserEducationCard.status')) {
            const educationBoxData: IEducationBox[] = [
                {
                    age:
                        currentAge +
                        Number(
                            getValues(
                                'UserFinanceGoalForm.UserEducationCard.period'
                            )
                        ),
                    collegeTime: getValues(
                        'UserFinanceGoalForm.UserEducationCard.collegeTime'
                    ),
                    tuitionFees: getValues(
                        'UserFinanceGoalForm.UserEducationCard.tuitionFees'
                    ),
                    checkBox: true,
                },
            ]
            setValue('financePlanning.goal.educationBox', educationBoxData)
        }

        setValue(
            'financePlanning.investment.annuallyInvestmentBox',
            BoxDetailInvestment.BoxDetailInvest.annuallyInvestmentBox
        )
        setValue(
            'financePlanning.investment.oneTimeInvestmentBox',
            BoxDetailInvestment.BoxDetailInvest.oneTimeInvestmentBox
        )
    }, [])

    return (
        <React.Fragment>
            <Container maxWidth="xl" className="finance_strategy">
                <Grid container spacing={0} className="finance_strategy_box">
                    <Grid
                        item
                        xs={4}
                        className="finance_strategy_item"
                        sx={{
                            backgroundColor: '#F6F6F6',
                            borderRight: '1px solid #d9d9d9',
                            borderTopLeftRadius: '8px',
                            borderBottomLeftRadius: '8px',
                        }}
                    >
                        <LeftPanelFinance
                            name={`${name}.leftPanel`}
                            control={control}
                            getValues={getValues}
                            setValue={setValue}
                            handleSubmit={handleSubmit}
                            tab={tab}
                            setTab={setTab}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={8}
                        className="finance_strategy_item"
                        sx={{
                            borderLeft: 'none',
                            backgroundColor: '#fff',
                            borderTopRightRadius: '8px',
                            borderBottomRightRadius: '8px',
                        }}
                    >
                        <RightPanel
                            name={`${name}.rightPanel`}
                            control={control}
                            getValues={getValues}
                            tab={tab}
                        />
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    )
}

export default FinanceStrategy
