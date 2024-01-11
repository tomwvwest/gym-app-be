export const WorkoutDropDown = ({
  workout,
  isLast,
  setChosenExercises,
  setChosenWorkout,
  chosenWorkout
}) => {
  function handlePickWorkout() {
    fetch(`/api/workouts/${workout.workout_id}`)
      .then((res) => res.json())
      .then((data) => {
        setChosenExercises(data);
        setChosenWorkout(workout);
      });
  }

  return (
    <div
      className={`p-2 bg-platinum transition-[0.15s] hover:cursor-pointer hover:bg-LightPurple hover:text-platinum text-left ${
        !isLast ? "border-b" : null
      }`}
      onClick={handlePickWorkout}
    >
      <p
        className={`${
          chosenWorkout.workout_name === workout.workout_name
            ? "font-bold"
            : null
        }`}
      >
        {workout.workout_name}
      </p>
    </div>
  );
};
