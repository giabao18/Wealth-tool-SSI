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
import { TFunction } from 'i18next/typescript/t'

interface IBoxDetailListForDebt extends IBoxDetailList {
    showField: boolean
    getValues: UseFormGetValues<IWealthToolFormData>
}

const PropertyList = ({
    name,
    control,
    index,
    showField,
    getValues,
}: IBoxDetailListForDebt) => {
    const { t } = useTranslation('wealth_tool')

    const titleProperty = (title: string) => {
        switch (title) {
            case 'car':
                return t(
                    'finance_strategy.your_assets.net_assets.property.cardList.car'
                )
            case 'house':
                return t(
                    'finance_strategy.your_assets.net_assets.property.cardList.house'
                )
            case 'stock':
                return t(
                    'finance_strategy.your_assets.net_assets.property.cardList.stock'
                )
            case 'cash':
                return t(
                    'finance_strategy.your_assets.net_assets.property.cardList.cash'
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
                        `userWealth.netAssets.property.${index}.propertyType`
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
                    'finance_strategy.your_assets.net_assets.property.cardList.sip_millions'
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
                    {t(
                        'finance_strategy.your_assets.net_assets.property.cardList.sip_trend'
                    )}
                    <Controller
                        name={`${name}.${index}.trend`}
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
                                    <MenuItem value={'up'}>
                                        {t(
                                            'finance_strategy.your_assets.net_assets.property.cardList.up_select'
                                        )}
                                    </MenuItem>
                                    <MenuItem value={'down'}>
                                        {t(
                                            'finance_strategy.your_assets.net_assets.property.cardList.down_select'
                                        )}
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />
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
                                            'finance_strategy.your_assets.net_assets.property.cardList.month_select'
                                        )}
                                    </MenuItem>
                                    <MenuItem value={'year'}>
                                        {t(
                                            'finance_strategy.your_assets.net_assets.property.cardDialog.year_select'
                                        )}
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />
                    {t(
                        'finance_strategy.your_assets.net_assets.property.cardList.sip_approximately'
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
                        'finance_strategy.your_assets.net_assets.property.cardList.sip_each'
                    )}
                </Box>
            )}
        </>
    )
}

export default PropertyList
