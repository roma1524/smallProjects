import {createAction, createReducer, createSlice} from "@reduxjs/toolkit"


// const initialState = {
//     themeMode: "light" as ThemeMode,
// }


export const appSlice = createSlice({
    name: "app",
    initialState: {
        themeMode: "light" as ThemeMode,
    },
    reducers: (create) => ({
        changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
            state.themeMode = action.payload.themeMode
        })

    })
})

export const appReducer = appSlice.reducer
export const {changeThemeModeAC} = appSlice.actions

// export const changeThemeModeAC = createAction<{ themeMode: ThemeMode }>("app/changeThemeMode")
//
//
// export const appReducer = createReducer(initialState, (builder) => {
//     builder.addCase(changeThemeModeAC, (state, action) => {
//         state.themeMode = action.payload.themeMode
//     })
// })

export type ThemeMode = "dark" | "light"
