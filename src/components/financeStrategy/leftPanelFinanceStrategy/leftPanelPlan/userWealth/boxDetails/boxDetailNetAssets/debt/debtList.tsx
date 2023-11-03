import React, { useState } from 'react'
import { IBoxDetailList } from '../..'
import {
    Typography,
    Box,
    TextField,
    FormControl,
    Select,
    MenuItem,
} from '@mui/material'
import { Controller, UseFormGetValues } from 'react-hook-form'
import { LocalizationProvider, DatePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { useTranslation } from 'react-i18next'
import { IWealthToolFormData } from 'src/features/users/WealthToolSlice'

interface IBoxDetailListForDebt extends IBoxDetailList {
    showField: boolean
    getValues: UseFormGetValues<IWealthToolFormData>
}

const DebtList = ({
    name,
    control,
    index,
    showField,
    getValues,
}: IBoxDetailListForDebt) => {
    const { t } = useTranslation('wealth_tool')
    return (
        <>
            <Typography
                variant="body1"
                color="text.secondary"
                fontWeight={'bold'}
            >
                {t(
                    'finance_strategy.your_assets.net_assets.debt.cardList.title'
                )}
                {getValues(`userWealth.netAssets.debt.${index}.debtType`)}
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
                    defaultValue={''}
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
                {t(
                    'finance_strategy.your_assets.net_assets.debt.cardList.sip_millions'
                )}
            </Box>

            {showField && (
                <Box
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        paddingTop: '10px',
                    }}
                >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Controller
                            name={`${name}.debt.${index}.date`}
                            control={control}
                            defaultValue={''}
                            render={({
                                field: { value, onChange },
                                fieldState: { error },
                            }) => (
                                <DatePicker
                                    label="select date"
                                    onChange={onchange}
                                />
                            )}
                        />
                    </LocalizationProvider>
                    {t(
                        'finance_strategy.your_assets.net_assets.debt.cardList.sip_interest_rate'
                    )}
                    <Controller
                        name={`${name}.${index}.rate`}
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
                    {t(
                        'finance_strategy.your_assets.net_assets.debt.cardList.sip_every'
                    )}
                    <Controller
                        name={`${name}.${index}.period`}
                        control={control}
                        defaultValue={''}
                        render={({ field: { value, onChange } }) => (
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
                                            'finance_strategy.your_assets.net_assets.debt.cardList.month_select'
                                        )}
                                    </MenuItem>
                                    <MenuItem value={'year'}>
                                        {t(
                                            'finance_strategy.your_assets.net_assets.debt.cardList.year_select'
                                        )}
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />
                    {t(
                        'finance_strategy.your_assets.net_assets.debt.cardList.sip_pay'
                    )}
                    <Controller
                        name={`${name}.${index}.type`}
                        control={control}
                        defaultValue={''}
                        render={({ field: { value, onChange } }) => (
                            <FormControl
                                variant="standard"
                                sx={{
                                    width: '160px',
                                    top: '-6px',
                                    margin: '0 5px 0 10px',
                                }}
                            >
                                <Select value={value} onChange={onChange}>
                                    <MenuItem value={'principleAndInterest'}>
                                        {t(
                                            'finance_strategy.your_assets.net_assets.debt.cardList.principal_interest_select'
                                        )}
                                    </MenuItem>
                                    <MenuItem value={'principle'}>
                                        {t(
                                            'finance_strategy.your_assets.net_assets.debt.cardList.principal_select'
                                        )}
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />
                    {t(
                        'finance_strategy.your_assets.net_assets.debt.cardList.sip_in'
                    )}
                    <Controller
                        name={`${name}.${index}.dueDate`}
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
                    {t(
                        'finance_strategy.your_assets.net_assets.debt.cardList.sip_months'
                    )}
                </Box>
            )}
        </>
    )
}

export default DebtList
