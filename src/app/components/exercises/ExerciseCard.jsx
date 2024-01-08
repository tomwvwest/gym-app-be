import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { LoadingSkeleton } from "@/app/components/General/LoadingSkeleton";

export default function ExerciseCard({ workout_id, exercise, setExercises, workoutExercisesLoading }) {
    const searchParams = useSearchParams();
    const [removeWorkoutIsLoading, setRemoveWorkoutIsLoading] = useState(false)
    const [removeError, setRemoveError] = useState(null);

    const handleRemoveFromWorkout = () => {
        setRemoveWorkoutIsLoading(true);
        const params = new URLSearchParams(searchParams);
        params.set('exercise_id', exercise.exercise_id);

        fetch(`/api/workouts/${workout_id}`, {
            method: 'DELETE',
            headers: { exercise_id: exercise.exercise_id },
        })
        .then((res) => {
            if (!res.ok) { throw res }

            setExercises((currentExercises) => {
                return currentExercises.filter((exerciseObj) => {
                    return exerciseObj.exercise_id !== exercise.exercise_id
                })
            })

            return res
        })
        .catch((error) => {
            setRemoveError(error)
        })
        .finally(() => {
            setTimeout(() => {
                setRemoveWorkoutIsLoading(false)
            }, 3000)
        })
    }
    
    if (workoutExercisesLoading) return <LoadingSkeleton />

    return (
        <section>
            {workoutExercisesLoading ? <LoadingSkeleton /> : null}
            <h2>{exercise.name}</h2>
            <p>{exercise.muscle}</p>
            <button onClick={handleRemoveFromWorkout} className="border rounded-lg px-2 py-1">Remove</button>
            {removeWorkoutIsLoading ? (removeError ? <p>Could not remove exercise. Please try again.</p> : <p>Removing...</p>) : null}
        </section>
    )
}