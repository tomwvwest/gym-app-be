import ExerciseCard from "./ExerciseCard"


export default function AllExercisesList ({ allExercises }) {
    return (
        <main>
            <ul>
                {allExercises.map((exercise) => {
                    return (
                        <li key={exercise.id}>
                            <ExerciseCard exercise={exercise}/>
                        </li>
                    )
                })}
            </ul>
        </main>
    )
}