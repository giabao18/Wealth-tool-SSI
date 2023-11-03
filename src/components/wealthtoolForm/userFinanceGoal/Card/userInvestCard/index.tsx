import React, { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import {
    CardMedia,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    Typography,
} from '@mui/material'
import Assets from 'src/assets'

import { IFormControl } from 'src/pages/wealthTool'
import { IWealthToolFormDataType } from 'src/redux/store'
import { useTranslation } from 'react-i18next'

export interface IUserInvestCardData {
    status: boolean
    period: number
}

const UserInvestGoal: React.ComponentType<IFormControl> = ({
    control,
    name,
}) => {
    //Language
    const { t } = useTranslation('wealth_tool')

    return (
        <Grid container spacing={2} className="dialog">
            <Grid item xs={12}>
                <DialogTitle className="dialog_title">
                    {t('user_goal.finance_goal.invest_form.title')}
                </DialogTitle>
            </Grid>
            <Grid item xs={12}>
                <div className="dialog_image">
                    <CardMedia
                        className="media"
                        component="img"
                        alt="investment"
                        image={Assets.InvestCard}
                    />
                </div>
                <DialogContent
                    className="dialog_content"
                    sx={{ marginTop: '24px' }}
                >
                    <Typography
                        variant="h6"
                        className="dialog_content"
                        sx={{ color: 'black' }}
                        textAlign={'center'}
                    >
                        {t(
                            'user_goal.finance_goal.invest_form.dialog.investment_time_text'
                        )}
                        <Controller
                            name={`${name}.period`}
                            control={control}
                            defaultValue="10"
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
                                field: { onBlur, onChange, value },
                                fieldState: { error },
                            }) => (
                                <TextField
                                    type="number"
                                    id="Input"
                                    name={`${name}.period`}
                                    variant="standard"
                                    style={{
                                        width: '100px',
                                    }}
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
                            'user_goal.finance_goal.invest_form.dialog.year_text'
                        )}
                    </Typography>
                </DialogContent>
            </Grid>
        </Grid>
    )
}

export default UserInvestGoal
