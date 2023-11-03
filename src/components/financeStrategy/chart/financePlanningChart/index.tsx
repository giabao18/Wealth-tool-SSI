import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { useTranslation } from 'react-i18next'
import { UseFormGetValues, useWatch } from 'react-hook-form'
import { IFormControl } from 'src/pages/wealthTool'
import financePlanningChartsDataPreprocessing, {
    IChartSeriesData,
} from '../../leftPanelFinanceStrategy/dataPreprocessing/financePlanningDataPreprocessing'
import { IBoxDetailGoalData } from '../../leftPanelFinanceStrategy/leftPanelPlan/financePlanning/boxDetails/boxDetailGoal'
import { IBoxDetailInvestmentData } from '../../leftPanelFinanceStrategy/leftPanelPlan/financePlanning/boxDetails/boxDetailInvestment'

interface IAxis {
    xAxis: Array<string>
    yAxis: {
        recurringProfit: Array<number>
        investment: Array<number>
        spending: Array<number>
    }
}

const FinancePlanningChart = ({ name, control }: IFormControl) => {
    const { t } = useTranslation('wealth_tool')
    const data: IAxis = {
        xAxis: [],
        yAxis: {
            recurringProfit: [],
            investment: [],
            spending: [],
        },
    }

    // useWatch finance planning
    const InvestmentData: IBoxDetailInvestmentData = {
        annuallyInvestmentBox: useWatch({
            name: 'financePlanning.investment.annuallyInvestmentBox',
            control,
        }),
        oneTimeInvestmentBox: useWatch({
            name: 'financePlanning.investment.oneTimeInvestmentBox',
            control,
        }),
    }

    const GoalData: IBoxDetailGoalData = {
        shoppingBox: useWatch({
            name: 'financePlanning.goal.shoppingBox',
            control,
        }),
        educationBox: useWatch({
            name: 'financePlanning.goal.educationBox',
            control,
        }),
    }

    const CurrentAge = useWatch({
        name: 'financePlanning.age',
        control,
    })

    var financePlanningChartsData = financePlanningChartsDataPreprocessing(
        InvestmentData,
        GoalData,
        CurrentAge
    )

    if (financePlanningChartsData.column.investment != undefined) {
        for (
            let i = 0;
            i < financePlanningChartsData.area.recurringProfit.length;
            i++
        ) {
            data.xAxis.push(
                String(financePlanningChartsData.area.recurringProfit[i].year)
            )
            data.yAxis.recurringProfit.push(
                financePlanningChartsData.area.recurringProfit[i].value
            )
            data.yAxis.investment.push(
                financePlanningChartsData.column.investment[i].value
            )
            if (financePlanningChartsData.column.spending !== undefined)
                data.yAxis.spending.push(
                    financePlanningChartsData.column.spending[i].value
                )
        }
    }

    return (
        <div style={{ display: 'block', margin: '10px 10px 0 0' }}>
            <ReactApexChart
                width={'100%'}
                height={'410px'}
                type="line"
                series={[
                    {
                        name: t('finance_strategy.right_panel.series_invest'),
                        type: 'column',
                        data: data.yAxis.investment,
                        color: '#249DF1',
                    },
                    {
                        name: t('finance_strategy.right_panel.series_spending'),
                        type: 'column',
                        data: data.yAxis.spending,
                        color: '#526D82',
                    },
                    {
                        name: t(
                            'finance_strategy.right_panel.series_recurring_profit'
                        ),
                        type: 'area',
                        data: data.yAxis.recurringProfit,
                        color: '#14C38E',
                    },
                ]}
                options={{
                    chart: {
                        height: 350,
                        type: 'area',
                        stacked: false,
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        width: [0, 2, 5],
                        curve: 'smooth',
                    },
                    plotOptions: {
                        bar: {
                            columnWidth: '50%',
                        },
                    },

                    fill: {
                        opacity: [1, 1, 0.15],
                        gradient: {
                            inverseColors: false,
                            shade: 'light',
                            type: 'vertical',
                            opacityFrom: 0.85,
                            opacityTo: 0.55,
                            stops: [0, 100, 100, 100],
                        },
                    },
                    labels: data.xAxis,

                    markers: {
                        size: 0,
                    },
                    xaxis: {
                        tickAmount: 7,
                        // title: {
                        //     text: 'Age',
                        //     style: {
                        //         fontWeight: 'light',
                        //         fontSize: '15px',
                        //     },
                        // },
                    },
                    yaxis: {
                        labels: {
                            formatter: function (data) {
                                return (
                                    data +
                                    ' ' +
                                    t('finance_strategy.right_panel.yAxis')
                                )
                            },
                        },
                    },
                    tooltip: {
                        shared: true,
                        intersect: false,
                        y: {
                            formatter: function (y) {
                                if (typeof y !== 'undefined') {
                                    return `${y} millions Dong`
                                }
                                return y
                            },
                        },
                    },
                    legend: {
                        show: true,
                        position: 'top',
                        horizontalAlign: 'left',
                        fontSize: '15px',
                        offsetX: 12,
                        itemMargin: {
                            horizontal: 8,
                        },
                    },
                }}
            />
        </div>
    )
}

export default FinancePlanningChart
