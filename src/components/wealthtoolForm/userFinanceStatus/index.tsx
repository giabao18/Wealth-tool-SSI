import React from 'react'
import { Controller } from 'react-hook-form'
import Assets from 'src/assets'
import {
    Select,
    TextField,
    Typography,
    MenuItem,
    FormControl,
    CardMedia,
    Card,
    CardContent,
    Box,
} from '@mui/material'
import { IFormControl } from 'src/pages/wealthTool'
import { useTranslation } from 'react-i18next'

export interface IUserFinanceStatusData {
    savingMoney: number
    periodicInvestment: string
    initialInvestmentAmount: number
}

const UserFinanceStatus: React.ComponentType<IFormControl> = ({
    control,
    name,
}) => {
    const { t } = useTranslation('wealth_tool')
    return (
        <React.Fragment>
            <Card className="indicator" sx={{ maxWidth: 'md' }}>
                <CardMedia
                    sx={{ width: '112px', height: '112px' }}
                    component="img"
                    className="media"
                    image={Assets.UserFinanceStatus}
                    alt={'finance status image'}
                />
                <CardContent className="indicator_content">
                    <Box className="indicator_text" m={1}>
                        <Typography
                            component="span"
                            variant="h6"
                            className="input"
                        >
                            {t('user_goal.finance_status.user_saving_text')}
                        </Typography>
                        <Controller
                            name={`${name}.savingMoney`}
                            control={control}
                            defaultValue="10"
                            rules={{
                                required: t('invalid.mandatory'),
                                max: {
                                    value: 1000000,
                                    message:
                                        t('invalid.max_value') +
                                        '1,000,000' +
                                        t('invalid.million'),
                                },
                                min: {
                                    value: 1,
                                    message:
                                        t('invalid.min_value') +
                                        '1' +
                                        t('invalid.million'),
                                },
                            }}
                            render={({
                                field: { onBlur, onChange, value },
                                fieldState: { error },
                            }) => (
                                <TextField
                                    type="number"
                                    variant="standard"
                                    inputProps={{
                                        style: {
                                            textAlign: 'center',
                                            width: '100px',
                                            fontWeight: 'bold',
                                        },
                                    }}
                                    required
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    helperText={error ? error.message : ''}
                                    error={!!error}
                                />
                            )}
                        />
                        <Typography
                            component="span"
                            variant="h6"
                            className="input"
                        >
                            {t('user_goal.finance_status.million')}
                        </Typography>
                        <Controller
                            name={`${name}.periodSavingMoney`}
                            control={control}
                            defaultValue={'month'}
                            render={({ field: { value, onChange } }) => (
                                <FormControl
                                    variant="standard"
                                    sx={{
                                        width: '110px',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Select
                                        value={value}
                                        onChange={onChange}
                                        sx={{ fontWeight: 'bold' }}
                                    >
                                        <MenuItem value={'month'}>
                                            {t(
                                                'user_goal.finance_status.month_input'
                                            )}
                                        </MenuItem>
                                        <MenuItem value={'year'}>
                                            {t(
                                                'user_goal.finance_status.year_input'
                                            )}
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        />
                        <Typography
                            component="span"
                            variant="h6"
                            className="input"
                        >
                            {t('user_goal.finance_status.user_asset_text')}
                        </Typography>
                    </Box>
                    <Box className="indicator_text" m={1}>
                        <Controller
                            name={`${name}.initialInvestmentAmount`}
                            control={control}
                            defaultValue="30"
                            rules={{
                                required: t('invalid.mandatory'),
                                max: {
                                    value: 1000000,
                                    message:
                                        t('invalid.max_value') +
                                        '1,000,000' +
                                        t('invalid.million'),
                                },
                                min: {
                                    value: 1,
                                    message:
                                        t('invalid.min_value') +
                                        '1' +
                                        t('invalid.million'),
                                },
                            }}
                            render={({
                                field: { onBlur, onChange, value },
                                fieldState: { error },
                            }) => (
                                <TextField
                                    type="number"
                                    variant="standard"
                                    name={`${name}.idle_balances`}
                                    inputProps={{
                                        style: {
                                            textAlign: 'center',
                                            width: '100px',
                                            fontWeight: 'bold',
                                        },
                                    }}
                                    required
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    helperText={error ? error.message : ''}
                                    error={!!error}
                                />
                            )}
                        />
                        <Typography
                            component="span"
                            variant="h6"
                            className="input invest"
                        >
                            {t('user_goal.finance_status.user_invest_text')}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

export default UserFinanceStatus
