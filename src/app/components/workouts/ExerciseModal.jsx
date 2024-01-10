import ExerciseListCard from "./ExerciseListCard";
import styles from "@/app/style";

export default function ExerciseModal({ setExercisesInWorkout, exercisesInWorkout, allExercises, workout_id, visible, onClose, fetchExercisesError }) {
    if (!visible) { return null }

    const exerciseIdsInWorkouts = exercisesInWorkout.map((exercise) => exercise.exercise_id);
    const filteredExercises = allExercises.filter((exercise) => !exerciseIdsInWorkouts.includes(exercise.exercise_id));

    return (
        <section className="bg-platinum my-5">
            {fetchExercisesError ? <p>Error loading exercises Please try again.</p> : null}
            <div className="flex justify-between">
                <h1 className={`${styles.subtitle}`}>All Exercises</h1>
                <button className={`${styles.subtitle} text-Pink`} onClick={onClose}>Close</button>
            </div>
            <ul>
                {filteredExercises.map(((exercise) => {
                    return (
                        <li key={exercise.exercise_id} className="p-4 my-2 rounded-lg bg-Lavender">
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