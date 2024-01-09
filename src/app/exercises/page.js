'use client'

import { Title } from "../components/General/Title"
import ExerciseModal from "../components/exercises/ExerciseModal"
import { useState, useEffect } from "react";


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
                setFetchExercisesError(error)
            })
            .finally(() => {
                setWorkoutExercisesLoading(false)
            })
        }

        fetchExercises()
    }, [])
    return (
       <main>
            <Title text={`Exercises`}/>

            {/* <ExerciseModal visible={true} allExercises={allExercises}/> */}
       </main> 
    )
}