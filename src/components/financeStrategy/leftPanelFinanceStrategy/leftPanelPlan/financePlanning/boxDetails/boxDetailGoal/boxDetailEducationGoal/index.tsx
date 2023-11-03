import React from 'react'
import { Typography, Box, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import { IBoxDetailGoal } from '..'
import { useTranslation } from 'react-i18next'

export interface IEducationBox {
    age: number
    collegeTime: number
    tuitionFees: number
    checkBox: boolean
}

const BoxDetailEducation: React.ComponentType<IBoxDetailGoal> = ({
    name,
    control,
    field,
    index,
    getValues,
}) => {
    // language

    const { t } = useTranslation('wealth_tool')
    return (
        <>
            <Typography
                variant="body1"
                color="text.secondary"
                fontWeight={'bold'}
            >
                {t('finance_strategy.your_plan.box_goal.user_education_text')}
            </Typography>

            <Box
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    paddingTop: '10px',
                }}
            >
                <Controller
                    name={`${name}.${index}.age`}
                    control={control}
                    rules={{
                        required: t('invalid.mandatory'),
                        max: {
                            value: 100,
                            message: t('invalid.max_value') + '100',
                        },
                        min: {
                            value: Number(getValues('financePlanning.age')),
                            message:
                                t('invalid.min_value') +
                                Number(getValues('financePlanning.age')),
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
                        'finance_strategy.your_plan.box_goal.value_education_period'
                    )}
                </Typography>
                <Controller
                    name={`${name}.${index}.collegeTime`}
                    control={control}
                    rules={{
                        required: t('invalid.mandatory'),
                        max: {
                            value: 100,
                            message: t('invalid.max_value') + '100',
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
                    {t(
                        'finance_strategy.your_plan.box_goal.value_education_each_month'
                    )}
                </Typography>
                <Controller
                    name={`${name}.${index}.tuitionFees`}
                    control={control}
                    rules={{
                        required: t('invalid.mandatory'),
                        max: {
                            value: 1000000,
                            message: t('invalid.max_value') + '1,000,000',
                        },
                        min: {
                            value: 2,
                            message:
                                t('invalid.min_value') +
                                2 +
                                t('invalid.million'),
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
                    {t('finance_strategy.your_plan.box_goal.million')}
                </Typography>
            </Box>
        </>
    )
}

export default BoxDetailEducation
