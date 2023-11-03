import { Stack, Box } from '@mui/material'
import BoxDetailInvestment from './boxDetailInvestment'
import BoxDetailAge from './boxDetailAge'
import BoxDetailGoal from './boxDetailGoal'
import { IFormControlFinanceStrategy } from 'src/components/financeStrategy'
import { Handshake } from '@mui/icons-material'


const BoxDetails: React.ComponentType<IFormControlFinanceStrategy> = ({
    control,
    name,
    getValues,
    setValue,
    handleSubmit,
}) => {
    // Box Detail Investment
    return (
        <Stack spacing={2}>
            <BoxDetailInvestment
                name={`${name}.investment`}
                control={control}
                getValues={getValues}
                setValue={setValue}
                handleSubmit={handleSubmit}
            />
            <BoxDetailGoal
                name={`${name}.goal`}
                control={control}
                getValues={getValues}
                setValue={setValue}
                handleSubmit={handleSubmit}
            />
            <BoxDetailAge
                name={`${name}.age`}
                control={control}
                getValues={getValues}
                setValue={setValue}
                handleSubmit={handleSubmit}
            />
        </Stack>
    )
}

export default BoxDetails
