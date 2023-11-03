import React, { useMemo } from 'react'
import { Controller, useFormContext, UseFormSetValue } from 'react-hook-form'
import {
    CardMedia,
    TextField,
    Typography,
    DialogContent,
    DialogTitle,
    Grid,
} from '@mui/material'
import Assets from 'src/assets'
import { IFormControl } from 'src/pages/wealthTool'
import { IWealthToolFormDataType } from 'src/redux/store'
import { useTranslation } from 'react-i18next'

export interface IUserEducationCardData {
    status: boolean
    period: number
    childCurrentAge: number
    childFutureAge: number
    collegeTime: number
    tuitionFees: number
}

const UserEducationGoal: React.ComponentType<IFormControl> = ({
    control,
    name,
}) => {
    //Language
    const { t } = useTranslation('wealth_tool')

    // Form Context API
    const { setValue, getValues } = useFormContext<IWealthToolFormDataType>()
    useMemo(() => {
        const value =
            Number(
                getValues(
                    'UserFinanceGoalForm.UserEducationCard.childFutureAge'
                )
            ) -
            Number(
                getValues(
                    'UserFinanceGoalForm.UserEducationCard.childCurrentAge'
                )
            )

        setValue('UserFinanceGoalForm.UserEducationCard.period', value)
    }, [
        getValues('UserFinanceGoalForm.UserEducationCard.childCurrentAge'),
        getValues('UserFinanceGoalForm.UserEducationCard.childFutureAge'),
    ])

    return (
        <Grid container spacing={1} className="dialog">
            <Grid item xs={12}>
                <DialogTitle className="dialog_title">
                    {t('user_goal.finance_goal.education_form.title')}
                </DialogTitle>
            </Grid>
            <Grid item xs={12}>
                <div className="dialog_image">
                    <CardMedia
                        className="media"
                        component="img"
                        alt="investment"
                        image={Assets.EducationCard}
                    />
                </div>
                <DialogContent>
                    <Typography
                        variant="h6"
                        className="dialog_content"
                        sx={{ color: 'black', textAlign: 'center' }}
                    >
                        {t(
                            'user_goal.finance_goal.education_form.dialog.children_age_text'
                        )}
                        <Controller
                            name={`UserFinanceGoalForm.UserEducationCard.childCurrentAge`}
                            control={control}
                            defaultValue="14"
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
                                    style={{ width: '80px' }}
                                    id="Input"
                                    variant="standard"
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    helperText={error ? error.message : ''}
                                    error={!!error}
                                />
                            )}
                        />

                        {t(
                            'user_goal.finance_goal.education_form.dialog.time_text'
                        )}
                        <Controller
                            name={`UserFinanceGoalForm.UserEducationCard.childFutureAge`}
                            control={control}
                            defaultValue="18"
                            rules={{
                                required: t('invalid.mandatory'),
                                max: {
                                    value: 100,
                                    message: t('invalid.max_value') + '100',
                                },
                                min: {
                                    value: getValues(
                                        'UserFinanceGoalForm.UserEducationCard.childCurrentAge'
                                    ),
                                    message:
                                        t('invalid.age_value') +
                                        getValues(
                                            'UserFinanceGoalForm.UserEducationCard.childCurrentAge'
                                        ),
                                },
                            }}
                            render={({
                                field: { onBlur, onChange, value },
                                fieldState: { error },
                            }) => (
                                <TextField
                                    type="number"
                                    style={{ width: '80px' }}
                                    id="Input"
                                    variant="standard"
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    helperText={error ? error.message : ''}
                                    error={!!error}
                                />
                            )}
                        />
                        {t(
                            'user_goal.finance_goal.education_form.dialog.program_time_text'
                        )}
                        <Controller
                            name={`UserFinanceGoalForm.UserEducationCard.collegeTime`}
                            control={control}
                            defaultValue="4"
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
                                    style={{ width: '80px' }}
                                    id="Input"
                                    variant="standard"
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    helperText={error ? error.message : ''}
                                    error={!!error}
                                />
                            )}
                        />
                        {t(
                            'user_goal.finance_goal.education_form.dialog.fee_text'
                        )}
                        <Controller
                            name={`UserFinanceGoalForm.UserEducationCard.tuitionFees`}
                            control={control}
                            defaultValue="100"
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
                                    value: 3,
                                    message:
                                        t('invalid.min_value') +
                                        '2' +
                                        t('invalid.million'),
                                },
                            }}
                            render={({
                                field: { onBlur, onChange, value },
                                fieldState: { error },
                            }) => (
                                <TextField
                                    type="number"
                                    style={{ width: '80px' }}
                                    id="Input"
                                    variant="standard"
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    helperText={error ? error.message : ''}
                                    error={!!error}
                                />
                            )}
                        />
                        {t(
                            'user_goal.finance_goal.education_form.dialog.million'
                        )}
                    </Typography>
                </DialogContent>
            </Grid>
        </Grid>
    )
}
const periodCalculate = (
    currentAge: number,
    futureAge: number,
    setValue: UseFormSetValue<IWealthToolFormDataType>
) => {
    if (currentAge !== undefined && futureAge !== undefined) {
        const value = futureAge - currentAge
        setValue('UserFinanceGoalForm.UserEducationCard.period', value)
    }
}

export default UserEducationGoal
