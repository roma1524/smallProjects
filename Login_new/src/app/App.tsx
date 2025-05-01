import s from './App.module.css'
import { selectThemeMode } from "@/app/app-slice"
import { ErrorSnackbar, Header } from "@/common/components"
import {useAppDispatch, useAppSelector} from "@/common/hooks"
import { Routing } from "@/common/routing"
import { getTheme } from "@/common/theme"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import {useEffect, useState} from "react";
import {meTC} from "@/features/auth/model/auth-slice.ts";
import {CircularProgress} from "@mui/material";

export const App = () => {
  const [isInitialized, setIsInitialized] = useState(false)

  const themeMode = useAppSelector(selectThemeMode)
  const dispatch = useAppDispatch()

  const theme = getTheme(themeMode)

  useEffect(() => {
    dispatch(meTC()).then(() => {
      setIsInitialized(true)
    })
  }, [])

  if (!isInitialized) {
    return (
        <div className={s.circularProgressContainer}>
          <CircularProgress size={150} thickness={3} />
        </div>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={s.app}>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  )
}
