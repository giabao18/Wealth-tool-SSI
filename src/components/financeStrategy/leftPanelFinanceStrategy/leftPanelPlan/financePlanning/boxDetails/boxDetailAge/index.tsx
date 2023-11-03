import { Card, CardHeader, TextField } from '@mui/material'
import { IFormControl } from 'src/pages/wealthTool'
import { Controller, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import { IFormControlFinanceStrategy } from 'src/components/financeStrategy'

export interface IBoxDetailAgeData {
    age: number
}

const BoxDetailAge: React.ComponentType<IFormControlFinanceStrategy> = ({
    name,
    control,
    getValues,
    setValue,
}) => {
    const { t } = useTranslation('wealth_tool')

    return (
        <Card className="finance_list" sx={{ backgroundColor: '#841818' }}>
            <CardHeader
                className="finance_list_title"
                title={t('finance_strategy.your_plan.box_age.title')}
                sx={{
                    '.MuiCardHeader-title': {
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#E8E2E2',
                    },
                }}
                action={
                    <>
                        <Controller
                            name={`${name}.age`}
                            control={control}
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
                                field: { onBlur, onChange, value },
                                fieldState: { error },
                            }) => (
                                <TextField
                                    sx={{
                                        width: '80px',
                                    }}
                                    type="number"
                                    id="Input_age"
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
                    </>
                }
            />
        </Card>
    )
}

export default BoxDetailAge
