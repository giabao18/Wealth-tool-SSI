import React, { useTransition } from 'react'
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
import { useTranslation } from 'react-i18next'
import { IWealthToolFormData } from 'src/features/users/WealthToolSlice'

interface IBoxDetailListForSpending extends IBoxDetailList {
    getValues: UseFormGetValues<IWealthToolFormData>
}

const SpendingList = ({
    control,
    index,
    name,
    getValues,
}: IBoxDetailListForSpending) => {
    const { t } = useTranslation('wealth_tool')
    const titleDebt = (title: string) => {
        switch (title) {
            case 'family':
                return t(
                    'finance_strategy.your_assets.monthly_saving.spending.cardList.forFamily'
                )
            case 'business':
                return t(
                    'finance_strategy.your_assets.monthly_saving.spending.cardList.forBusiness'
                )
            default:
                return t(
                    'finance_strategy.your_assets.monthly_saving.spending.cardList.forDebt'
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
                {t(
                    'finance_strategy.your_assets.monthly_saving.spending.cardList.title'
                )}
                {titleDebt(
                    getValues(
                        `userWealth.monthlySaving.spending.${index}.spendingPurpose`
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

                <Typography
                    variant="body1"
                    color="text.secondary"
                    fontWeight={'bold'}
                >
                    {t(
                        'finance_strategy.your_assets.monthly_saving.spending.cardList.sip_every'
                    )}
                </Typography>

                <Controller
                    name={`${name}.${index}.period`}
                    control={control}
                    defaultValue={''}
                    render={({ field: { onChange, onBlur, value } }) => (
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
                                        'finance_strategy.your_assets.monthly_saving.spending.cardList.month_select'
                                    )}
                                </MenuItem>
                                <MenuItem value={'year'}>
                                    {t(
                                        'finance_strategy.your_assets.monthly_saving.spending.cardList.year_select'
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

export default SpendingList
