import { createAppSlice, handleServerAppError } from "@/common/utils"
import { Inputs } from "@/features/auth/lib/schemas"
import { setAppStatusAC } from "@/app/app-slice.ts"
import { authApi } from "@/features/auth/api/authApi.ts"
import { ResultCode } from "@/common/enums"
import { LoginArgs } from "@/features/auth/api/authApi.types.ts"


export const authSlice = createAppSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  selectors: {
    selectIsLoggedIn: state => state.isLoggedIn,
  },
  reducers: (create) => ({
    loginTC: create.asyncThunk(
      async (data: LoginArgs, { dispatch, rejectWithValue }) => {
        // логика санки для авторизации
        try {
          dispatch(setAppStatusAC({status: 'loading'}))
          const res = await authApi.login(data)
          console.log(res.data)
          if(res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            debugger
            return {isLoggedIn: true}
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerAppError(error, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
        },
      },
    ),
  }),
})

export const { selectIsLoggedIn } = authSlice.selectors
export const { loginTC } = authSlice.actions
export const authReducer = authSlice.reducer