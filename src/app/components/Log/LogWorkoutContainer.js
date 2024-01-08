import { useState, useEffect } from "react";
import { ListOfExercises } from "./PickExercises";
import { ChosenExercisesContainer } from "./ChosenExercisesContainer";

export const LogWorkoutContainer = () => {
  const [chosenExercises, setChosenExercises] = useState([]);
  const [allExercises, setAllExercises] = useState([]);
  const [isExerciseShowing, setIsExerciseShowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  console.log(chosenExercises);

  if (isLoading) return <>Loading...</>;

  return (
    <div className=" my-7 mx-16">
      <button className="border p-1 rounded" onClick={handleAddExerciseButton} >
        Add Exercise
      </button>

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

      <div className="z-50">
        <ChosenExercisesContainer setChosenExercises={setChosenExercises} chosenExercises={chosenExercises}/>
      </div>
    </div>
  );
};
