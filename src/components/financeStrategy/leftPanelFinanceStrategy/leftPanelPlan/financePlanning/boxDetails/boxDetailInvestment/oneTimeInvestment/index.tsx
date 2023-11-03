import { Box, Icon, IconButton, TextField, Typography } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { IBoxDetailInvestment } from '..'

export interface IOneTimeInvestmentBox {
    initialInvestAmount: number
    age: number
    checkBox: boolean
}

const OneTimeInvestment: React.ComponentType<IBoxDetailInvestment> = ({
    control,
    index,
    field,
    getValues,
    name,
}) => {
    const { t } = useTranslation('wealth_tool')

    return (
        <React.Fragment>
            <Typography variant="body1" component={'span'} fontWeight={'bold'}>
                {t('finance_strategy.your_plan.box_invest.one_time_investment')}
            </Typography>
            <Box
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    paddingTop: '10px',
                }}
            >
                <Controller
                    name={`${name}.${index}.initialInvestAmount`}
                    defaultValue={''}
                    control={control}
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
                    {t(
                        'finance_strategy.your_plan.box_invest.invest_period_text'
                    )}
                </Typography>
                <Controller
                    name={`${name}.${index}.age`}
                    control={control}
                    defaultValue={''}
                    rules={{
                        required: t('invalid.mandatory'),
                        max: {
                            value: 100,
                            message: t('invalid.max_value'),
                        },
                        min: {
                            value: Number(getValues('financePlanning.age')),
                            message:
                                t('invalid.min_value') +
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
        </React.Fragment>
    )
}

export default OneTimeInvestment
