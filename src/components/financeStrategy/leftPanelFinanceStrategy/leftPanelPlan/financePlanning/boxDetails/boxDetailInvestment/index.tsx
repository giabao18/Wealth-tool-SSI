import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    IconButton,
    Stack,
    Tooltip,
    Typography,
    Popper,
    Grow,
    Paper,
    MenuList,
    MenuItem,
    ClickAwayListener,
    CardMedia,
} from '@mui/material'
//Icon
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn'
import TuneIcon from '@mui/icons-material/Tune'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Checkbox from '@mui/material/Checkbox'

import React, { useState, useRef } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import OneTimeInvestment, { IOneTimeInvestmentBox } from './oneTimeInvestment'
import AnnuallyInvestment, {
    IAnnuallyInvestmentBox,
} from './annuallyInvestment'
import { IFormControlFinanceStrategy } from 'src/components/financeStrategy'
import Assets from 'src/assets'
import { UseFormGetValues } from 'react-hook-form'
import { IWealthToolFormDataType } from 'src/redux/store'

export interface IBoxDetailInvestmentData {
    annuallyInvestmentBox: IAnnuallyInvestmentBox[]
    oneTimeInvestmentBox: IOneTimeInvestmentBox[]
}

export interface IBoxDetailInvestment {
    control: any
    field: Record<'id', string>
    index: number
    name: string
    getValues: UseFormGetValues<IWealthToolFormDataType>
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

const boxType = ['Annually Investment', 'One-time Investment']

const BoxDetailInvestment: React.ComponentType<IFormControlFinanceStrategy> = ({
    control,
    name,
    getValues,
    setValue,
}) => {
    //language
    const { t } = useTranslation('wealth_tool')
    const boxType = [
        t('finance_strategy.your_plan.box_invest.annually_investment'),
        t('finance_strategy.your_plan.box_invest.one_time_investment'),
    ]

    // useFieldArray
    const {
        fields: annuallyInvestFields,
        append: annuallyInvestAppend,
        remove: annuallyInvestRemove,
    } = useFieldArray({
        control,
        name: 'financePlanning.investment.annuallyInvestmentBox',
    })

    const {
        fields: oneTimeInvestFields,
        append: oneTimeInvestAppend,
        remove: oneTimeInvestRemove,
    } = useFieldArray({
        control,
        name: 'financePlanning.investment.oneTimeInvestmentBox',
    })

    // Button add list invest
    const [openAddList, setOpenAddList] = React.useState(false)
    const anchorRef = React.useRef<HTMLButtonElement>(null)
    const handleToggleAddList = () => {
        setOpenAddList((prevOpen) => !prevOpen)
    }

    const handleCloseAddList = (
        event: Event | React.SyntheticEvent,
        index?: number
    ) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return
        }

        // Append default value
        if (index == 0)
            annuallyInvestAppend({
                savingMoney: Number(
                    getValues('UserFinanceStatusForm.savingMoney')
                ),
                period: Number(
                    getValues('UserFinanceGoalForm.UserInvestCard.period')
                ),
                age: Number(getValues('financePlanning.age.age')),
                periodicInvestment: 'month',
                checkBox: true,
            })
        if (index == 1)
            oneTimeInvestAppend({
                initialInvestAmount: Number(
                    getValues('UserFinanceStatusForm.initialInvestmentAmount')
                ),
                age: Number(getValues('financePlanning.age.age')),
                checkBox: true,
            })
        setOpenAddList(false)
    }

    function handleAddListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault()
            setOpenAddList(false)
        } else if (event.key === 'Escape') {
            setOpenAddList(false)
        }
    }

    const prevOpenAddList = useRef(openAddList)
    React.useEffect(() => {
        if (prevOpenAddList.current === true && openAddList === false) {
            anchorRef.current!.focus()
        }

        prevOpenAddList.current = openAddList
    }, [openAddList])

    // checkBox

    const handleSelectCheckBox = (
        event: React.ChangeEvent<HTMLInputElement>,
        index: number,
        type: string
    ) => {
        if (type === 'annually')
            setValue(
                `financePlanning.investment.annuallyInvestmentBox.${index}.checkBox`,
                event.target.checked
            )
        else
            setValue(
                `financePlanning.investment.oneTimeInvestmentBox.${index}.checkBox`,
                event.target.checked
            )
    }

    return (
        <Card className="finance_list">
            <CardHeader
                className="finance_list_title"
                title={t('finance_strategy.your_plan.box_invest.title')}
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
                            ref={anchorRef}
                            onClick={handleToggleAddList}
                        >
                            <DataSaverOnIcon
                                sx={{ marginRight: '8px', color: '#E8E2E2' }}
                            />
                            {t('wealth_tool.button_more')}
                        </IconButton>
                        {openAddList && (
                            <Popper
                                open={openAddList}
                                anchorEl={anchorRef.current}
                                role={undefined}
                                placement="bottom-start"
                                transition
                                disablePortal
                                style={{ zIndex: 1 }}
                            >
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{
                                            transformOrigin:
                                                placement === 'bottom-start'
                                                    ? 'right bottom'
                                                    : 'right top',
                                        }}
                                    >
                                        <Paper>
                                            <ClickAwayListener
                                                onClickAway={handleCloseAddList}
                                            >
                                                <MenuList
                                                    autoFocusItem={openAddList}
                                                    onKeyDown={
                                                        handleAddListKeyDown
                                                    }
                                                    sx={{
                                                        backgroundColor:
                                                            '#EAD3CB',
                                                        border: 'light 1px',
                                                        borderRadius: '4px',
                                                    }}
                                                >
                                                    {boxType.map(
                                                        (data, index) => (
                                                            <MenuItem
                                                                key={index}
                                                                value={index}
                                                                onClick={(
                                                                    event
                                                                ) =>
                                                                    handleCloseAddList(
                                                                        event,
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                <Typography
                                                                    variant="body1"
                                                                    fontWeight={
                                                                        'bold'
                                                                    }
                                                                >
                                                                    {data}
                                                                </Typography>
                                                            </MenuItem>
                                                        )
                                                    )}
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        )}
                    </Stack>
                }
            />

            <Box className="finance_list_data">
                <Stack spacing={0}>
                    {annuallyInvestFields.map((field, index) => (
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
                                            annuallyInvestRemove(index)
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
                                                'annually'
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
                                image={Assets.BoxDetailInvest}
                            />

                            <CardContent
                                sx={{
                                    padding: 0,
                                    paddingTop: '16px',
                                }}
                            >
                                <AnnuallyInvestment
                                    key={field.id}
                                    name={`${name}.annuallyInvestmentBox`}
                                    control={control}
                                    index={index}
                                    field={field}
                                    getValues={getValues}
                                />
                            </CardContent>
                        </Card>
                    ))}

                    {oneTimeInvestFields.map((field, index) => (
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
                                            oneTimeInvestRemove(index)
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
                                                'oneTime'
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
                                image={Assets.BoxDetailInvestOnetime}
                            />

                            <CardContent
                                sx={{
                                    padding: 0,
                                    paddingTop: '16px',
                                }}
                            >
                                <OneTimeInvestment
                                    key={field.id}
                                    name={`${name}.oneTimeInvestmentBox`}
                                    control={control}
                                    index={index}
                                    field={field}
                                    getValues={getValues}
                                />
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            </Box>
        </Card>
    )
}

export default BoxDetailInvestment
