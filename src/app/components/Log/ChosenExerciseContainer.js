import { useState, useEffect } from "react";
import { SetsContainer } from "./SetsContainer";

export const ChosenExerciseContainer = ({
  exercise,
  chosenExercises,
  setChosenExercises,
  index,
  workoutData,
  setWorkoutData,
}) => {
  const exerciseId = exercise.exercise_id;
  const [sets, setSets] = useState([{ weight: 0, reps: 0 }]);

  useEffect(() => {
    const copyObject = { ...workoutData };
    copyObject[exerciseId] = sets;
    setWorkoutData(copyObject);
  }, [sets]);

  function handleRemove(e) {
    const index = chosenExercises.indexOf(exercise);
    if (index !== -1) {
      const amendedChosenExercises =
        index === 0
          ? [...chosenExercises.slice(1)]
          : [
              ...chosenExercises.slice(0, index),
              ...chosenExercises.slice(index + 1),
            ];

      setChosenExercises(amendedChosenExercises);
      
      const copyObject = {...workoutData}
      delete copyObject[exerciseId];
      setWorkoutData(copyObject)
    }
  }

  return (
    <>
      <p className="font-bold">
        {index}. {exercise.name}
      </p>
      <p className=" text-sm pl-2 pb-2">
        {exercise.difficulty} | {exercise.equipment}
      </p>
      <p className="pl-2 pb-2">{exercise.instructions}</p>

      <div className="flex items-center">
        <SetsContainer sets={sets} setSets={setSets} />
        <button
          className="p-1 rounded border mr-2 ml-auto mt-auto bg-Red"
          onClick={handleRemove}
        >
          Remove
        </button>
      </div>
    </>
  );
};
