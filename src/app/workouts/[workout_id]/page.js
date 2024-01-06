'use client'
import ExerciseCard from "@/app/components/exercises/exerciseCard";
import { useState, useEffect } from "react";
import { LoadingSkeleton } from "@/app/components/General/LoadingSkeleton";
import { ErrorPage } from '../../components/General/ErrorPage'

export default function Workout({ params }) {
    const [exercises, setExercises] = useState([]);
    const [Error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const workout_id = params.workout_id;

    useEffect(() => {
        fetch(`/api/workouts/${workout_id}`)
        .then((res) => {
            if (!res.ok) { throw res }
            return res.json()
        })
        .then((data) => {
            console.log('data:', data)
            setExercises(data)
        })
        .catch((error) => {
            console.log('Error:', error)
            setError(error)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }, [])

    if (isLoading) return <LoadingSkeleton />
    if (Error) return <ErrorPage error={Error}/>

    return (
        <main>
            <h1>Workout {params.workout_id}</h1>
            <ul>
                {exercises.map(((exercise) => {
                    return (
                        <li key={exercise.exercise_id} className="border p-4 m-2 rounded-lg">
                            <ExerciseCard exercise={exercise}/>
                        </li>
                    )
                }))}
            </ul>
        </main>
    )
}