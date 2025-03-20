import { setAppErrorAC, setAppStatusAC } from "@/app/app-slice.ts"
import { Dispatch } from "@reduxjs/toolkit"

export const handleServerNetworkError = (dispatch: Dispatch, error: {message: string}) => {
  dispatch(setAppErrorAC({error: error.message}))
  dispatch(setAppStatusAC({ status: "failed" }))
}