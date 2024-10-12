import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

//date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow"

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    const { pathname } = useLocation()
    const navigate = useNavigate()

    const handleClick = async () => {
        if (!user) {
            return
        }
        const response = await fetch(`http://localhost:4000/api/workouts/${workout._id}`, {
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

            
        }
    }
    

    return (
        
            <div className="workout-details">
            <Link to={`/${workout._id}`}>
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            </Link>
            <p>{workout.createdAt && formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
        
    )
}


export default WorkoutDetails