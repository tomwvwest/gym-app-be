import { useEffect, useState } from "react";

export const PickExercise = ({
  exercise,
  setChosenExercises,
  setIsExerciseShowing,
  chosenExercises,
}) => {
  const [arrOfId, setArrOfIds] = useState([]);
  useEffect(() => {
    setArrOfIds(
      chosenExercises.map((chosenExercise) => chosenExercise.exercise_id)
    );
  }, [chosenExercises]);

  function handlePickExercise(e) {
    setIsExerciseShowing(false);
    setChosenExercises([...chosenExercises, exercise]);
  }

  const checkIfRepeated = arrOfId.includes(exercise.exercise_id);

  return (
    <div
      className={`${
        checkIfRepeated
          ? " p-2 bg-platinum transition-[0.15s] border-b text-left hover:cursor-default"
          : "p-2 bg-platinum transition-[0.15s] hover:cursor-pointer hover:bg-LightPurple hover:text-platinum border-b text-left"
      }`}
      onClick={checkIfRepeated ? null : handlePickExercise}
    >
      <p className={`font-bold ${checkIfRepeated ? 'opacity-30' : null}`}>{exercise.name}</p>
      <p className={`${checkIfRepeated ? 'opacity-30' : null}`}>
        {exercise.difficulty} | {exercise.muscle}
      </p>
    </div>
  );
};
