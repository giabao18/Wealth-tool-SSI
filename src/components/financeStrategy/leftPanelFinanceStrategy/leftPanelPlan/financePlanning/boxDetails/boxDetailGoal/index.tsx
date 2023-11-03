import React, { useEffect, useState, useRef, useMemo } from 'react'
import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Dialog,
    DialogContent,
    IconButton,
    Stack,
    Tooltip,
} from '@mui/material'
import {
    Controller,
    UseFormHandleSubmit,
    useFieldArray,
    useWatch,
    UseFormGetValues,
} from 'react-hook-form'
//Icon
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn'
import TuneIcon from '@mui/icons-material/Tune'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Checkbox from '@mui/material/Checkbox'
import { useTranslation } from 'react-i18next'
import UserFinanceGoal, {
    IUserFinanceGoalData,
} from 'src/components/wealthtoolForm/userFinanceGoal'
import BoxDetailShopping, { IShoppingBox } from './boxDetailShoppingGoal'
import BoxDetailEducation, { IEducationBox } from './boxDetailEducationGoal'
import { IFormControlFinanceStrategy } from 'src/components/financeStrategy'
import Assets from 'src/assets'
import { IWealthToolFormDataType } from 'src/redux/store'

export interface IBoxDetailGoalData {
    shoppingBox: IShoppingBox[]
    educationBox: IEducationBox[]
}

export interface IBoxDetailGoal {
    control: any
    field: Record<'id', string>
    index: number
    name: string
    getValues: UseFormGetValues<IWealthToolFormDataType>
}

