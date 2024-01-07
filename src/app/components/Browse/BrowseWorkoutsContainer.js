import { BrowseSingleContainer } from "./BrowseSingleContainer";

export const BrowseWorkoutsContainer = ({ workouts }) => {
  return (
    <>
      {workouts.map((workout) => {
        return (
          <div key={workout.workout_id} className="flex justify-center">
            <BrowseSingleContainer workout={workout} />
          </div>
        );
      })}
    </>
  );
};
