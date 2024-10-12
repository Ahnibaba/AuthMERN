import { useEffect, useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import Loading from "../components/Loading/Loading"

import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"


const Home = () => {

    const { workouts, dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchWorkouts = async () => {
            setIsLoading(true)
            const response = await fetch("http://localhost:4000/api/workouts", {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })
            const json = await response.json()




            if (response.ok) {
                dispatch({ type: "SET_WORKOUTS", payload: json })
                setIsLoading(false)
            }
            
        }
        if (user) {
            fetchWorkouts()
        }
        
    }, [dispatch, user])
    return (
        <div className="home">
            {isLoading ? <Loading />
                : (
                    <>
                        <div className="workouts">
                            {workouts.length > 0 ? workouts.map((workout) => (
                                <WorkoutDetails key={workout._id} workout={workout} />
                            )) : <div>No Workout Added</div>}
                        </div>
                        <WorkoutForm />
                    </>
                )
            }
        </div>
    )
}

export default Home