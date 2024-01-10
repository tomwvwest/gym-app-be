import ExerciseCard from "./ExerciseCard"
import styles from "@/app/style"


export default function AllExercisesList ({ allExercises }) {
    return (
        <main>
            <ul className="mb-5">
                {allExercises.map((exercise) => {
                    return (
                        <li key={exercise.exercise_id} className={styles.card}>
                            <ExerciseCard exercise={exercise}/>
                        </li>
                    )
                })}
            </ul>
        </main>
    )
}