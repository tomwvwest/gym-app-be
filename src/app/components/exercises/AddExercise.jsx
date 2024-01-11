import { useState } from "react";
import styles from "@/app/style";

export default function AddExercise ({ setAllExercises, allExercises, setFilteredExercises, filteredExercises }) {
    const [dropdown, setDropdown] = useState('/caret-right.svg');
    const [newExercise, setNewExercise] = useState({
        name: '',
        type: '',
        muscle: '',
        equipment: '',
        difficulty: '',
        instructions: ''
    });
    const [isError, setIsError] = useState('');
    const [isPosting, setIsPosting] = useState(false);

    function handleDropdown () {
        dropdown === '/caret-right.svg' ? setDropdown('/caret-down.svg') : setDropdown('/caret-right.svg');
    }

    function updateNewExercise (event) {
        setNewExercise(() => {
            return { ...newExercise, [event.target.name]: event.target.value }
        })
    }

    const handleSubmitForm = (event) => {
        event.preventDefault();
        setIsPosting(true);
    
        if (!newExercise.name       || !newExercise.type       ||
            !newExercise.muscle     || !newExercise.equipment  ||
            !newExercise.difficulty || !newExercise.instructions ) {
                setIsError('Incomplete form. Please try again.')
    
                setTimeout(() => {
                    setIsError('')
                }, 3000)
        
        } else {
            setAllExercises(() => ([...allExercises, {...newExercise, exercise_id: 'temp'}]))
            setFilteredExercises(() => ([...filteredExercises, {...newExercise, exercise_id: 'temp'}]))
    
            fetch(`/api/exercises`, {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({newExercise})
            })
            .then((res) => {
                setNewExercise({
                    name: '',
                    type: '',
                    muscle: '',
                    equipment: '',
                    difficulty: '',
                    instructions: '',
                })
                if (!res.ok) { throw res }
                return res.json()
            })
            .then((data) => {
                setAllExercises([...allExercises, data])
                setFilteredExercises([...filteredExercises, data])
            })
            .catch((error) => {
                setIsError(error)
            })
            .finally(() => {
                setIsPosting(false)
                setTimeout(() => {
                    setIsError('')
                }, 3000)
            })
        }
    }

    return (
        <section className="mb-5">
            <div className="flex h-9 item-center mb-5 cursor-pointer" onClick={handleDropdown}>
                <div className="w-fit">
                    <h2 className={`h-full font-bold text-2xl text-DeepPurple`}>Add an exercise</h2>
                </div>
                <div className="h-full">
                    <img className="h-full" src={`${dropdown}`}></img>
                </div>
            </div>
            <form className={dropdown === '/caret-right.svg' ? 'hidden' : null} onSubmit={handleSubmitForm}>
                <input className={`${styles.input}`} name="name" placeholder="name" value={newExercise.name} onChange={updateNewExercise} required></input>
                <input className={`${styles.input}`} name="type" placeholder="type" value={newExercise.type} onChange={updateNewExercise} required></input>
                <input className={`${styles.input}`} name="muscle" placeholder="muscle" value={newExercise.muscle} onChange={updateNewExercise} required></input>
                <input className={`${styles.input}`} name="equipment" placeholder="equipment" value={newExercise.equipment} onChange={updateNewExercise} required></input>
                <input className={`${styles.input}`} name="difficulty" placeholder="difficulty" value={newExercise.difficulty} onChange={updateNewExercise} required></input>
                <textarea className={`${styles.input} resize-none`} name="instructions" placeholder="instructions" value={newExercise.instructions} onChange={updateNewExercise} required></textarea>
                {isError ? <p>{isError}</p> : null}
                <button className={`rounded-lg p-3 mt-2 w-full text-platinum bg-DeepPurple font-bold`} type="submit">{isPosting ? 'Adding exercise...' : 'Submit'}</button>
            </form>
        </section>
    )
}