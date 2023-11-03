import React from 'react'
import { Box, Stack } from '@mui/material'
import BoxDetails from './boxDetails'
import BoxNoted from './boxNote'
import { IFormControlFinanceStrategy } from 'src/components/financeStrategy'
import { IBoxDetailAgeData } from './boxDetails/boxDetailAge'
import { IBoxDetailGoalData } from './boxDetails/boxDetailGoal'
import { IBoxDetailInvestmentData } from './boxDetails/boxDetailInvestment'

export interface IFinancePlanningData {
    age: IBoxDetailAgeData
    goal: IBoxDetailGoalData
    investment: IBoxDetailInvestmentData
}

const FinancePlanning: React.ComponentType<IFormControlFinanceStrategy> = ({
    control,
    name,
    getValues,
    setValue,
    handleSubmit
}) => {
    return (
        <Stack spacing={3}>
            <BoxNoted />

            <Box className="tab_wrapper_plan_data">
                <Stack spacing={2}>
                    <BoxDetails
                        name={'financePlanning'}
                        control={control}
                        getValues={getValues}
                        setValue={setValue}
                        handleSubmit={handleSubmit}
                    />
                </Stack>
            </Box>
        </Stack>
    )
}

export default FinancePlanning
