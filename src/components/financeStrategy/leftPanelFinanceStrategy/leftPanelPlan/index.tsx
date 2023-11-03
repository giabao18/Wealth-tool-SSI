import React, { useState } from 'react'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { TabList, TabPanel, TabContext } from '@mui/lab'
import { Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'
import './LeftPanel.scss'
import FinancePlanning from './financePlanning'
import { IFormControlFinanceStrategy } from '../..'
import UserWealth from './userWealth'

interface IFormControlFinanceStrategyLeftPanel
    extends IFormControlFinanceStrategy {
    tab: string
    setTab: React.Dispatch<React.SetStateAction<string>>
}

const LeftPanelFinance: React.ComponentType<
    IFormControlFinanceStrategyLeftPanel
> = ({ control, name, getValues, setValue, handleSubmit, tab, setTab }) => {
    //Language
    const { t } = useTranslation('wealth_tool')

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue)
    }

    return (
        <TabContext value={tab}>
            <TabList
                onChange={handleChange}
                textColor="inherit"
                className="tablist"
                TabIndicatorProps={{
                    style: {
                        backgroundColor: '#841818',
                    },
                }}
            >
                <Tab
                    className="tablist_item"
                    label={t('finance_strategy.your_plan.title')}
                    sx={{ width: '50%' }}
                    value="1"
                />
                <Tab
                    className="tablist_item"
                    sx={{ width: '50%' }}
                    label={t('finance_strategy.your_assets.title')}
                    value="2"
                />
            </TabList>
            <Box className="tab_wrapper">
                <TabPanel className="tab_wrapper_plan" value="1">
                    <FinancePlanning
                        {...{
                            getValues,
                            name,
                            control,
                            setValue,
                            handleSubmit,
                        }}
                    />
                </TabPanel>

                <TabPanel className="tab_wrapper_plan" value="2">
                    <Stack spacing={2}>
                        <UserWealth
                            {...{
                                getValues,
                                name,
                                control,
                                setValue,
                                handleSubmit,
                            }}
                        />
                    </Stack>
                </TabPanel>
            </Box>
        </TabContext>
    )
}

export default LeftPanelFinance
