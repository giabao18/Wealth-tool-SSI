import { Box, Grid, Link, Typography } from '@mui/material'
import React from 'react'
import './RightPanel.scss'
//component

// Form Hooks
import { UseFormGetValues } from 'react-hook-form'
import { IFormControl } from 'src/pages/wealthTool'
import { IWealthToolFormDataType } from 'src/redux/store'
import ButtonStyled from 'src/components/buttonStyled'
import { useTranslation } from 'react-i18next'
import FinancePlanningChart from '../chart/financePlanningChart'
import { IChartSeriesData } from '../leftPanelFinanceStrategy/dataPreprocessing/financePlanningDataPreprocessing'
import UserWealthChart from '../chart/userWealthPlanningChart'

interface IFinanceStrategyRightPanel extends IFormControl {
    getValues: UseFormGetValues<IWealthToolFormDataType>
    tab: string
}

const RightPanel: React.ComponentType<IFinanceStrategyRightPanel> = ({
    control,
    name,
    getValues,
    tab,
}) => {
    const { t } = useTranslation('wealth_tool')
    return (
        <>
            {tab === '1' && (
                <Box className="col_chart">
                    <Grid container spacing={0} className="col_chart_top">
                        <Grid item xs={12}>
                            <Typography
                                component="span"
                                fontWeight={'bold'}
                                fontSize={'16px'}
                            >
                                {t(
                                    'finance_strategy.right_panel.col_chart_top_text'
                                )}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FinancePlanningChart
                                {...{
                                    name,
                                    control,
                                    getValues,
                                }}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={1} className="col_chart_bottom">
                        <Grid
                            component="span"
                            item
                            xs={9}
                            style={{ paddingTop: '0px' }}
                        >
                            <Typography variant="body1" className="text">
                                {t(
                                    'finance_strategy.right_panel.col_chart_bot_text'
                                )}
                            </Typography>
                        </Grid>
                        <Grid item xs={3} style={{ paddingTop: '0px' }}>
                            <a href="https://www.ssi.com.vn/khach-hang-ca-nhan/mo-tai-khoan?utm_source=internal_link&utm_medium=website_button">
                                <ButtonStyled
                                    variant="contained"
                                    className="btn_invest"
                                >
                                    <Typography
                                        component="span"
                                        variant="body2"
                                    >
                                        {t('wealth_tool.button_invest_now')}
                                    </Typography>
                                </ButtonStyled>
                            </a>
                        </Grid>
                    </Grid>
                </Box>
            )}

            {tab === '2' && (
                <Box className="col_chart">
                    {/* <Grid container spacing={0} className="col_chart_top">
                        <Grid item xs={12}>
                            <Typography
                                component="span"
                                fontWeight={'bold'}
                                fontSize={'16px'}
                            >
                                {t(
                                    'finance_strategy.right_panel.col_chart_top_text'
                                )}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}> */}
                            <UserWealthChart {...{ name, control }} />
                        {/* </Grid>
                    </Grid>

                    <Grid container spacing={1} className="col_chart_bottom">
                        <Grid
                            component="span"
                            item
                            xs={9}
                            style={{ paddingTop: '0px' }}
                        >
                            <Typography variant="body1" className="text">
                                {t(
                                    'finance_strategy.right_panel.col_chart_bot_text'
                                )}
                            </Typography>
                        </Grid>
                        <Grid item xs={3} style={{ paddingTop: '0px' }}>
                            <ButtonStyled
                                variant="contained"
                                className="btn_invest"
                            >
                                <Typography component="span" variant="body2">
                                    {t('wealth_tool.button_invest_now')}
                                </Typography>
                            </ButtonStyled>
                        </Grid>
                    </Grid> */}
                </Box>
            )}
        </>
    )
}

export default RightPanel
