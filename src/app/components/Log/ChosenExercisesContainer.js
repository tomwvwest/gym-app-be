import { ChosenExerciseContainer } from "./ChosenExerciseContainer";

export const ChosenExercisesContainer = ({
  chosenExercises,
  setChosenExercises,
}) => {
  console.log(chosenExercises);

  if (!chosenExercises.length) {
    return <div className="m-5 opacity-70 text-lg">None selected</div>;
  }

  return (
    <>
      {chosenExercises.map((exercise, index) => {
        return (
          <div key={exercise.exercise_id} className="border m-5 p-3 rounded-xl bg-LightPurple text-platinum">
            <ChosenExerciseContainer exercise={exercise} setChosenExercises={setChosenExercises}
            chosenExercises={chosenExercises} index={index+1}/>
          </div>
        );
      })}
    </>
  );
};
