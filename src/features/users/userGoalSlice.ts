import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../../redux/store";

export interface UserGoal {
  investment: string;
  shopping: string;
  education: {};
}
const initialState: Array<UserGoal> = [
    {
        investment: '30',
        shopping: 'Home',
        education: [10, 18, 4, 480],
    }
]
export const userGoalSlice = createSlice({
  name: "userGoal",
  initialState,
  reducers: {
    addUserGoal: (state, action: PayloadAction<UserGoal>) => {
      state.push(action.payload);
    },
  },
});
export const { addUserGoal } =
userGoalSlice.actions;
// export const userInfoSelector = (state: RootState) => state.userInfoReducer;
export default userGoalSlice.reducer;
