import { instance } from "@/common/instance"
import type { BaseResponse } from "@/common/types"
import { LoginArgs } from "@/features/auth/api/authApi.types.ts"

export const authApi = {
  login(payload: LoginArgs) {
    return instance.post<BaseResponse<{ userId: number; token: string }>>("auth/login", payload)
  },
}