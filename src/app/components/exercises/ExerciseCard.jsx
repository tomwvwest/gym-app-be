export default function ExerciseCard({ exercise }) {
    
    return (
        <section className="my-5">
            <h2>{exercise.name}</h2>
            <p>{exercise.muscle}</p>
            <button className="border rounded-lg px-2 py-1">Remove</button>
        </section>
    )
}