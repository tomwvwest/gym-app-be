import { PickExercise } from "./PickExercise";

export const ListOfExercises = ({
  allExercises,
  setChosenExercises,
  setIsExerciseShowing,
  chosenExercises
}) => {
  return (
    <div className="border absolute rounded-xl h-[50vh] w-[60vh] overflow-auto -bottom-[50.5vh] z-5">
      {allExercises.map((exercise) => {
        return (
          <div key={exercise.exercise_id} className="">
            <PickExercise
              exercise={exercise}
              setChosenExercises={setChosenExercises}
              setIsExerciseShowing={setIsExerciseShowing}
              chosenExercises={chosenExercises}
            />
          </div>
        );
      })}
    </div>
  );
};
