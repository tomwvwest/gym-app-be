'use client'
import ExerciseCard from "@/app/components/exercises/exerciseCard";
import { useState, useEffect } from "react";
import { LoadingSkeleton } from "@/app/components/General/LoadingSkeleton";
import { ErrorPage } from '../../components/General/ErrorPage'
import ExerciseModal from "@/app/components/exercises/ExerciseModal";
import Link from "next/link";
import { Title } from "@/app/components/General/Title";

export default function Workout({ params }) {
    const [exercisesInWorkout, setExercisesInWorkout] = useState([]);
    const [allExercises, setAllExercises] = useState([]);
    const [fetchExercisesError, setFetchExercisesError] = useState(false);
    const [Error, setError] = useState(null);
    const [workoutIsLoading, setWorkoutIsLoading] = useState(true);
    const [workoutExercisesLoading, setWorkoutExercisesLoading] = useState(true);
    const [open, setOpen] = useState(false);

    const workout_id = params.workout_id;

    useEffect(() => {
        const fetchWorkouts = async () => {
            fetch(`/api/workouts/${workout_id}`)
            .then((res) => {
                if (!res.ok) { throw res }
                return res.json()
            })
            .then((data) => {
                setExercisesInWorkout(data)
            })
            .catch((error) => {
                setError(error)
            })
            .finally(() => {
                setWorkoutIsLoading(false)
            })
        }

        const fetchExercises = async () => {
            fetch(`/api/exercises/`)
            .then((res) => {
                if (!res.ok) { throw res }
                return res.json()
            })
            .then((data) => {
                setAllExercises(data)
            })
            .catch((error) => {
                setFetchExercisesError(error)
            })
            .finally(() => {
                setWorkoutExercisesLoading(false)
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

    if (workoutIsLoading) return <LoadingSkeleton />
    if (Error) return <ErrorPage error={Error}/>

    return (
        <main>
            <Title text={`Workout ${workout_id}`}/>
            <div className="w-fit">
                <Link href="/workouts"><p>All Workouts</p></Link>
            </div>
            <ul>
                {!exercisesInWorkout.length ? <p>Add an exercise!</p> : null}
                {exercisesInWorkout.map(((exercise) => {
                    return (
                        <li key={exercise.exercise_id} className="border p-4 m-2 rounded-lg">
                            <ExerciseCard
                                workout_id={workout_id}
                                exercise={exercise}
                                setExercises={setExercisesInWorkout}
                                workoutExercisesLoading={workoutExercisesLoading}/>
                        </li>
                    )
                }))}
            </ul>
            <button className="border rounded-lg px-2 py-1" onClick={handleShowExercises}>Add Exercise</button>
            <ExerciseModal 
                setExercisesInWorkout={setExercisesInWorkout}
                exercisesInWorkout={exercisesInWorkout}
                allExercises={allExercises}
                workout_id={workout_id}
                visible={open}
                onClose={() => {setOpen(false)}}
                fetchExercisesError={fetchExercisesError}
            />
        </main>
    )
}