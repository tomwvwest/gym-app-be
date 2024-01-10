import Link from "next/link";
import styles from "@/app/style"
import { useState } from 'react';

export default function ExerciseCard ({ exercise }) {
    const [instructions, setInstructions] = useState({class: 'hidden', symbol: '/caret-right.svg'});

    const handleClickInstructions = () => {
        instructions.class === '' ? setInstructions({class: 'hidden', symbol: '/caret-right.svg'}) : setInstructions({class: '', symbol: '/caret-down.svg'})

    }

    return (
        <section className='flex-column'>
            <div className='flex justify-between'>
                <div className='px-2 w-fit'>
                    <Link href={`/exercises/${exercise.exercise_id}`}>
                        <h2 className={`${styles.subtitle}`}>{exercise.name}</h2>
                    </Link>
                    <div onClick={handleClickInstructions} className="flex text-sm font-light h-5 cursor-pointer">
                        <p className="pr-2">{exercise.muscle}</p>
                        <p className="pr-2">{exercise.difficulty}</p>
                        <p className="pr-2 hidden md:flex lg:flex">{exercise.equipment}</p>
                        <div className='h-full'>
                            <img src={instructions.symbol} className='h-full'></img>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${instructions.class} pt-2 px-2`}>
                    <span>{exercise.instructions}</span>
            </div>
        </section>
    )
}
