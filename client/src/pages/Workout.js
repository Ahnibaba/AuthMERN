import { useEffect, useState } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
//import WorkoutDetails from "../components/WorkoutDetails"
import { formatDistanceToNow } from "date-fns/formatDistanceToNow"
import Loading from "../components/Loading/Loading"
import axios from "axios"

const Workout = () => {
    const { id } = useParams()
    const { user } = useAuthContext()
    const { dispatch, workouts } = useWorkoutsContext()

    const [workoutState, setWorkoutState] = useState([])



    const { pathname } = useLocation()
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)

    const handleClick = async () => {
        if (!user) {
            return
        }
        const response = await fetch(`http://localhost:4000/api/workouts/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        
        

        if (response.ok) {
            if(pathname !== "/") {
                navigate("/")
            }
            dispatch({ type: "DELETE_WORKOUT", payload: json })
            setWorkoutState([])

           

            
        }
    }

    
    
    

    useEffect(() => {
        const fetchWorkout = async () => {
            setIsLoading(true)
            const response = await axios.get("http://localhost:4000/api/workouts/", {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })


            if (response.statusText) {
                dispatch({ type: "SET_WORKOUTS", payload: response.data })
                setIsLoading(false)
            }

            const single =  workouts.filter((item) => item._id === id)
            setWorkoutState(single)
        }
        fetchWorkout()
    }, [id, user, dispatch])

    console.log(workouts);



    return (
        <div className="home">
            {isLoading ? <Loading />
                : (
                    <>
                        <div className="workouts">
                            {workoutState && workoutState.map((item) => {
                               return <div className="workout-details">
                                    <h4>{item.title}</h4>
                                    <p><strong>Load (kg): </strong>{item.load}</p>
                                    <p><strong>Reps: </strong>{item.reps}</p>
                                    <p>{workoutState.createdAt && formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</p>
                                    <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
                                </div>
                            })
                                
                            }
                        </div>

                    </>
                )
            }
        </div>
    )
}

export default Workout














// import { useParams } from "react-router-dom";
// import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
// import WorkoutDetails from "../components/WorkoutDetails";
// //import Loading from "../components/Loading/Loading"

// const Workout = () => {
//     const { id } = useParams();
//     const { workouts } = useWorkoutsContext();

//     const workout = workouts.find((item) => {
//         return item._id === id;
//     });

//     console.log(workout);

//     return (
//         <div className="home">
//             <div className="workouts">
//                 {workout && (
//                     <WorkoutDetails key={workout._id} workout={workout} />
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Workout;
