import React, { useContext } from 'react'
import { IFormControlFinanceStrategy } from 'src/components/financeStrategy'
import BoxMonthlySaving, { IMonthlySaving } from './boxDetailMonthlySaving'
import BoxDetailNetAssets, { INetAssets } from './boxDetailNetAssets'
import Stack from '@mui/material/Stack/Stack'
import { useFieldArray, useWatch } from 'react-hook-form'
import CalcNetAssets from './boxDetailNetAssets/calc/calcNetAssets'
import calcMonthlySaving from './boxDetailMonthlySaving/calc/calcMonthlySaving'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { IIncome } from './boxDetailMonthlySaving/income'
import { ISpending } from './boxDetailMonthlySaving/spending'
import { IDebt } from './boxDetailNetAssets/debt'
import { IProperty } from './boxDetailNetAssets/property'

export interface IUserWealthData {
    monthlySaving: IMonthlySaving
    netAssets: INetAssets
}
export interface IBoxDetailList {
    name: string
    control: any
    index: number
}

export interface IIconType {
    type: string
    icon: string
}

const BoxDetails: React.ComponentType<IFormControlFinanceStrategy> = ({
    control,
    name,
    getValues,
    setValue,
    handleSubmit,
}) => {
    // UseFieldArray
    const {
        remove: spendingRemove,
        append: spendingAppend,
        fields: spendingFields,
    } = useFieldArray({
        control,
        name: 'userWealth.monthlySaving.spending',
    })

    const {
        remove: incomeRemove,
        append: incomeAppend,
        fields: incomeFields,
    } = useFieldArray({
        control,
        name: 'userWealth.monthlySaving.income',
    })
    const {
        remove: debtRemove,
        append: debtAppend,
        fields: debtFields,
    } = useFieldArray({
        control,
        name: 'userWealth.netAssets.debt',
    })
    const {
        remove: propertyRemove,
        append: propertyAppend,
        fields: propertyFields,
    } = useFieldArray({
        control,
        name: 'userWealth.netAssets.property',
    })
    //useWatch
    const debtData: IDebt[] = useWatch({
        name: 'userWealth.netAssets.debt',
        control,
    })

    const propertyData: IProperty[] = useWatch({
        name: 'userWealth.netAssets.property',
        control,
    })

    // monthlySaving
    const incomeData: IIncome[] = useWatch({
        name: 'userWealth.monthlySaving.income',
        control,
    })

    const spendingData: ISpending[] = useWatch({
        name: 'userWealth.monthlySaving.spending',
        control,
    })

    // netAssets
    const netAssetsValue = CalcNetAssets({
        debt: debtData,
        property: propertyData,
    })
    // monthlySaving
    const monthlySavingValue = calcMonthlySaving({
        income: incomeData,
        spending: spendingData,
        netAssetsValue: netAssetsValue,
    })

    return (
        <Stack spacing={2}>
            <BoxDetailNetAssets
                name={`${name}.netAssets`}
                control={control}
                getValues={getValues}
                setValue={setValue}
                handleSubmit={handleSubmit}
                incomeAppend={incomeAppend}
                incomeRemove={incomeRemove}
                incomeFields={incomeFields}
                propertyAppend={propertyAppend}
                propertyFields={propertyFields}
                propertyRemove={propertyRemove}
                spendingRemove={spendingRemove}
                spendingAppend={spendingAppend}
                spendingFields={spendingFields}
                debtAppend={debtAppend}
                debtFields={debtFields}
                debtRemove={debtRemove}
                netAssetsValue={netAssetsValue}
            />
            <BoxMonthlySaving
                name={`${name}.monthlySaving`}
                control={control}
                getValues={getValues}
                setValue={setValue}
                handleSubmit={handleSubmit}
                incomeAppend={incomeAppend}
                incomeFields={incomeFields}
                incomeRemove={incomeRemove}
                spendingAppend={spendingAppend}
                spendingFields={spendingFields}
                spendingRemove={spendingRemove}
                debtRemove={debtRemove}
                propertyRemove={propertyRemove}
                monthlySavingValue={monthlySavingValue}
            />
        </Stack>
    )
}

export default BoxDetails
