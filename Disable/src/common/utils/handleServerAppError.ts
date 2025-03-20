import { setAppErrorAC, setAppStatusAC } from "@/app/app-slice"
import type { Dispatch } from "@reduxjs/toolkit"
import axios from "axios"

export const handleServerAppError = (error: unknown, dispatch: Dispatch) => {
  let errorMessage

  if (axios.isAxiosError(error)) {
    errorMessage = JSON.stringify(error)
  } else if (error instanceof Error) {
    errorMessage = error.message
  } else {
    errorMessage = JSON.stringify(error)
  }

  dispatch(setAppErrorAC({ error: "Some error occurred" }))
  dispatch(setAppStatusAC({ status: "failed" }))
}
