import {
    Typography,
    TextField,
    FormControl,
    Select,
    MenuItem,
    Box,
} from '@mui/material'
import React from 'react'
import { Controller, UseFormGetValues } from 'react-hook-form'
import { IBoxDetailList } from '../..'
import { useTranslation } from 'react-i18next'
import { IWealthToolFormData } from 'src/features/users/WealthToolSlice'

interface IBoxDetailListForIncome extends IBoxDetailList {
    getValues: UseFormGetValues<IWealthToolFormData>
}

const IncomeList = ({
    control,
    index,
    name,
    getValues,
}: IBoxDetailListForIncome) => {
    const { t } = useTranslation('wealth_tool')

    const titleProperty = (title: string) => {
        switch (title) {
            case 'car':
                return t(
                    'finance_strategy.your_assets.monthly_saving.income.cardList.car'
                )
            case 'house':
                return t(
                    'finance_strategy.your_assets.monthly_saving.income.cardList.house'
                )
            case 'stock':
                return t(
                    'finance_strategy.your_assets.monthly_saving.income.cardList.stock'
                )
            case 'cash':
                return t(
                    'finance_strategy.your_assets.monthly_saving.income.cardList.cash'
                )
            case 'wage':
                return t(
                    'finance_strategy.your_assets.monthly_saving.income.cardList.wage'
                )
            case 'business':
                return t(
                    'finance_strategy.your_assets.monthly_saving.income.cardList.business'
                )
        }
    }
    return (
        <>
            <Typography
                variant="body1"
                color="text.secondary"
                fontWeight={'bold'}
            >
                {titleProperty(
                    getValues(
                        `userWealth.monthlySaving.income.${index}.incomeType`
                    )
                )}
            </Typography>

            <Box
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    paddingTop: '10px',
                }}
            >
                <Controller
                    name={`${name}.${index}.value`}
                    control={control}
                    rules={{
                        required: 'Mandatory',
                        min: {
                            value: 0,
                            message: 'Greater than 0',
                        },
                    }}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => (
                        <TextField
                            style={{
                                width: '60px',
                                top: '-6px',
                            }}
                            type="number"
                            id="Input"
                            variant="standard"
                            required
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            error={!!error}
                            helperText={error ? error.message : ''}
                        />
                    )}
                />
                <Typography
                    variant="body1"
                    color="text.secondary"
                    fontWeight={'bold'}
                >
                    {t(
                        'finance_strategy.your_assets.monthly_saving.income.cardList.sip_every'
                    )}
                </Typography>

                <Controller
                    name={`${name}.${index}.period`}
                    control={control}
                    defaultValue={''}
                    rules={{
                        required: 'Mandatory',
                        max: {
                            value: 100,
                            message: 'Smaller than 100',
                        },
                        min: {
                            value: 0,
                            message: 'Greater than 0',
                        },
                    }}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => (
                        <FormControl
                            variant="standard"
                            sx={{
                                width: '80px',
                                top: '-6px',
                                margin: '0 5px 0 10px',
                            }}
                        >
                            <Select value={value} onChange={onChange}>
                                <MenuItem value={'month'}>
                                    {t(
                                        'finance_strategy.your_assets.monthly_saving.income.cardList.month_select'
                                    )}
                                </MenuItem>
                                <MenuItem value={'year'}>
                                    {t(
                                        'finance_strategy.your_assets.monthly_saving.income.cardList.year_select'
                                    )}
                                </MenuItem>
                            </Select>
                        </FormControl>
                    )}
                />
            </Box>
        </>
    )
}

export default IncomeList
