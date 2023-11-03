import {
    Box,
    Dialog,
    DialogContent,
    Typography,
    FormControl,
    Select,
    MenuItem,
    TextField,
    DialogActions,
    Card,
    CardActions,
    Tooltip,
    IconButton,
    CardContent,
    Stack,
    CardMedia,
    DialogTitle,
} from '@mui/material'
import React, { useState } from 'react'
import {
    Controller,
    FieldValues,
    UseFieldArrayAppend,
    UseFieldArrayRemove,
    useFormContext,
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import ButtonStyled from 'src/components/buttonStyled'
import { IFormControlFinanceStrategy } from 'src/components/financeStrategy'
import BoxDetailHeader from '../../../../boxDetailUI/BoxDetailHeader'
import SpendingList from './spendingList'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Assets from 'src/assets'

export interface ISpending {
    index: number
    spendingPurpose: string
    value: number
    period: string
}

interface IBoxDetailSpending extends IFormControlFinanceStrategy {
    spendingAppend: UseFieldArrayAppend<
        FieldValues,
        'userWealth.monthlySaving.spending'
    >
    spendingRemove: UseFieldArrayRemove
    spendingFields: Record<'id', string>[]
    debtRemove: UseFieldArrayRemove
}

const BoxDetailSpending = ({
    name,
    control,
    getValues,
    setValue,
    handleSubmit,
    spendingAppend,
    spendingFields,
    spendingRemove,
    debtRemove,
}: IBoxDetailSpending) => {
    const [openDialog, setOpenDialog] = useState<boolean>(false)

    // Language
    const { t } = useTranslation('wealth_tool')

    // Form context
    const { resetField } = useFormContext()

    // event handlers
    const handleAddBox = () => {
        spendingAppend({
            ...getValues('userWealth.monthlySaving.spendingDialog'),
            index: -1,
        })
        handleCloseDialog()
    }

    const handleRemoveBox = (index: number) => {
        spendingRemove(index)

        // Remove in debtFields
        const indexDebtInSpending = Number(
            getValues(`userWealth.monthlySaving.spending.${index}.index`)
        )
        if (indexDebtInSpending != -1) debtRemove(indexDebtInSpending)
    }

    const handleCloseDialog = () => {
        resetField('userWealth.monthlySaving.spendingDialog', {
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
                        'finance_strategy.your_assets.monthly_saving.spending.cardDialog.title'
                    )}
                </DialogTitle>
                <DialogContent className="dialog_image">
                    <img src={Assets.BoxDetailSpendingDialog} />
                </DialogContent>
                <DialogContent>
                    <Typography
                        variant="h6"
                        className="dialog_content"
                        style={{
                            color: 'black',
                            textAlign: 'center',
                        }}
                    >
                        {t(
                            'finance_strategy.your_assets.monthly_saving.spending.cardDialog.sip_spend_for'
                        )}
                        <Controller
                            name={`userWealth.monthlySaving.spendingDialog.spendingPurpose`}
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
                                        <MenuItem value={'family'}>
                                            {t(
                                                'finance_strategy.your_assets.monthly_saving.spending.cardDialog.forFamily_select'
                                            )}
                                        </MenuItem>
                                        <MenuItem value={'business'}>
                                            {t(
                                                'finance_strategy.your_assets.monthly_saving.spending.cardDialog.forBusiness_select'
                                            )}
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        />
                        {t(
                            'finance_strategy.your_assets.monthly_saving.spending.cardDialog.sip_periodic'
                        )}
                        <Controller
                            name={`userWealth.monthlySaving.spendingDialog.value`}
                            control={control}
                            defaultValue={''}
                            rules={{
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
                            'finance_strategy.your_assets.monthly_saving.spending.cardDialog.sip_every'
                        )}
                        <Controller
                            name={`userWealth.monthlySaving.spendingDialog.period`}
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
                                                'finance_strategy.your_assets.monthly_saving.spending.cardDialog.month_select'
                                            )}
                                        </MenuItem>
                                        <MenuItem value={'year'}>
                                            {t(
                                                'finance_strategy.your_assets.monthly_saving.spending.cardDialog.year_select'
                                            )}
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Typography>
                </DialogContent>

                <DialogActions
                    style={{
                        justifyContent: 'center',
                        height: '60px',
                    }}
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
                        'finance_strategy.your_assets.monthly_saving.spending.title'
                    )}
                />

                <Box className="finance_list_data">
                    <Stack spacing={0}>
                        {spendingFields.length === 0 && (
                            <Card
                                className="finance_list_userWealth_blank"
                                style={{ marginTop: '10px' }}
                            >
                                <CardMedia
                                    component="img"
                                    className="media"
                                    image={Assets.BoxDetailSpending}
                                />
                                <CardContent>
                                    {t(
                                        'finance_strategy.your_assets.monthly_saving.spending.cardBlank'
                                    )}
                                </CardContent>
                            </Card>
                        )}
                        {spendingFields.map((field, index) => (
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
                                    src={Assets.BoxDetailSpending}
                                />
                                <CardContent>
                                    <SpendingList
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

export default BoxDetailSpending
