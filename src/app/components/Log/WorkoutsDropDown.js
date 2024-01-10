import { useUserContext } from "@/app/contexts/userContext";
import { useEffect, useState } from "react";
import { WorkoutDropDown } from "./WorkoutDropDown";

export const WorkoutsDropDown = ({
  setChosenExercises,
  setChosenWorkout,
  chosenWorkout,
  userWorkouts,
}) => {
  return (
    <div className="absolute border rounded-xl w-[60vh] overflow-auto -bottom-11 z-1000 bg-platinum">
      {!userWorkouts.length ? (
        <>No Saved Workouts</>
      ) : (
        userWorkouts.map((workout, index) => {
          return (
            <div key={workout.workout_id}>
              <WorkoutDropDown
                workout={workout}
                isLast={index === userWorkouts.length}
                setChosenExercises={setChosenExercises}
                setChosenWorkout={setChosenWorkout}
                chosenWorkout={chosenWorkout}
              />
            </div>
          );
        })
      )}
    </div>
  );
};
