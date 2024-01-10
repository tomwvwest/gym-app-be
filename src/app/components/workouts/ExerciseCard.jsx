import { useState } from 'react';
import { LoadingSkeleton } from "@/app/components/General/LoadingSkeleton";
import styles from '@/app/style';
import Link from "next/link";

export default function ExerciseCard({ workout_id, exercise, setExercises, workoutExercisesLoading }) {
    const [isRemoving, setIsRemoving] = useState(false);
    const [isRemoved, setIsRemoved] = useState(false);
    const [removeError, setRemoveError] = useState(null);
    const [instructions, setInstructions] = useState({class: 'hidden', symbol: '/caret-right.svg'});

    const handleRemoveFromWorkout = () => {
        setIsRemoving(true);

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
            setIsRemoved(true)
            setTimeout(() => {
                setIsRemoved(false)
                setIsRemoving(false)
            }, 3000)
        })
    }

    const handleClickInstructions = () => {
        instructions.class === '' ? setInstructions({class: 'hidden', symbol: '/caret-right.svg'}) : setInstructions({class: '', symbol: '/caret-down.svg'})

    }
    
    if (workoutExercisesLoading) return <LoadingSkeleton />

    return (
        <section className='cursor-pointer flex-column'>
            <div className='flex justify-between'>
                <div className='w-[80%] px-2'>
                    {isRemoved ? <p>Exercise removed.</p> : null}
                    {workoutExercisesLoading ? <LoadingSkeleton /> : null}
                    <Link href={`/exercises/${exercise.exercise_id}`}>
                        <h2 className={`${styles.subtitle}`}>{exercise.name}</h2>
                    </Link>
                    <div onClick={handleClickInstructions} className="flex text-sm font-light h-5">
                        <p className="pr-2">{exercise.muscle}</p>
                        <p className="pr-2">{exercise.difficulty}</p>
                        <p className="pr-2 hidden md:flex lg:flex">{exercise.equipment}</p>
                        <div className='h-full'>
                            <img src={instructions.symbol} className='h-full'></img>
                        </div>
                    </div>
                    {isRemoving ? (removeError ? <p>Could not remove exercise. Please try again.</p> : <p>Removing...</p>) : null}
                </div>
                <div className='flex justify-end w-[20%] pr-2'>
                    <button onClick={handleRemoveFromWorkout} className="h-full">
                        <img className="h-9" src='/delete.svg'></img>
                    </button>
                </div>
            </div>
            <div className={`${instructions.class} pt-2`}>
                    <span>{exercise.instructions}</span>
            </div>
        </section>
    )
}