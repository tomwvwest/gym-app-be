export default function ExerciseCard({ exercise }) {
    return (
        <section className="m-5">
            <h2>{exercise.name}</h2>
            <p>{exercise.muscle}</p>
        </section>
    )
}