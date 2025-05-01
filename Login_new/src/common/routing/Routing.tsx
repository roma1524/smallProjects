import {Main} from "@/app/Main"
import {PageNotFound} from "@/common/components"
import {Login} from "@/features/auth/ui/Login/Login"
import {Route, Routes} from "react-router"
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute.tsx";
import {useAppSelector} from "@/common/hooks";
import {selectIsLoggedIn} from "@/features/auth/model/auth-slice.ts";

export const Path = {
    Main: "/",
    Login: "/login",
    NotFound: "*",
} as const

export const Routing = () => {

    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    return (<Routes>
            <Route path={Path.Main} element={<ProtectedRoute isAllowed={isLoggedIn}><Main/></ProtectedRoute>}/>

            <Route path={Path.Login}
                   element={<ProtectedRoute isAllowed={!isLoggedIn} redirectPath={Path.Main}><Login/></ProtectedRoute>}/>
            <Route path={Path.NotFound} element={<PageNotFound/>}/>
        </Routes>
    )
}
