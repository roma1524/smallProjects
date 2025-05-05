import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { AUTH_TOKEN } from "@/common/constants"
import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { BaseResponse } from "@/common/types"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"

export const todolistsApi = createApi({
  tagTypes: ["TLists"],
  reducerPath: "todolistsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("API-KEY", import.meta.env.VITE_API_KEY)
      headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
    },
  }),
  endpoints: (build) => ({
    getTodolists: build.query<DomainTodolist[], void>({
      query: () => "todo-lists",
      transformResponse: (todoLists: Todolist[]): DomainTodolist[] =>
        todoLists.map((t) => ({ ...t, filter: "all", entityStatus: "idle" })),
      providesTags: ["TLists"],
    }),
    createTodolist: build.mutation<BaseResponse<{ item: Todolist }>, string>({
      query: (title) => ({
        url: "/todo-lists",
        method: "POST",
        body: { title },
      }),
      invalidatesTags: ["TLists"],
    }),
    deleteTodolist: build.mutation<BaseResponse, string>({
      query: (id) => ({
        url: `/todo-lists/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TLists"],
    }),
    changeTodolistTitle: build.mutation<BaseResponse, { id: string; title: string }>({
      query: ({ id, title }) => ({
        url: `/todo-lists/${id}`,
        method: "PUT",
        body: { title },
      }),
      invalidatesTags: ["TLists"],
    }),
  }),
})

export const {
  useGetTodolistsQuery,
  useCreateTodolistMutation,
  useDeleteTodolistMutation,
  useChangeTodolistTitleMutation,
} = todolistsApi
