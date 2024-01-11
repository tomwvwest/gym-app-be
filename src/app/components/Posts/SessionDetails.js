import { useEffect, useState } from "react";
import { SetDetails } from "./SetDetails";

export const SessionDetails = ({ sessionSets, exerciseObj }) => {
  const exerciseCount = {};
  const exerciseCountToArray = [];

  sessionSets.forEach((set) => {
    if (exerciseCount[set.exercise_id]) {
      exerciseCount[set.exercise_id].weight.push(set.weight);
      exerciseCount[set.exercise_id].reps.push(set.reps);
    } else {
      exerciseCount[set.exercise_id] = { weight: [], reps: [] };
      exerciseCount[set.exercise_id].weight.push(set.weight);
      exerciseCount[set.exercise_id].reps.push(set.reps);
    }
  });

  //exerciseCount
  //{5 : {weight:[1,2,3], reps:[1,2,3]},   6 : ...}
  for (const exerciseId in exerciseCount) {
    const correctObj = exerciseObj.find((obj) => {
      return obj.exercise_id === parseInt(exerciseId);
    });
    exerciseCountToArray.push([correctObj.name, exerciseCount[exerciseId].weight, exerciseCount[exerciseId].reps]);
  }
  return (
    <>
      <ul className="ml-8 mb-4 list-disc">
        {exerciseCountToArray.map((exercise) => {
          return (
            <li key={exercise[0]}>
              <SetDetails exercise={exercise} />
            </li>
          );
        })}
      </ul>
    </>
  );
};
