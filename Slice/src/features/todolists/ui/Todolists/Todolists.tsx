import {useAppDispatch, useAppSelector} from "@/common/hooks"

import {TodolistItem} from "./TodolistItem/TodolistItem"
import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import {useEffect} from "react";
import {selectTodolists} from "@/features/todolists/model/todolists-selectors.ts";
import {fetchTodolistsTC} from "@/features/todolists/model/todolists-slice.ts";

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  } , [])

  return (
    <>
      {todolists.map((todolist) => (
        <Grid key={todolist.id}>
          <Paper sx={{ p: "0 20px 20px 20px" }}>
            <TodolistItem todolist={todolist} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}
