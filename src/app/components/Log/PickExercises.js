import { PickExercise } from "./PickExercise";

export const ListOfExercises = ({
  allExercises,
  setChosenExercises,
  setIsExerciseShowing,
  chosenExercises
}) => {
  return (
    <div className="border rounded-xl fixed h-[50%] w-[50%] overflow-auto z-30 bottom-[135px]">
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
