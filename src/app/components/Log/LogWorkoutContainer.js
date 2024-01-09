import { useState, useEffect } from "react";
import { ListOfExercises } from "./PickExercises";
import { ChosenExercisesContainer } from "./ChosenExercisesContainer";

export const LogWorkoutContainer = () => {
  const [chosenExercises, setChosenExercises] = useState([]);
  const [allExercises, setAllExercises] = useState([]);
  const [isExerciseShowing, setIsExerciseShowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [workoutData, setWorkoutData] = useState({})

  useEffect(() => {
    fetch("/api/exercises")
      .then((res) => {
        return res.json();
      })
      .then((exerciseData) => {
        setAllExercises(exerciseData);
        setIsLoading(false);
      });
  }, []);

  function handleAddExerciseButton(e) {
    setIsExerciseShowing(!isExerciseShowing);
  }

  function handleLogWorkout(e) {
    console.log(workoutData);
    fetch(`/api/loggedWorkouts`, {
      method: 'POST', 
      header:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify()
    })
  }

  if (isLoading) return <>Loading...</>;

  return (
    <div className=" my-7 mx-16">
      <button className="border p-1 rounded relative" onClick={handleAddExerciseButton} >
        Add Exercise
        <>
        {isExerciseShowing ? (
          <ListOfExercises
            allExercises={allExercises}
            setChosenExercises={setChosenExercises}
            setIsExerciseShowing={setIsExerciseShowing}
            chosenExercises={chosenExercises}
          />
        ) : null}
      </>
      </button>
      <button className="p-1 ml-4 rounded bg-LightPurple text-platinum" onClick={handleLogWorkout}>Log Workout</button>
      <button className="border border-DeepPurple p-1 ml-4 rounded bg-LightGreen text-platinum">Log & Post</button>


      <div className="z-1">
        <ChosenExercisesContainer setChosenExercises={setChosenExercises} chosenExercises={chosenExercises} workoutData={workoutData} setWorkoutData={setWorkoutData}/>
      </div>

    </div>
  );
};