const BoxDetailGoal: React.ComponentType<IFormControlFinanceStrategy> = ({
    control,
    name,
    getValues,
    setValue,
    handleSubmit,
}) => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
    const currentAge = Number(getValues('UserInfoForm.age'))
    // Language
    const { t } = useTranslation('wealth_tool')

    // useFieldArray
    const {
        fields: shoppingField,
        append: shoppingAppend,
        remove: shoppingRemove,
    } = useFieldArray({
        control,
        name: 'financePlanning.goal.shoppingBox',
    })

    const {
        fields: educationField,
        append: educationAppend,
        remove: educationRemove,
    } = useFieldArray({
        control,
        name: 'financePlanning.goal.educationBox',
    })

    const [addGoal, setAddGoal] = useState<boolean>(false)
    const handleOpenBoxCardList = () => {
        setAddGoal(true)
    }

    const handCloseBoxCardList = (
        status: boolean,
        data?: IUserFinanceGoalData
    ) => {
        if (data?.UserEducationCard?.status == true) {
            educationAppend({
                age: currentAge + Number(data.UserEducationCard?.period),
                collegeTime: data.UserEducationCard?.collegeTime,
                tuitionFees: data.UserEducationCard?.tuitionFees,
                checkbox: true,
            })
        }
        if (data?.UserShoppingCard?.status == true) {
            shoppingAppend({
                age: currentAge + Number(data.UserShoppingCard?.period),
                price: data.UserShoppingCard?.price,
                checkbox: true,
            })
        }

        setAddGoal(status)
    }
    // CheckBox
    const handleSelectCheckBox = (
        event: React.ChangeEvent<HTMLInputElement>,
        index: number,
        type: string
    ) => {
        if (type === 'shopping')
            setValue(
                `financePlanning.goal.shoppingBox.${index}.checkBox`,
                event.target.checked
            )

        if (type === 'education')
            setValue(
                `financePlanning.goal.educationBox.${index}.checkBox`,
                event.target.checked
            )
    }

    return (
        <>
            {addGoal && (
                <Dialog
                    open={addGoal}
                    onClose={() => setAddGoal(false)}
                    keepMounted
                    maxWidth={'md'}
                >
                    <DialogContent sx={{ width: '700px' }}>
                        <UserFinanceGoal
                            name="BoxDetailGoal"
                            control={control}
                            setValue={setValue}
                            setAddGoal={setAddGoal}
                            getValues={getValues}
                            handleSubmit={handleSubmit}
                            handleCloseBoxCardList={handCloseBoxCardList}
                        />
                    </DialogContent>
                </Dialog>
            )}
            <Card className="finance_list">
                <CardHeader
                    className="finance_list_title"
                    title={t('finance_strategy.your_plan.box_goal.title')}
                    sx={{
                        '.MuiCardHeader-title': {
                            fontSize: '16px',
                            fontWeight: 'bold',
                        },
                        backgroundColor: '#841818',
                        color: '#E8E2E2',
                    }}
                    action={
                        <Stack direction={'row'} spacing={2}>
                            <IconButton
                                sx={{
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                    color: '#E8E2E2',
                                }}
                                onClick={handleOpenBoxCardList}
                            >
                                <DataSaverOnIcon
                                    sx={{
                                        marginRight: '8px',
                                        color: '#E8E2E2',
                                    }}
                                />{' '}
                                {t('wealth_tool.button_more')}
                            </IconButton>
                        </Stack>
                    }
                />
                <Box className="finance_list_data">
                    <Stack spacing={0}>
                        {shoppingField.map((field, index) => (
                            <Card
                                key={index}
                                className="finance_list_card"
                                style={{ paddingTop: '5px' }}
                            >
                                <CardActions className="actions">
                                    <IconButton className="icon">
                                        <TuneIcon />
                                    </IconButton>
                                    <Tooltip title="Delete">
                                        <IconButton
                                            className="icon"
                                            onClick={() =>
                                                shoppingRemove(index)
                                            }
                                        >
                                            <DeleteForeverIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <IconButton className="icon">
                                        <Checkbox
                                            {...label}
                                            defaultChecked
                                            onChange={(e) =>
                                                handleSelectCheckBox(
                                                    e,
                                                    index,
                                                    'shopping'
                                                )
                                            }
                                            sx={{
                                                color: 'darkred',
                                                '&.Mui-checked': {
                                                    color: 'darkred',
                                                },
                                            }}
                                        />
                                    </IconButton>
                                </CardActions>
                                <CardMedia
                                    component="img"
                                    className="media"
                                    image={Assets.BoxDetailGoal_Car}
                                />

                                <CardContent
                                    sx={{
                                        padding: 0,
                                        paddingTop: '16px',
                                    }}
                                >
                                    <BoxDetailShopping
                                        key={field.id}
                                        index={index}
                                        control={control}
                                        name={`${name}.shoppingBox`}
                                        field={field}
                                        getValues={getValues}
                                    />
                                </CardContent>
                            </Card>
                        ))}

                        {educationField.map((field, index) => (
                            <Card
                                key={index}
                                className="finance_list_card"
                                style={{ paddingTop: '5px' }}
                            >
                                <CardActions className="actions">
                                    <IconButton className="icon">
                                        <TuneIcon />
                                    </IconButton>
                                    <Tooltip title="Delete">
                                        <IconButton
                                            className="icon"
                                            onClick={() =>
                                                educationRemove(index)
                                            }
                                        >
                                            <DeleteForeverIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <IconButton className="icon">
                                        <Checkbox
                                            {...label}
                                            defaultChecked
                                            onChange={(e) =>
                                                handleSelectCheckBox(
                                                    e,
                                                    index,
                                                    'education'
                                                )
                                            }
                                            sx={{
                                                color: 'darkred',
                                                '&.Mui-checked': {
                                                    color: 'darkred',
                                                },
                                            }}
                                        />
                                    </IconButton>
                                </CardActions>
                                <CardMedia
                                    component="img"
                                    className="media"
                                    image={Assets.BoxDetailGoal_Education}
                                />

                                <CardContent
                                    sx={{
                                        padding: 0,
                                        paddingTop: '16px',
                                    }}
                                >
                                    <BoxDetailEducation
                                        key={field.id}
                                        index={index}
                                        control={control}
                                        name={`${name}.educationBox`}
                                        field={field}
                                        getValues={getValues}
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

export default BoxDetailGoal
