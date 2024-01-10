'use client'
import { Title } from "../../components/General/Title";
import { useState, useEffect } from "react";


export default function SingleExercisePage({params}) {
    const [currentExercise, setCurrentExercise] = useState({})

    const exercise_id = params.exercises_id;

    useEffect(()=>{
        const fetchExercise = async ()=>{
            fetch(`/api/exercises/${exercise_id}`)
            .then((res)=>{
                return res.json()
            })
            .then((data)=>{
                console.log(data)
                setCurrentExercise(data)
            })
        }

        fetchExercise()
        }, [])

  return (
    <>
    <Title text={`${currentExercise.name}`}/>
    </>
  );
}