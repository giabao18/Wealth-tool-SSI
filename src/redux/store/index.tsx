import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import UserWealthSlice, { IUserWealthDataRedux } from 'src/features/users/UserWealthSlice'
import WealthToolSlice from 'src/features/users/WealthToolSlice'
import { IWealthToolFormData } from 'src/features/users/WealthToolSlice'


export const Store = configureStore({
    reducer: {
        wealthTool: WealthToolSlice,
        userWealth: UserWealthSlice,
    },
})

export type {
    IWealthToolFormData as IWealthToolFormDataType,
    IUserWealthDataRedux as IUserWealthDataReduxType,
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch

// hooks typing
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
