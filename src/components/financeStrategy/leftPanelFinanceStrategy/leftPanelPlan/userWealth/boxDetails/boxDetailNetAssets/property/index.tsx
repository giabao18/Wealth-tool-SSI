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
import PropertyList from './propertyList'
// icon
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ButtonStyled from 'src/components/buttonStyled'
// date
import Assets from 'src/assets'
import { IIconType } from '../..'
import { calcAnnuallyProfitFromProperty } from '../calc/calcNetAssets'
interface IBoxDetailProperty extends IFormControlFinanceStrategy {
    incomeAppend: UseFieldArrayAppend<
        FieldValues,
        'userWealth.monthlySaving.income'
    >
    incomeRemove: UseFieldArrayRemove
    incomeFields: Record<'id', string>[]
    propertyAppend: UseFieldArrayAppend<
        FieldValues,
        'userWealth.netAssets.property'
    >
    propertyRemove: UseFieldArrayRemove
    propertyFields: Record<'id', string>[]
}
export interface IProperty {
    propertyType: string
    value: number
    trend: string
    period: string
    rate: number
}

const propertyIcon: IIconType[] = [
    { type: 'cash', icon: Assets.BoxDetailProperty.cash },
    { type: 'stock', icon: Assets.BoxDetailProperty.stock },
    { type: 'house', icon: Assets.BoxDetailProperty.home },
    { type: 'car', icon: Assets.BoxDetailProperty.car },
]
const BoxDetailProperty: React.ComponentType<IBoxDetailProperty> = ({
    name,
    control,
    getValues,
    setValue,
    handleSubmit,
    incomeFields,
    incomeAppend,
    incomeRemove,
    propertyAppend,
    propertyFields,
    propertyRemove,
}) => {
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [showField, setShowField] = useState<boolean>(false)
    var iconList: string[]

    // Language
    const { t } = useTranslation('wealth_tool')

    // Form context
    const { resetField } = useFormContext()

    // event handlers
    const handleAddBox = () => {
        const data = getValues('userWealth.netAssets.propertyDialog')
        propertyAppend({ ...data })
        // Append to incomeFields
        incomeAppend({
            index: propertyFields.length,
            incomeType: data.propertyType,
            value: calcAnnuallyProfitFromProperty(data),
            period: data.period,
        })

        handleCloseDialog()
    }

    const handleRemoveBox = (index: number) => {
        propertyRemove(index)

        // Remove in incomeFields
        incomeFields.map((field, indexTemp) => {
            const incomeIndexData = getValues(
                `userWealth.monthlySaving.income.${indexTemp}.index`
            )
            if (incomeIndexData === index) {
                incomeRemove(indexTemp)
                return
            }
        })
    }

    const handleShowField = () => {
        setShowField(!showField)
    }

    const handleCloseDialog = () => {
        resetField('userWealth.netAssets.propertyDialog', {
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
                        'finance_strategy.your_assets.net_assets.property.title'
                    )}
                </DialogTitle>
                <DialogContent className="dialog_image">
                    <img src={Assets.BoxDetailPropertyDialog} alt="" />
                </DialogContent>
                <DialogContent>
                    <Typography
                        variant="h6"
                        style={{ color: 'black', textAlign: 'center' }}
                    >
                        {t(
                            'finance_strategy.your_assets.net_assets.property.cardDialog.sip_have'
                        )}
                        <Controller
                            name={`userWealth.netAssets.propertyDialog.propertyType`}
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
                                        <MenuItem value={'cash'}>
                                            {t(
                                                'finance_strategy.your_assets.net_assets.property.cardDialog.cash_select'
                                            )}
                                        </MenuItem>
                                        <MenuItem value={'stock'}>
                                            {t(
                                                'finance_strategy.your_assets.net_assets.property.cardDialog.stock_select'
                                            )}
                                        </MenuItem>
                                        <MenuItem value={'house'}>
                                            {t(
                                                'finance_strategy.your_assets.net_assets.property.cardDialog.house_select'
                                            )}
                                        </MenuItem>
                                        <MenuItem value={'car'}>
                                            {t(
                                                'finance_strategy.your_assets.net_assets.property.cardDialog.car_select'
                                            )}
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        />
                        {t(
                            'finance_strategy.your_assets.net_assets.property.cardDialog.sip_value'
                        )}
                        <Controller
                            name={`userWealth.netAssets.propertyDialog.value`}
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
                            'finance_strategy.your_assets.net_assets.property.cardDialog.sip_millions_trend'
                        )}
                        <Controller
                            name={`userWealth.netAssets.propertyDialog.trend`}
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
                                        <MenuItem value={'up'}>
                                            {t(
                                                'finance_strategy.your_assets.net_assets.property.cardDialog.up_select'
                                            )}
                                        </MenuItem>
                                        <MenuItem value={'down'}>
                                            {t(
                                                'finance_strategy.your_assets.net_assets.property.cardDialog.down_select'
                                            )}
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        />

                        {t(
                            'finance_strategy.your_assets.net_assets.property.cardDialog.sip_each'
                        )}
                        <Controller
                            name={`userWealth.netAssets.propertyDialog.period`}
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
                                                'finance_strategy.your_assets.net_assets.property.cardDialog.month_select'
                                            )}
                                        </MenuItem>
                                        <MenuItem value={'year'}>
                                            {t(
                                                'finance_strategy.your_assets.net_assets.property.cardDialog.year_select'
                                            )}
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        />
                        {t(
                            'finance_strategy.your_assets.net_assets.property.cardDialog.sip_approximately'
                        )}
                        <Controller
                            name={`userWealth.netAssets.propertyDialog.rate`}
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
                            'finance_strategy.your_assets.net_assets.property.cardDialog.sip_percentage'
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
                        'finance_strategy.your_assets.net_assets.property.title'
                    )}
                />
                <Box className="finance_list_data">
                    <Stack spacing={0}>
                        {propertyFields.length == 0 && (
                            <Card
                                className="finance_list_userWealth_blank"
                                style={{ marginTop: '10px' }}
                            >
                                <CardMedia
                                    component="img"
                                    className="media"
                                    image={Assets.BoxDetailProperty.cash}
                                />
                                <CardContent>
                                    {t(
                                        'finance_strategy.your_assets.net_assets.property.cardBlank'
                                    )}
                                </CardContent>
                            </Card>
                        )}
                        {propertyFields.map((field, index) => (
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
                                    image={
                                        propertyIcon.find((item) => {
                                            if (
                                                item.type ==
                                                getValues(
                                                    `userWealth.netAssets.property.${index}.propertyType`
                                                )
                                            )
                                                return item
                                        })?.icon
                                    }
                                />

                                <CardContent>
                                    <PropertyList
                                        key={index}
                                        {...{
                                            name,
                                            control,
                                            index,
                                            showField,
                                            getValues,
                                        }}
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

export default BoxDetailProperty
