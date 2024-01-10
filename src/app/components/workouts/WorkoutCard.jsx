import Link from "next/link";
import { useState } from 'react';
import styles from "@/app/style";

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
        <div className={`${styles.card} flex justify-between content-center w-full`}>
            <div className="w-[70%] h-9 flex items-center">
                <Link className="h-fit" href={`/workouts/${workout_id}`}>
                    <p className={`${styles.cardTitle}`}>{workout.workout_name}</p>
                </Link>
            </div>
            <div className="flex justify-end w-[30%] pr-2">
                <button onClick={handleRemoveFromWorkout}>
                    <img className="h-9" src="/delete.svg"></img>
                </button>
            </div>
            {isDeleting ? (removeError ? <p>Could not delete workout. Please try again.</p> : <p>Deleting...</p>): null}
        </div>
    )
}