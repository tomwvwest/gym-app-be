import Link from "next/link";
import { useEffect, useState } from "react";
import { LoadingSkeleton } from "../General/LoadingSkeleton";
import axios from 'axios'
import { useUserContext } from "@/app/contexts/userContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const BrowseSingleContainer = ({ workout }) => {
  const { user, setUser } = useUserContext();
  const [workoutUser, setWorkoutUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [exercises , setExercises] = useState([])

  useEffect(() => {
    Promise.all([fetch("/api/users"), fetch(`/api/workouts/${workout.workout_id}`)])
      .then(([res, res2]) => {
        return Promise.all([res.json(), res2.json()]);
      })
      .then(([userData, excerisesData]) => {
        setWorkoutUser(userData);
        setExercises(excerisesData)
        setIsLoading(false);
      });
  }, []);

  const notify = (message) => {
    toast(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  function postToJunction(workoutId){
    exercises.map((exercise) => {
      const postData = {
        exercise_id: exercise.exercise_id,
        workout_id: workoutId
      }
      axios.post(`/api/workouts/${workoutId}`, postData).then(({data})=>{
      }).catch(err => {
        notify(err)
      })
    })

    notify('Workout Added Successfully')
  }

  function copyWorkout(){
    console.log(exercises)
    const postData = {
      workout_name: workout.workout_name,
      creator_id: user.user_id
    }
    console.log(postData)
    axios.post('/api/workouts', postData).then(({data: {newWorkout}})=>{
      console.log(newWorkout)
      postToJunction(newWorkout.workout_id)
    }).catch(({response: {data}})=>{
      notify(data)
    })
  }

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="w-[80%] mb-4">
      <div className=" bg-LightPurple text-platinum rounded-2xl p-4 flex justify-between">
        <Link href={`/workouts/${workout.workout_id}`}>
          <p className="font-bold hover:underline">{workout.workout_name}</p>
        </Link>
        <Link href={`/profile/${workoutUser.username}`}>
          <p className="italic hover:underline">{workoutUser.username}</p>
        </Link>
        <button onClick={copyWorkout}>+</button>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};
