import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    MenuItem,
    Select,
    Stack,
    TextField,
    Tooltip,
    Typography,
    Icon,
} from '@mui/material'
import {
    Controller,
    FieldValues,
    UseFieldArrayAppend,
    UseFieldArrayRemove,
    useFormContext,
} from 'react-hook-form'
import React, { useState } from 'react'
import BoxDetailHeader from '../../../../boxDetailUI/BoxDetailHeader'
import { IFormControlFinanceStrategy } from 'src/components/financeStrategy'
import { useTranslation } from 'react-i18next'
// icon
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ButtonStyled from 'src/components/buttonStyled'
import IncomeList from './incomeList'
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn'
import Assets from 'src/assets'
import { IIconType } from '../..'
import { getValue } from '@testing-library/user-event/dist/utils'
import { extend } from 'dayjs'
export interface IIncome {
    index: number
    incomeType: string
    value: number
    period: string
}

interface IBoxDetailIncome extends IFormControlFinanceStrategy {
    incomeAppend: UseFieldArrayAppend<
        FieldValues,
        'userWealth.monthlySaving.income'
    >
    incomeRemove: UseFieldArrayRemove
    incomeFields: Record<'id', string>[]
    propertyRemove: UseFieldArrayRemove
}

const incomeIcons: IIconType[] = [
    { type: 'wage', icon: Assets.BoxDetailIncome.wage },
    { type: 'business', icon: Assets.BoxDetailIncome.business },
]

const BoxDetailIncome: React.ComponentType<IBoxDetailIncome> = ({
    name,
    control,
    getValues,
    setValue,
    handleSubmit,
    incomeAppend,
    incomeRemove,
    incomeFields,
    propertyRemove,
}) => {
    const [openDialog, setOpenDialog] = useState<boolean>(false)

    // Language
    const { t } = useTranslation('wealth_tool')

    // Form context
    const { resetField } = useFormContext()

    // event handlers

    const handleAddBox = () => {
        incomeAppend({
            ...getValues('userWealth.monthlySaving.incomeDialog'),
            index: -1,
        })
        handleCloseDialog()
    }

    const handleRemoveBox = (index: number) => {
        incomeRemove(index)

        // Remove in propertyFields
        const indexPropertyInIncome = Number(
            getValues(`userWealth.monthlySaving.income.${index}.index`)
        )
        if (indexPropertyInIncome != -1) propertyRemove(indexPropertyInIncome)
    }

    const handleCloseDialog = () => {
        resetField('userWealth.monthlySaving.incomeDialog', {
            defaultValue: '',
        })
        setOpenDialog(false)
    }

    return (
        <>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                className="dialog"
                PaperProps={{
                    sx: {
                        width: '522px',
                        borderRadius: '12px',
                        textAlign: 'center',
                        padding: '12px',
                    },
                }}
            >
                <DialogTitle className="dialog_title">
                    {t(
                        'finance_strategy.your_assets.monthly_saving.income.cardDialog.title'
                    )}
                </DialogTitle>
                <DialogContent className="dialog_image">
                    <img src={Assets.BoxDetailIncomeDialog} />
                </DialogContent>
                <DialogContent>
                    <Typography
                        variant="h6"
                        style={{ color: 'black', textAlign: 'center' }}
                    >
                        {t(
                            'finance_strategy.your_assets.monthly_saving.income.cardDialog.sip_income_from'
                        )}
                        <Controller
                            name={`userWealth.monthlySaving.incomeDialog.incomeType`}
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
                                        <MenuItem value={'wage'}>
                                            {t(
                                                'finance_strategy.your_assets.monthly_saving.income.cardDialog.wage_select'
                                            )}
                                        </MenuItem>
                                        <MenuItem value={'business'}>
                                            {t(
                                                'finance_strategy.your_assets.monthly_saving.income.cardDialog.business_select'
                                            )}
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        />
                        {t(
                            'finance_strategy.your_assets.monthly_saving.income.cardDialog.sip_periodic'
                        )}
                        <Controller
                            name={`userWealth.monthlySaving.incomeDialog.value`}
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
                            'finance_strategy.your_assets.monthly_saving.income.cardDialog.sip_every'
                        )}
                        <Controller
                            name={`userWealth.monthlySaving.incomeDialog.period`}
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
                                                'finance_strategy.your_assets.monthly_saving.income.cardDialog.month_select'
                                            )}
                                        </MenuItem>
                                        <MenuItem value={'year'}>
                                            {t(
                                                'finance_strategy.your_assets.monthly_saving.income.cardDialog.year_select'
                                            )}
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Typography>
                </DialogContent>

                <DialogActions
                    style={{ justifyContent: 'center', height: '60px' }}
                >
                    <ButtonStyled
                        className="btn_start"
                        variant="contained"
                        style={{
                            width: '320px',
                        }}
                        type="submit"
                        onClick={handleSubmit(() => handleAddBox())}
                    >
                        {t('wealth_tool.button_save')}
                    </ButtonStyled>
                </DialogActions>
            </Dialog>

            <Card className="finance_list">
                <BoxDetailHeader
                    setOpenDialog={setOpenDialog}
                    title={t(
                        'finance_strategy.your_assets.monthly_saving.income.title'
                    )}
                />

                <Box className="finance_list_data">
                    <Stack spacing={0}>
                        {incomeFields.length === 0 && (
                            <Card
                                className="finance_list_userWealth_blank"
                                style={{ marginTop: '10px' }}
                            >
                                <CardMedia
                                    component="img"
                                    className="media"
                                    image={Assets.BoxDetailIncome.wage}
                                />
                                <CardContent>
                                    {t(
                                        'finance_strategy.your_assets.monthly_saving.income.cardBlank'
                                    )}
                                </CardContent>
                            </Card>
                        )}
                        {incomeFields.map((field, index) => (
                            <Card
                                key={field.id}
                                className="finance_list_card"
                                style={{ paddingTop: '5px' }}
                            >
                                <CardActions className="actions">
                                    <Tooltip title="Delete">
                                        <IconButton
                                            className="icon"
                                            onClick={() =>
                                                handleRemoveBox(index)
                                            }
                                        >
                                            <DeleteForeverIcon />
                                        </IconButton>
                                    </Tooltip>
                                </CardActions>
                                <CardMedia
                                    component="img"
                                    className="media"
                                    image={
                                        incomeIcons.find((item) => {
                                            if (
                                                getValues(
                                                    `userWealth.monthlySaving.income.${index}.incomeType`
                                                ) === item.type
                                            )
                                                return item
                                        })?.icon || Assets.BoxDetailIncome.wage
                                    }
                                />
                                <CardContent>
                                    <IncomeList
                                        key={index}
                                        {...{ name, control, index, getValues }}
                                    />
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>
                </Box>
            </Card>
        </>
    )
}

export default BoxDetailIncome
