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
        <section className="flex">
            <div className="w-[80%] p-1">
                {isLoading ? <p>Loading...</p> : null}
                <h2 className='font-bold'>{exercise.name}</h2>
                <div className="flex text-sm font-light h-5">
                    <p className="pr-2">{exercise.muscle}</p>
                    <p className="pr-2">{exercise.difficulty}</p>
                    <p className="pr-2 hidden md:flex lg:flex">{exercise.equipment}</p>
                </div>
                {postWorkoutError ? <p>Error adding exercise to workout. Please try again.</p> : null}
                {getExerciseError ? <p>Error finding exercise. Please try again.</p>: null}
            </div>
            <div className='h-full flex justify-center w-[20%]'>
                <button onClick={handleAddToWorkout}>
                    <img className="h-full max-h-20" src='/add.svg'></img>
                </button>
            </div>
        </section>
    )
}