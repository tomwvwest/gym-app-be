import Link from "next/link";
import { useState } from 'react';

export default function WorkoutCard ({ workout, setWorkouts, setIsDeleted }) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [removeError, setRemoveError] = useState(null);
    const {workout_id} = workout

    const handleRemoveFromWorkout = () => {
        setIsDeleting(true);

        fetch(`/api/workouts`, {
            method: 'DELETE',
            headers: { workout_id },
        })
        .then((res) => {
            if (!res.ok) { throw res }

            setWorkouts((currentWorkouts) => {
                return currentWorkouts.filter((workoutObj) => {
                    return workoutObj.workout_id !== workout_id
                })
            })

            setIsDeleted(true)

            return res
        })
        .catch((error) => {
            setRemoveError(error)
        })
        .finally(() => {
            setTimeout(() => {
                setRemoveError('')
                setIsDeleting(false)
                setIsDeleted(false)
            }, 3000)
        })
    }

    return (
        <div className="border p-3 mt-5 ml-2 rounded-xl w-full">
            <Link href={`/workouts/${workout_id}`}>
                <p className="text-lg">{workout.workout_name}</p>
            </Link>
            <button onClick={handleRemoveFromWorkout}>Delete</button>
            {isDeleting ? (removeError ? <p>Could not delete workout. Please try again.</p> : <p>Deleting...</p>): null}
        </div>
    )
}