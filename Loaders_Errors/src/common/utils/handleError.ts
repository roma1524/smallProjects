import { isErrorWithMessage } from "@/common/utils/isErrorWithMessage.ts"
import { setAppErrorAC } from "@/app/app-slice.ts"
import { ResultCode } from "@/common/enums"
import { BaseQueryApi, FetchBaseQueryError, FetchBaseQueryMeta, QueryReturnValue } from "@reduxjs/toolkit/query"

export const handleError = (result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>, api: BaseQueryApi) => {
  let error = 'Some error occurred'

  if (result.error) {
    switch (result.error.status) {
      case 'FETCH_ERROR':
      case 'PARSING_ERROR':
      case 'CUSTOM_ERROR':
        error = result.error.error
        break
      case 403:
        error = '403 Forbidden Error. Check API-KEY'
        break
      case 400:
      case 500:
        if (isErrorWithMessage(result.error.data)) {
          error = result.error.data.message
        } else {
          error = JSON.stringify(result.error.data)
        }
        break
      default:
        error = JSON.stringify(result.error)
        break
    }
    api.dispatch(setAppErrorAC({ error }))
  }

  if ((result.data as { resultCode: ResultCode }).resultCode === ResultCode.Error) {
    const messages = (result.data as { messages: string[] }).messages
    error = messages.length ? messages[0] : error
    api.dispatch(setAppErrorAC({ error }))
  }
}