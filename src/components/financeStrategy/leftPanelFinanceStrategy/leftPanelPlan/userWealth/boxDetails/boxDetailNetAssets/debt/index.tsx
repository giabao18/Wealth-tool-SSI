import {
    Box,
    Card,
    CardActions,
    CardContent,
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
import DebtList from './debtList'
// icon
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ButtonStyled from 'src/components/buttonStyled'
// date
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Assets from 'src/assets'
import { calcAnnuallyDebt } from '../calc/calcNetAssets'
interface IBoxDetailDebt extends IFormControlFinanceStrategy {
    spendingFields: Record<'id', string>[]
    spendingAppend: UseFieldArrayAppend<
        FieldValues,
        'userWealth.monthlySaving.spending'
    >
    spendingRemove: UseFieldArrayRemove
    debtAppend: UseFieldArrayAppend<FieldValues, 'userWealth.netAssets.debt'>
    debtRemove: UseFieldArrayRemove
    debtFields: Record<'id', string>[]
}
export interface IDebt {
    debtType: string
    date: Date
    value: number
    rate: number
    period: string
    dueDate: number
}

const BoxDetailDebt: React.ComponentType<IBoxDetailDebt> = ({
    name,
    control,
    getValues,
    setValue,
    handleSubmit,
    spendingFields,
    spendingRemove,
    spendingAppend,
    debtAppend,
    debtFields,
    debtRemove,
}) => {
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [showField, setShowField] = useState<boolean>(false)

    // form Context
    const { resetField } = useFormContext()

    // Language
    const { t } = useTranslation('wealth_tool')

    // event handlers
    const handleAddBox = () => {
        const data = getValues('userWealth.netAssets.debtDialog')

        debtAppend({ ...data })

        // Append to spendingFields
        spendingAppend({
            index: debtFields.length,
            spendingPurpose: 'debt',
            value: calcAnnuallyDebt(data),
            period: 'month',
        })

        handleCloseDialog()
    }

    const handleRemoveBox = (index: number) => {
        debtRemove(index)

        // Remove in spendingFields
        spendingFields.map((item, indexTemp) => {
            const spendingIndexData = getValues(
                `userWealth.monthlySaving.spending.${index}.index`
            )
            if (spendingIndexData === index) {
                spendingRemove(indexTemp)
                return
            }
        })
    }

    const handleShowField = () => {
        setShowField(!showField)
    }

    const handleCloseDialog = () => {
        resetField('userWealth.netAssets.debtDialog', {
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
                        'finance_strategy.your_assets.net_assets.debt.cardDialog.title'
                    )}
                </DialogTitle>
                <DialogContent className="dialog_image">
                    <img src={Assets.BoxDetailDebtDialog} />
                </DialogContent>
                <DialogContent>
                    <Typography
                        variant="h6"
                        style={{ color: 'black', textAlign: 'center' }}
                    >
                        {t(
                            'finance_strategy.your_assets.net_assets.debt.cardDialog.sip_loan'
                        )}
                        <Controller
                            name={`userWealth.netAssets.debtDialog.debtType`}
                            control={control}
                            defaultValue={''}
                            rules={{
                                required: 'Mandatory',
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
                            'finance_strategy.your_assets.net_assets.debt.cardDialog.sip_on'
                        )}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Controller
                                name={`userWealth.netAssets.debtDialog.date`}
                                control={control}
                                defaultValue={''}
                                render={({
                                    field: { value, onChange },
                                    fieldState: { error },
                                }) => (
                                    <DatePicker
                                        onChange={onChange}
                                        label={''}
                                        sx={{
                                            width: '192px',
                                            padding: '0 5px',
                                        }}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                        {t(
                            'finance_strategy.your_assets.net_assets.debt.cardDialog.sip_value'
                        )}
                        <Controller
                            name={`userWealth.netAssets.debtDialog.value`}
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
                            'finance_strategy.your_assets.net_assets.debt.cardDialog.sip_millions'
                        )}
                        <Controller
                            name={`userWealth.netAssets.debtDialog.rate`}
                            control={control}
                            defaultValue={''}
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
                            'finance_strategy.your_assets.net_assets.debt.cardDialog.sip_every'
                        )}
                        <Controller
                            name={`userWealth.netAssets.debtDialog.period`}
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
                                                'finance_strategy.your_assets.net_assets.debt.cardDialog.month_select'
                                            )}
                                        </MenuItem>
                                        <MenuItem value={'year'}>
                                            {t(
                                                'finance_strategy.your_assets.net_assets.debt.cardDialog.year_select'
                                            )}
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        />
                        {t(
                            'finance_strategy.your_assets.net_assets.debt.cardDialog.sip_pay'
                        )}
                        <Controller
                            name={`userWealth.netAssets.debtDialog.type`}
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
                                        <MenuItem
                                            value={'principleAndInterest'}
                                        >
                                            {t(
                                                'finance_strategy.your_assets.net_assets.debt.cardDialog.principal_interest_select'
                                            )}
                                        </MenuItem>
                                        <MenuItem value={'principle'}>
                                            {t(
                                                'finance_strategy.your_assets.net_assets.debt.cardDialog.principal_select'
                                            )}
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        />
                        {t(
                            'finance_strategy.your_assets.net_assets.debt.cardDialog.sip_in'
                        )}
                        <Controller
                            name={`userWealth.netAssets.debtDialog.dueDate`}
                            control={control}
                            defaultValue={''}
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
                            'finance_strategy.your_assets.net_assets.debt.cardDialog.sip_months'
                        )}
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
                        'finance_strategy.your_assets.net_assets.debt.title'
                    )}
                />
                <Box className="finance_list_data">
                    <Stack spacing={0}>
                        {debtFields.length == 0 && (
                            <Card
                                className="finance_list_userWealth_blank"
                                style={{ marginTop: '10px' }}
                            >
                                <CardMedia
                                    component="img"
                                    className="media"
                                    image={Assets.BoxDetailDebt}
                                />
                                <CardContent>
                                    {t(
                                        'finance_strategy.your_assets.net_assets.debt.cardBlank'
                                    )}
                                </CardContent>
                            </Card>
                        )}
                        {debtFields.map((field, index) => (
                            <Card
                                key={field.id}
                                className="finance_list_card"
                                style={{ paddingTop: '5px' }}
                            >
                                <CardActions className="actions">
                                    <Tooltip title="Show">
                                        <IconButton
                                            className="icon"
                                            onClick={() => handleShowField()}
                                        >
                                            {!showField && (
                                                <ArrowDropDownIcon />
                                            )}
                                            {showField && <ArrowDropUpIcon />}
                                        </IconButton>
                                    </Tooltip>
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
                                    image={Assets.BoxDetailDebt}
                                />
                                <CardContent>
                                    <DebtList
                                        key={index}
                                        {...{ name, control, index, showField ,getValues}}
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

export default BoxDetailDebt
