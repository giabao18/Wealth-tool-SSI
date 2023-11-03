import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IIncome } from 'src/components/financeStrategy/leftPanelFinanceStrategy/leftPanelPlan/userWealth/boxDetails/boxDetailMonthlySaving/income'
import { ISpending } from 'src/components/financeStrategy/leftPanelFinanceStrategy/leftPanelPlan/userWealth/boxDetails/boxDetailMonthlySaving/spending'
import { IDebt } from 'src/components/financeStrategy/leftPanelFinanceStrategy/leftPanelPlan/userWealth/boxDetails/boxDetailNetAssets/debt'
import { IProperty } from 'src/components/financeStrategy/leftPanelFinanceStrategy/leftPanelPlan/userWealth/boxDetails/boxDetailNetAssets/property'

export interface IUserWealthDataRedux {
    debt: IDebt[]
    property: IProperty[]
    income: IIncome[]
    spending: ISpending[]
}

const userWealthInitialData: IUserWealthDataRedux = {
    debt: [],
    property: [],
    income: [],
    spending: [],
}

export const UserWealthDataType = createSlice({
    name: 'userWealth',
    initialState: userWealthInitialData,
    reducers: {
        passProps: (state, action: PayloadAction<IUserWealthDataRedux>) => {
            return action.payload
        },
    },
})

export const { passProps } = UserWealthDataType.actions
export default UserWealthDataType.reducer
