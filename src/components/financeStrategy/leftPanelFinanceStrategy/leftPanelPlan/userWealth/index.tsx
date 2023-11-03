import React from 'react'
import { Box, Stack } from '@mui/material'
import BoxNoted from './boxNote'
import BoxDetails from './boxDetails'
import { IFormControlFinanceStrategy } from 'src/components/financeStrategy'

const UserWealth: React.ComponentType<IFormControlFinanceStrategy> = ({
    control,
    name,
    getValues,
    setValue,
    handleSubmit,
}) => {
    return (
        <Stack spacing={3}>
            <BoxNoted />

            <Box className="tab_wrapper_plan_data">
                <BoxDetails
                    name={'userWealth'}
                    control={control}
                    getValues={getValues}
                    setValue={setValue}
                    handleSubmit={handleSubmit}
                />
            </Box>
        </Stack>
    )
}
export default UserWealth
