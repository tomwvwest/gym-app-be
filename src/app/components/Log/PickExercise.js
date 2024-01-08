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
    <div className="p-2 bg-platinum transition-[0.15s] hover:cursor-pointer hover:bg-LightPurple hover:text-platinum border-b" onClick={handlePickExercise}>
      <p>{exercise.name}</p>
      <p>{exercise.difficulty}</p>
      <p>{exercise.muscle}</p>
    </div>
  );
};
