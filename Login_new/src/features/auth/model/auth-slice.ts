import {LoginInputs} from "@/features/auth/lib/schemas";
import {createAppSlice, handleServerAppError, handleServerNetworkError} from "@/common/utils";
import {setAppStatusAC} from "@/app/app-slice.ts";
import {authApi} from "@/features/auth/api/authApi.ts";
import {ResultCode} from "@/common/enums";
import {AUTH_TOKEN} from "@/common/constants";

export const authSlice = createAppSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    selectors: {
        selectIsLoggedIn: state => state.isLoggedIn
    },
    reducers: (create) => ({
        loginTC: create.asyncThunk(
            async (args: LoginInputs, {dispatch, rejectWithValue}) => {
                try {
                    dispatch(setAppStatusAC({status: "loading"}))
                    const res = await authApi.login(args)
                    if (res.data.resultCode === ResultCode.Success) {
                        dispatch(setAppStatusAC({status: "succeeded"}))
                        localStorage.setItem(AUTH_TOKEN, res.data.data.token)
                        return {isLoggedIn: true}
                    } else {
                        handleServerAppError(res.data, dispatch)
                        return rejectWithValue(null)
                    }
                } catch (error) {
                    handleServerNetworkError(dispatch, error)
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.isLoggedIn = action.payload.isLoggedIn
                }
            }
        ),
        logoutTC: create.asyncThunk(
            async (_args, {dispatch, rejectWithValue}) => {
                try {
                    dispatch(setAppStatusAC({status: "loading"}))
                    const res = await authApi.logout()
                    if (res.data.resultCode === ResultCode.Success) {
                        dispatch(setAppStatusAC({status: "succeeded"}))
                        localStorage.removeItem(AUTH_TOKEN)
                        return {isLoggedIn: false}
                    } else {
                        handleServerAppError(res.data, dispatch)
                        return rejectWithValue(null)
                    }
                } catch (error) {
                    handleServerNetworkError(dispatch, error)
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.isLoggedIn = action.payload.isLoggedIn
                }
            }
        ),
        meTC: create.asyncThunk(
            async (_args, {dispatch, rejectWithValue}) => {
                try {
                    dispatch(setAppStatusAC({status: "loading"}))
                    const res = await authApi.meQ()
                    if (res.data.resultCode === ResultCode.Success) {
                        dispatch(setAppStatusAC({status: "succeeded"}))
                        return {isLoggedIn: true}
                    } else {
                        handleServerAppError(res.data, dispatch)
                        return rejectWithValue(null)
                    }
                } catch (error) {
                    handleServerNetworkError(dispatch, error)
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.isLoggedIn = action.payload.isLoggedIn
                }
            }
        ),
    })
})

export const {selectIsLoggedIn} = authSlice.selectors
export const {loginTC, logoutTC, meTC} = authSlice.actions
export const authReducer = authSlice.reducer