export const PickExercise = ({
  exercise,
  setChosenExercises,
  setIsExerciseShowing,
  chosenExercises
}) => {

  function handlePickExercise(e){
    setIsExerciseShowing(false)
    setChosenExercises([...chosenExercises, exercise])
  }

  return (
    <div className="p-2 bg-platinum transition-[0.15s] hover:cursor-pointer hover:bg-LightPurple hover:text-platinum border-b text-left" onClick={handlePickExercise}>
      <p className="font-bold">{exercise.name}</p>
      <p>{exercise.difficulty} | {exercise.muscle}</p>
    </div>
  );
};
