'use client'

import { Title } from "../components/General/Title"
import { useState, useEffect } from "react";
import AllExercisesList from "../components/exercises/AllExercisesList";


export default function Exercises () {
    const [allExercises, setAllExercises] = useState([]);

    useEffect(() => {
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
                // setFetchExercisesError(error)
            })
            .finally(() => {
                // setWorkoutExercisesLoading(false)
            })
        }

        fetchExercises()
    }, [])

    return (
       <main>
            <Title text={`All Exercises`}/>
            <AllExercisesList allExercises={allExercises}/>
       </main> 
    )
}