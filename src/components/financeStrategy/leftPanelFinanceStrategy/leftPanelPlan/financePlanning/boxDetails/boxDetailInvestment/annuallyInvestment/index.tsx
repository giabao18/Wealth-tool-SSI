import React from 'react'
import {
    Typography,
    Box,
    TextField,
    FormControl,
    MenuItem,
    Select,
} from '@mui/material'
import { Controller } from 'react-hook-form'
import { IBoxDetailInvestment } from '..'
import { useTranslation } from 'react-i18next'

export interface IAnnuallyInvestmentBox {
    savingMoney: number
    period: number
    age: number
    periodicInvestment: string
    checkBox: boolean
}

const AnnuallyInvestment: React.ComponentType<IBoxDetailInvestment> = ({
    name,
    control,
    index,
    field,
    getValues,
}) => {
    const { t } = useTranslation('wealth_tool')

    return (
        <>
            <Typography
                variant="body1"
                color="text.secondary"
                fontWeight={'bold'}
            >
                {t('finance_strategy.your_plan.box_invest.sip_text')}
            </Typography>

            <Box
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    paddingTop: '10px',
                }}
            >
                <Controller
                    name={`${name}.${index}.savingMoney`}
                    control={control}
                    defaultValue={''}
                    rules={{
                        required: t('invalid.mandatory'),
                        max: {
                            value: 1000000,
                            message: t('invalid.max_value') + '1,000,000',
                        },
                        min: {
                            value: 1,
                            message: t('invalid.min_value') + '1',
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
                    {t('finance_strategy.your_plan.box_invest.sip_every')}
                </Typography>
                <Controller
                    name={`${name}.${index}.periodicInvestment`}
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
                                        'finance_strategy.your_plan.box_invest.month_input'
                                    )}
                                </MenuItem>

                                <MenuItem value={'year'}>
                                    {t(
                                        'finance_strategy.your_plan.box_invest.year_input'
                                    )}
                                </MenuItem>
                            </Select>
                        </FormControl>
                    )}
                />

                <Typography
                    variant="body1"
                    color="text.secondary"
                    fontWeight={'bold'}
                >
                    {t('finance_strategy.your_plan.box_invest.sip_time_text')}
                </Typography>
                <Controller
                    name={`${name}.${index}.period`}
                    defaultValue={''}
                    control={control}
                    rules={{
                        required: t('invalid.mandatory'),
                        max: {
                            value: 100,
                            message: t('invalid.max_value'),
                        },
                        min: {
                            value: 1,
                            message: t('invalid.min_value'),
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
                <Controller
                    name={`${name}.${index}.periodicInvestment`}
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
                                        'finance_strategy.your_plan.box_invest.month_input'
                                    )}
                                </MenuItem>

                                <MenuItem value={'year'}>
                                    {t(
                                        'finance_strategy.your_plan.box_invest.year_input'
                                    )}
                                </MenuItem>
                            </Select>
                        </FormControl>
                    )}
                />
                <Typography
                    variant="body1"
                    color="text.secondary"
                    fontWeight={'bold'}
                >
                    {t('finance_strategy.your_plan.box_invest.sip_period_text')}
                </Typography>
                <Controller
                    name={`${name}.${index}.age`}
                    control={control}
                    defaultValue={''}
                    rules={{
                        required: t('invalid.mandatory'),
                        max: {
                            value: 100,
                            message: t('invalid.max_value') + ' 100',
                        },
                        min: {
                            value: Number(getValues('financePlanning.age')),
                            message:
                                t('invalid.age_value') +
                                ' ' +
                                Number(getValues('financePlanning.age')),
                        },
                    }}
                    render={({
                        field: { onBlur, onChange, value },
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
                    component={'span'}
                    color="text.secondary"
                    fontWeight={'bold'}
                >
                    {t('finance_strategy.your_plan.yo')}
                </Typography>
            </Box>
        </>
    )
}

export default AnnuallyInvestment
