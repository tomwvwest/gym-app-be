import { useState, useEffect } from "react";
import { LoadingSkeleton } from "@/app/components/General/LoadingSkeleton";
import { ErrorPage } from '../../components/General/ErrorPage'

export default function ExerciseListCard ({ exercises, setExercises, workout_id, exercise }) {
    const [Error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // for optimistic rendering, might need to GET exercise by exercise_id to find the name and muscle group
    const newExercise = {
        workout_id: workout_id,
        exercise_id: exercise.exercise_id
    }

    const handleAddToWorkout = async () => {
        setExercises([newExercise, ...exercises])

        fetch(`/api/workouts/${workout_id}`, {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newExercise)
        })
        .then((res) => {
            // console.log('Exercises:', res)
            if (!res.ok) { throw res }
            return res.json()
        })
        .then((data) => {
            // console.log('Exercises data:', data)
        })
        .catch((error) => {
            // console.log('POST Exercises Error:', error)
            setError(error)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    if (isLoading) return <LoadingSkeleton />
    if (Error) return <ErrorPage error={Error}/>

    return (
        <section>
        <h2>{exercise.name}</h2>
        <p>{exercise.muscle}</p>
        <button onClick={handleAddToWorkout} className="border rounded-lg px-2 py-1">Add to Workout</button>
    </section>
    )
}