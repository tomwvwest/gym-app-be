import ExerciseListCard from "./ExerciseListCard";

export default function ExerciseModal({ setExercisesInWorkout, exercisesInWorkout, allExercises, workout_id, visible, onClose, fetchExercisesError }) {
    if (!visible) { return null }

    return (
        <section className="border bg-platinum">
            {fetchExercisesError ? <p>Error loading exercises Please try again.</p> : null}
            <button onClick={onClose}>Close</button>
            <h1>All Exercises</h1>
            <ul>
                {allExercises.map(((exercise) => {
                    return (
                        <li key={exercise.exercise_id} className="border p-2 m-2 rounded-lg">
                            <ExerciseListCard
                                exercisesInWorkout={exercisesInWorkout}
                                setExercisesInWorkout={setExercisesInWorkout}
                                workout_id={workout_id}
                                exercise={exercise}
                            />
                        </li>
                    )
                }))}
            </ul>
        </section>
    )
}