'use client'
import { Title } from "../../components/General/Title";
import { useState, useEffect } from "react";
import { useUserContext } from "@/app/contexts/userContext";
import SessionCard from "@/app/components/Session/SessionCard";
import styles from "@/app/style";
import ExerciseChart from "@/app/components/exercises/ExerciseChart";
import Link from "next/link";

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
                console.log(data)
                setCurrentExerciseData(data)
            })
        }

        const fetchData = async () => {
            
            fetchExercise();
            fetchSessions();
        }

        fetchData()
        }, [exercise_id, user.user_id])



  return (
    <main className={`flex justify-center`}>
        <div className={`${styles.bodySection}`}>
            <h1 className={`${styles.title}`}>{currentExercise.name}</h1>
            <div className="flex text-md font-bold h-6 rounded-lg mb-5">
                <Link href="/exercises" className="flex">
                    <img src="/caret-left.svg" className="h-full"></img>
                    <p className="w-fit">All Exercises</p>
                </Link>
            </div>
            <ExerciseChart data={currentExerciseData} exerciseName={currentExercise.name}></ExerciseChart>
            <h2 className={`${styles.subtitle} mt-5`}>History:</h2>
            <ul className="mb-5">
                {currentExerciseData.map((data)=>{
                    return (
                        <li key={data.logged_id}>
                        <SessionCard session={data}></SessionCard>
                        </li>
                    )
                })}
            </ul>
        </div>
    </main>
  );
}