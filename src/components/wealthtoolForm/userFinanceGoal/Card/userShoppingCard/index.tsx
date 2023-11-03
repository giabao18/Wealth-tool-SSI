import React from 'react'
import { Controller } from 'react-hook-form'
import {
    DialogContent,
    DialogTitle,
    CardMedia,
    TextField,
    Typography,
    Grid,
} from '@mui/material'
import Assets from 'src/assets'
import { IFormControl } from 'src/pages/wealthTool'
import { useTranslation } from 'react-i18next'

export interface IUserShoppingCardData {
    status: boolean
    price: number
    period: number
}

const UserShoppingGoal: React.ComponentType<IFormControl> = ({
    control,
    name,
}) => {
    //Language
    const { t } = useTranslation('wealth_tool')
    return (
        <Grid container spacing={2} className="dialog">
            <Grid item xs={12}>
                <DialogTitle className="dialog_title">
                    {t('user_goal.finance_goal.goal_form.title')}
                </DialogTitle>
            </Grid>
            <Grid item xs={12}>
                <div className="dialog_image">
                    <CardMedia
                        className="media"
                        component="img"
                        alt="shopping"
                        image={Assets.CarCard}
                    />
                </div>
                <DialogContent>
                    <Typography
                        variant="h6"
                        className="dialog_content"
                        sx={{ color: 'black', textAlign: 'center' }}
                    >
                        {t(
                            'user_goal.finance_goal.goal_form.dialog.value_shopping'
                        )}
                        <Controller
                            name={`UserFinanceGoalForm.UserShoppingCard.price`}
                            control={control}
                            defaultValue="900"
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
                                    inputProps={{
                                        style: {
                                            textAlign: 'center',
                                        },
                                    }}
                                    style={{
                                        width: '100px',
                                    }}
                                    required
                                    id="Input"
                                    name={`${name}.price`}
                                    variant="standard"
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    helperText={error ? error.message : ''}
                                    error={!!error}
                                />
                            )}
                        />
                        {t('user_goal.finance_goal.goal_form.dialog.billion')}
                        <Controller
                            name={`UserFinanceGoalForm.UserShoppingCard.period`}
                            control={control}
                            defaultValue="5"
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
                                    style={{
                                        width: '100px',
                                    }}
                                    inputProps={{
                                        style: {
                                            textAlign: 'center',
                                        },
                                    }}
                                    id="Input"
                                    name={`${name}.period`}
                                    variant="standard"
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    error={!!error}
                                    helperText={error ? error.message : ''}
                                />
                            )}
                        />
                        {t('user_goal.finance_goal.goal_form.dialog.year_text')}
                    </Typography>
                </DialogContent>
            </Grid>
        </Grid>
    )
}

export default UserShoppingGoal
