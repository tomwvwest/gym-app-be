"use client";

import Link from "next/link";
import { Title } from "../components/General/Title";
import { LogWorkoutContainer } from "../components/Log/LogWorkoutContainer";
import { useUserContext } from "../contexts/userContext";
import { useState } from "react";
import { WorkoutsDropDown } from "../components/Log/WorkoutsDropDown";

export default function LogPage() {
  const { user, setUser } = useUserContext();
  const [showWorkouts, setShowWorkouts] = useState(false);
  const [chosenExercises, setChosenExercises] = useState([]);
  const [chosenWorkout, setChosenWorkout] = useState({})

  function handleShowWorkouts() {
    setShowWorkouts(!showWorkouts);
  }

  if(!user.user_id) return <Link href="/login"><div className="ml-20 mt-24 text-2xl hover:underline">Click to Login</div></Link>;
  return (
    <>
      <Title text={"Log Workout"} />
      <div>
        <button
          onClick={handleShowWorkouts}
          className="ml-5 border p-1 rounded relative"
        >
          My Workouts {chosenWorkout.workout_name ? `: ${chosenWorkout.workout_name}` : null}
          <>{showWorkouts ? <WorkoutsDropDown setChosenExercises={setChosenExercises} setChosenWorkout={setChosenWorkout} chosenWorkout={chosenWorkout}/> : null}</>
        </button>
        <LogWorkoutContainer
          chosenExercises={chosenExercises}
          setChosenExercises={setChosenExercises}
          chosenWorkout={chosenWorkout}
        />
      </div>
    </>
  );
}
