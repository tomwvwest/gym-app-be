'use client'
import ExerciseCard from "@/app/components/exercises/exerciseCard";
import { useState, useEffect } from "react";
import { LoadingSkeleton } from "@/app/components/General/LoadingSkeleton";
import { ErrorPage } from '../../components/General/ErrorPage'
import ExerciseModal from "@/app/components/exercises/ExerciseModal";

export default function Workout({ params }) {
    const [exercises, setExercises] = useState([]);
    const [exerciseList, setExerciseList] = useState([]);
    const [Error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false)

    const workout_id = params.workout_id;

    useEffect(() => {
        const fetchWorkouts = async () => {
            fetch(`/api/workouts/${workout_id}`)
            .then((res) => {
                if (!res.ok) { throw res }
                return res.json()
            })
            .then((data) => {
                // console.log('data:', data)
                setExercises(data)
            })
            .catch((error) => {
                // console.log('GET Workout Error:', error)
                setError(error)
            })
            .finally(() => {
                setIsLoading(false)
            })
        }

        const fetchExercises = async () => {
            fetch(`/api/exercises`)
            .then((res) => {
                // console.log('Exercises:', res)
                if (!res.ok) { throw res }
                return res.json()
            })
            .then((data) => {
                // console.log('Exercises data:', data)
                setExerciseList(data)
            })
            .catch((error) => {
                // console.log('GET Exercises Error:', error)
                setError(error)
            })
            .finally(() => {
                setIsLoading(false)
            })
        }

        const fetchData = async () => {
            fetchWorkouts();
            fetchExercises();
        }

        fetchData();
    }, [])

    const handleShowExercises = async (event) => {
        event.preventDefault()
        setOpen(true)

    }

    if (isLoading) return <LoadingSkeleton />
    if (Error) return <ErrorPage error={Error}/>

    return (
        <main>
            <h1>Workout {params.workout_id}</h1>
            <ul>
                {exercises.map(((exercise) => {
                    console.log(exercise)
                    return (
                        <li key={exercise.exercise_id} className="border p-4 m-2 rounded-lg">
                            <ExerciseCard exercise={exercise}/>
                        </li>
                    )
                }))}
            </ul>
            <button className="border rounded-lg px-2 py-1" onClick={handleShowExercises}>Add Exercise</button>
            <ExerciseModal setExercises={setExercises} exercises={exercises} exerciseList={exerciseList} workout_id={workout_id} visible={open} onClose={() => {setOpen(false)}}/>
        </main>
    )
}