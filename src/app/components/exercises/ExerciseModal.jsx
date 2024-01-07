import { useState, useEffect } from "react";
import ExerciseListCard from "./ExerciseListCard";
import { LoadingSkeleton } from "@/app/components/General/LoadingSkeleton";
import { ErrorPage } from '../../components/General/ErrorPage'

export default function ExerciseModal({ exercises, setExercises, exerciseList, workout_id, visible, onClose }) {
    const [Error, setError] = useState(null);

    if (!visible) { return null }

    if (Error) return <ErrorPage error={Error}/>

    return (
        <section className="border bg-platinum">
            <button onClick={onClose}>Close</button>
            <h1>All Exercises</h1>
            <ul>
                {exerciseList.map(((exercise) => {
                    return (
                        <li key={exercise.exercise_id} className="border p-2 m-2 rounded-lg">
                            <ExerciseListCard exercises={exercises} setExercises={setExercises} workout_id={workout_id} exercise={exercise}/>
                        </li>
                    )
                }))}
            </ul>
        </section>
    )
}