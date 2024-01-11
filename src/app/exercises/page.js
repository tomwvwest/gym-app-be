'use client'

import { useState, useEffect } from "react";
import AllExercisesList from "../components/exercises/AllExercisesList";
import styles from "../style";
import { LoadingSkeleton } from "../components/General/LoadingSkeleton";
import AddExercise from "../components/exercises/AddExercise";

export default function Exercises () {
    const [allExercises, setAllExercises] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [input, setInput] = useState('');
    const [filteredExercises, setFilteredExercises] = useState([]);

    useEffect(() => {
        const fetchExercises = async () => {
            fetch(`/api/exercises/`)
            .then((res) => {
                if (!res.ok) { throw res }
                return res.json()
            })
            .then((data) => {
                setAllExercises(data)
                setFilteredExercises(data)
            })
            .catch((error) => {
                setIsError(error)
            })
            .finally(() => {
                setIsLoading(false)
            })
        }

        fetchExercises()
    }, [])

    const handleSearchInput = (event) => {
        setInput(event.target.value)

        const filteredItems = allExercises.filter((exercise) => {
            return exercise.name.toLowerCase().includes(event.target.value)
        })

        // setAllExercises(filteredItems)
        setFilteredExercises(filteredItems)
    }

    if (isError) return <ErrorPage error={Error}/>

    return (
       <section className="flex justify-center">
            <div className={`${styles.bodySection}`}>
                <h1 className={`${styles.title}`}>All Exercises</h1>
                <form className="flex my-3 border rounded-xl overflow-hidden">
                    <input className="py-1 px-2 h-9 w-full text-DeepPurple" placeholder="Find an exercise" value={input} onChange={handleSearchInput}></input>
                </form>
                <AllExercisesList allExercises={filteredExercises}/>
                {isLoading ? <LoadingSkeleton/> : <AddExercise setAllExercises={setAllExercises} allExercises={allExercises} setFilteredExercises={setFilteredExercises} filteredExercises={filteredExercises}/>}
            </div>
       </section> 
    )
}