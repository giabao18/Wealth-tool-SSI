import { Box, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'
import BoxDetailDebt, { IDebt } from './debt'
import { IFormControlFinanceStrategy } from 'src/components/financeStrategy'
import {
    FieldValues,
    UseFieldArrayAppend,
    UseFieldArrayRemove,
} from 'react-hook-form'
import BoxDetailProperty, { IProperty } from './property'
export interface INetAssets {
    debt: IDebt[]
    debtDialog: IDebt
    property: IProperty[]
    propertyDialog: IProperty
}

interface IBoxDetailNetAssets extends IFormControlFinanceStrategy {
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
    debtAppend: UseFieldArrayAppend<FieldValues, 'userWealth.netAssets.debt'>
    debtRemove: UseFieldArrayRemove
    debtFields: Record<'id', string>[]
    propertyAppend: UseFieldArrayAppend<
        FieldValues,
        'userWealth.netAssets.property'
    >
    propertyRemove: UseFieldArrayRemove
    propertyFields: Record<'id', string>[]
    netAssetsValue: number
}

const BoxDetailNetAssets = ({
    name,
    control,
    setValue,
    getValues,
    handleSubmit,
    spendingAppend,
    spendingRemove,
    spendingFields,
    incomeAppend,
    incomeRemove,
    incomeFields,
    propertyAppend,
    propertyFields,
    propertyRemove,
    debtAppend,
    debtFields,
    debtRemove,
    netAssetsValue,
}: IBoxDetailNetAssets) => {
    const { t } = useTranslation('wealth_tool')

    return (
        <Stack>
            <BoxDetailProperty
                name={`${name}.property`}
                control={control}
                handleSubmit={handleSubmit}
                setValue={setValue}
                getValues={getValues}
                incomeAppend={incomeAppend}
                incomeRemove={incomeRemove}
                incomeFields={incomeFields}
                propertyAppend={propertyAppend}
                propertyFields={propertyFields}
                propertyRemove={propertyRemove}
            />
            <BoxDetailDebt
                name={`${name}.debt`}
                control={control}
                handleSubmit={handleSubmit}
                setValue={setValue}
                getValues={getValues}
                spendingFields={spendingFields}
                spendingRemove={spendingRemove}
                spendingAppend={spendingAppend}
                debtAppend={debtAppend}
                debtFields={debtFields}
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
                {t('finance_strategy.your_assets.net_assets.calculate')}
                <span>
                    <span style={{ fontSize: '20px' }}>{netAssetsValue}</span>
                    {t('finance_strategy.your_assets.net_assets.millions')}
                </span>
            </Box>
        </Stack>
    )
}

export default BoxDetailNetAssets
