import { useState, useEffect } from "react";

export const SetContainer = ({ setSets, sets, index,  }) => {
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);

  function handleWeightChange(e) {
    setWeight(e.target.value >= 1 ? parseInt(e.target.value) : 0);
  }

  function handleRepsChange(e) {
    setReps(e.target.value >= 1 ? parseInt(e.target.value) : 0);
  }

  useEffect(() => {
    const copyArray = [...sets];
    copyArray[index] = { weight, reps };
    setSets(copyArray);
  }, [weight, reps]);

  return (
    <>
      <p className="pl-4 italic">Set {index + 1}:</p>
      <div className="flex">
        <p className="ml-4">Weight: </p>
        <input
          className="w-10 h-7 ml-4 p-1 focus:outline-none text-DeepPurple"
          onChange={handleWeightChange}
        ></input>
        <p className="pl-2">kg</p>
      </div>
      <div className="flex">
        <p className="ml-20">Reps: </p>
        <input
          className="w-10 h-7 ml-4 p-1 focus:outline-none text-DeepPurple"
          onChange={handleRepsChange}
        ></input>
      </div>
    </>
  );
};
