import { useEffect, useState } from "react";
import { SetDetails } from "./SetDetails";

export const SessionDetails = ({ sessionSets, exerciseObj }) => {
  const exerciseCount = {};
  const exerciseCountToArray = [];
  sessionSets.forEach((set) => {
    if (exerciseCount[set.exercise_id]) exerciseCount[set.exercise_id]++;
    else exerciseCount[set.exercise_id] = 1;
  });

  //{exercise : no. of times}
  for (const exerciseId in exerciseCount) {
    const correctObj = exerciseObj.find((obj) => {
      return obj.exercise_id === parseInt(exerciseId);
    });
    exerciseCountToArray.push([correctObj.name, exerciseCount[exerciseId]]);
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
