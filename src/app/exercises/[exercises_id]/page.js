'use client'
import { Title } from "../../components/General/Title";
import { useState, useEffect } from "react";
import { useUserContext } from "@/app/contexts/userContext";
import SessionCard from "@/app/components/Session/SessionCard";
import styles from "@/app/style";
import ExerciseChart from "@/app/components/exercises/ExerciseChart";



export default function SingleExercisePage({params}) {
    const [currentExercise, setCurrentExercise] = useState({})
    const [currentExerciseData, setCurrentExerciseData] = useState([])

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
    <ExerciseChart data={currentExerciseData} exerciseName={currentExercise.name}></ExerciseChart>

    <h2 className={styles.subtitle}>History:</h2>
    <ul>
    {currentExerciseData.map((data)=>{
        return (
            <li key={data.logged_id}>
            <SessionCard session={data}></SessionCard>
            </li>
        )
    })}
    </ul>
    </>
  );
}