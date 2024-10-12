import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from "./useWorkoutsContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const log = useWorkoutsContext()

    const logout = () => {
        // reomove user from storage
        localStorage.removeItem("user")

        // dispatch logout action
        log.dispatch({ type: "SET_WORKOUTS", payload: [] })
        dispatch({ type: "LOGOUT" })
        
    }
    return {
        logout
    }

}

 