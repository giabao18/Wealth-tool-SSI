import { Box, Stack } from '@mui/material'
import React, { useMemo } from 'react'
import BoxDetailIncome, { IIncome } from './income'
import BoxDetailSpending, { ISpending } from './spending'
import { IFormControlFinanceStrategy } from 'src/components/financeStrategy'
import { useTranslation } from 'react-i18next'
import {
    FieldValues,
    UseFieldArrayAppend,
    UseFieldArrayRemove,
    useWatch,
} from 'react-hook-form'

export interface IMonthlySaving {
    income: IIncome[]
    incomeDialog: IIncome
    spending: ISpending[]
    spendingDialog: ISpending
}

interface IBoxMonthlySaving extends IFormControlFinanceStrategy {
    spendingAppend: UseFieldArrayAppend<
        FieldValues,
        'userWealth.monthlySaving.spending'
    >
    spendingRemove: UseFieldArrayRemove
    spendingFields: Record<'id', string>[]
    incomeAppend: UseFieldArrayAppend<
        FieldValues,
        'userWealth.monthlySaving.income'
    >
    incomeRemove: UseFieldArrayRemove
    incomeFields: Record<'id', string>[]
    debtRemove: UseFieldArrayRemove
    propertyRemove: UseFieldArrayRemove
    monthlySavingValue: number
}

const BoxMonthlySaving = ({
    name,
    control,
    setValue,
    getValues,
    handleSubmit,
    incomeAppend,
    incomeRemove,
    incomeFields,
    spendingAppend,
    spendingFields,
    spendingRemove,
    debtRemove,
    propertyRemove,
    monthlySavingValue,
}: IBoxMonthlySaving) => {
    const { t } = useTranslation('wealth_tool')

    return (
        <Stack>
            <BoxDetailIncome
                name={`${name}.income`}
                control={control}
                setValue={setValue}
                getValues={getValues}
                handleSubmit={handleSubmit}
                incomeAppend={incomeAppend}
                incomeFields={incomeFields}
                incomeRemove={incomeRemove}
                propertyRemove={propertyRemove}
            />

            <BoxDetailSpending
                name={`${name}.spending`}
                control={control}
                setValue={setValue}
                getValues={getValues}
                handleSubmit={handleSubmit}
                spendingAppend={spendingAppend}
                spendingFields={spendingFields}
                spendingRemove={spendingRemove}
                debtRemove={debtRemove}
            />

            <Box
                className="calculation"
                sx={{
                    backgroundColor: '#841818',
                    color: '#E8E2E2',
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                }}
            >
                {t('finance_strategy.your_assets.monthly_saving.calculate')}
                <span>
                    <span style={{ fontSize: '20px' }}>
                        {monthlySavingValue}
                    </span>
                    {t('finance_strategy.your_assets.monthly_saving.millions')}
                </span>
            </Box>
        </Stack>
    )
}

export default BoxMonthlySaving
