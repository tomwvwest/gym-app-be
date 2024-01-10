import { useState } from 'react';
import { LoadingSkeleton } from "@/app/components/General/LoadingSkeleton";

export default function ExerciseCard({ workout_id, exercise, setExercises, workoutExercisesLoading }) {
    const [isRemoving, setIsRemoving] = useState(false);
    const [isRemoved, setIsRemoved] = useState(false);
    const [removeError, setRemoveError] = useState(null);
    const [instructions, setInstructions] = useState({class: 'hidden', symbol: '▶'});

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
        instructions.class === '' ? setInstructions({class: 'hidden', symbol: '▶'}) : setInstructions({class: '', symbol: '▼'})

    }
    
    if (workoutExercisesLoading) return <LoadingSkeleton />

    return (
        <section onClick={handleClickInstructions} className='cursor-pointer'>
            {isRemoved ? <p>Exercise removed.</p> : null}
            {workoutExercisesLoading ? <LoadingSkeleton /> : null}
            <div className='flex justify-between'>
                <h2 className='font-bold'>{exercise.name}</h2>
                <div>
                    <button onClick={handleRemoveFromWorkout} className="border rounded-lg px-2 py-1">Remove</button>
                </div>
            </div>
            <div className="flex text-sm font-light">
                <p className="pr-2">{exercise.muscle}</p>
                <p className="pr-2">{exercise.difficulty}</p>
                <p className="pr-2">{exercise.equipment}</p>
                <div>
                    <p className='transition ease-in duration-100'>{instructions.symbol}</p>
                </div>
            </div>
            <div className={`${instructions.class}`}>
                <span>{exercise.instructions}</span>
            </div>
            {isRemoving ? (removeError ? <p>Could not remove exercise. Please try again.</p> : <p>Removing...</p>) : null}
        </section>
    )
}