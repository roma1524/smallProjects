import { selectThemeMode } from "@/app/app-slice"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import { type Inputs, loginSchema } from "@/features/auth/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import Grid from "@mui/material/Grid2"
import TextField from "@mui/material/TextField"
import { Controller, type SubmitHandler, useForm } from "react-hook-form"
import styles from "./Login.module.css"
import { loginTC, selectIsLoggedIn } from "@/features/model/auth-slice.ts"
import { Navigate } from "react-router"
import { Path } from "@/common/routing"

export const Login = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const {
    register,
    handleSubmit,
    // reset,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(loginTC(data))
    console.log(data)
    // reset()
  }

  if(isLoggedIn) {
    return <Navigate to={Path.Main}/>
  }

  return (
    <Grid container justifyContent={"center"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>
            <p>
              To login get registered
              <a
                style={{ color: theme.palette.primary.main, marginLeft: "5px" }}
                href="https://social-network.samuraijs.com"
                target="_blank"
                rel="noreferrer"
              >
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>
              <b>Email:</b> free@samuraijs.com
            </p>
            <p>
              <b>Password:</b> free
            </p>
          </FormLabel>
          <FormGroup>
            <TextField label="Email" margin="normal" error={!!errors.email} {...register("email")} />
            {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
            <TextField
              type="password"
              label="Password"
              margin="normal"
              error={!!errors.email}
              {...register("password")}
            />
            {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}
            <FormControlLabel
              label={"Remember me"}
              control={
                <Controller
                  name={"rememberMe"}
                  control={control}
                  render={({ field: { value, ...field } }) => <Checkbox {...field} checked={value} />}
                />
              }
            />
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  )
}
