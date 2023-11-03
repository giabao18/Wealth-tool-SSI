import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUserFinanceStatusData } from 'src/components/wealthtoolForm/userFinanceStatus'
import { IUserInfoData } from 'src/components/wealthtoolForm/userInfo'
import { IUserFinanceGoalData } from 'src/components/wealthtoolForm/userFinanceGoal'
import { IUserWealthData } from 'src/components/financeStrategy/leftPanelFinanceStrategy/leftPanelPlan/userWealth/boxDetails'
import { IFinancePlanningData } from 'src/components/financeStrategy/leftPanelFinanceStrategy/leftPanelPlan/financePlanning'

export interface IWealthToolFormData {
    UserInfoForm: IUserInfoData
    UserFinanceGoalForm: IUserFinanceGoalData
    UserFinanceStatusForm: IUserFinanceStatusData
    financePlanning: IFinancePlanningData
    userWealth: IUserWealthData
}

const initialState: IWealthToolFormData = {
    UserInfoForm: {
        age: 30,
        maritalStatus: 'married',
        workType: 'wage',
    },
    UserFinanceGoalForm: {
        UserEducationCard: {
            status: false,
            period: 4,
            childCurrentAge: 14,
            childFutureAge: 18,
            collegeTime: 4,
            tuitionFees: 100,
        },
        UserInvestCard: {
            status: false,
            period: 10,
        },
        UserShoppingCard: {
            status: false,
            price: 300,
            period: 5,
        },
    },
    UserFinanceStatusForm: {
        savingMoney: 100,
        periodicInvestment: 'Month',
        initialInvestmentAmount: 1000,
    },
    financePlanning: {
        age: {
            age: 0,
        },
        goal: {
            shoppingBox: [],
            educationBox: [],
        },
        investment: {
            annuallyInvestmentBox: [],
            oneTimeInvestmentBox: [],
        },
    },
    userWealth: {
        monthlySaving: {
            income: [],
            incomeDialog: {
                index: 0,
                incomeType: '',
                value: 20,
                period: '',
            },
            spending: [],
            spendingDialog: {
                index: 0,
                spendingPurpose: '',
                value: 0,
                period: '',
            },
        },
        netAssets: {
            debt: [],
            debtDialog: {
                date: new Date('2023-12-23'),
                debtType: '',
                value: 0,
                rate: 5,
                period: '',
                dueDate: 3,
            },
            property: [],
            propertyDialog: {
                propertyType: '',
                value: 0,
                trend: '',
                rate: 0,
                period: '',
            },
        },
    },
}

export const WealthToolFormData = createSlice({
    name: 'wealthToolForm',
    initialState,
    reducers: {
        addFormData: (state, action: PayloadAction<IWealthToolFormData>) => {
            state = { ...state, ...action.payload }
        },
    },
})

export const { addFormData } = WealthToolFormData.actions
export default WealthToolFormData.reducer
