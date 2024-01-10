'use client'
import { Title } from "../../components/General/Title";
import { useState, useEffect } from "react";
import { useUserContext } from "@/app/contexts/userContext";



export default function SingleExercisePage({params}) {
    const [currentExercise, setCurrentExercise] = useState({})
    const [currentExerciseData, setCurrentExerciseData] = useState({})

    const { user, setUser } = useUserContext();
    

    const exercise_id = params.exercises_id;

    useEffect(()=>{
        const fetchExercise = async ()=>{
            fetch(`/api/exercises/${exercise_id}`)
            .then((res)=>{
                return res.json()
            })
            .then((data)=>{
                setCurrentExercise(data)
            })
        }

        const fetchSessions = async ()=>{
            fetch(`/api/loggedWorkouts?exercise_id=${exercise_id}&user_id=${user.user_id}`)
            .then((res)=>{
                return res.json()
            })
            .then((data)=>{
                setCurrentExerciseData(data)
                console.log(currentExerciseData, "holaa")
            })
        }

        const fetchData = async () => {
            
            fetchExercise();
            fetchSessions();
        }

        fetchData()
        }, [exercise_id, user.user_id])

  return (
    <>
    <Title text={`${currentExercise.name}`}/>
    {currentExerciseData.map((data)=>{
        return (
            <div key={currentExerciseData.logged_id}>
                <p>{data.completed_at}</p>
                <p>{data.weight}</p>
                <p>{data.reps}</p>
            </div>
        )
    })}
    </>
  );
}