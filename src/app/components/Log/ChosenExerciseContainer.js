import { useState } from "react";
import { SetsContainer } from "./SetsContainer";

export const ChosenExerciseContainer = ({
  exercise,
  chosenExercises,
  setChosenExercises,
  index,
}) => {
  const [sets, setSets] = useState([]);

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
    }
  }

  return(<>
    <p className="font-bold">
      {index}. {exercise.name}
    </p>
    <p className="opacity-80 text-sm pl-2 pb-2">
      {exercise.difficulty} | {exercise.equipment}
    </p>
    <p className="pl-2 pb-2">{exercise.instructions}</p>

    <div className="flex items-center">
      <p className="ml-4">Weight: </p>
      <input className="w-10 h-7 ml-4 p-1 focus:outline-none text-DeepPurple"></input>
      <p className="pl-2">kg</p>
      <p className="ml-20">Reps: </p>
      <input className="w-10 h-7 ml-4 p-1 focus:outline-none text-DeepPurple"></input>
      <button
        className="p-1 rounded border mr-2 ml-auto"
        onClick={handleRemove}
      >
        Remove
      </button>
    </div>
  </>)
};
