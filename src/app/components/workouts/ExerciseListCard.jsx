import { useState, useEffect } from "react";
import { LoadingSkeleton } from "@/app/components/General/LoadingSkeleton";
import { ErrorPage } from '../../components/General/ErrorPage'

export default function ExerciseListCard ({ exercisesInWorkout, setExercisesInWorkout, workout_id, exercise }) {
    const [postWorkoutError, setPostWorkoutError] = useState(false);
    const [getExerciseError, setGetExerciseError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const newExercise = {
        workout_id: workout_id,
        exercise_id: exercise.exercise_id
    }

    let newExerciseObj = {};

    const handleAddToWorkout = async () => {
        const fetchNewExercise = async () => {
            fetch(`/api/exercises/${exercise.exercise_id}`)
            .then((res) => {
                if (!res.ok) { throw res }
                return res.json()
            })
            .then((data) => {
                newExerciseObj = data;
                setExercisesInWorkout([newExerciseObj, ...exercisesInWorkout])
                return data
            })
            .catch((error) => {
                setGetExerciseError(error)
            })
        }

        fetchNewExercise()

        const postWorkout = async () => {
            fetch(`/api/workouts/${workout_id}`, {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newExercise)
            })
            .then((res) => {
                if (!res.ok) { throw res }
                return res.json()
            })
            .catch((error) => {
                setPostWorkoutError(error)
            })
            .finally(() => {
                setIsLoading(false)
            })
        }

        postWorkout()
    }

    return (
        <section>
            {isLoading ? <p>Loading...</p> : null}
            <h2>{exercise.name}</h2>
            <p>{exercise.muscle}</p>
            <p>{exercise.difficulty}</p>
            <button onClick={handleAddToWorkout} className="border rounded-lg px-2 py-1">Add to Workout</button>
            {postWorkoutError ? <p>Error adding exercise to workout. Please try again.</p> : null}
            {getExerciseError ? <p>Error finding exercise. Please try again.</p>: null}
        </section>
    )
}