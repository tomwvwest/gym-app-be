export const SetContainer = ({ setSets, index, sets, handleDeleteSet }) => {

  return (
    <>
      <p className="pl-4 italic">Set {index + 1}:</p>
      <div className="flex">
        <p className="ml-4">Weight: </p>
        <input className="w-10 h-7 ml-4 p-1 focus:outline-none text-DeepPurple"></input>
        <p className="pl-2">kg</p>
      </div>
      <div className="flex">
        <p className="ml-20">Reps: </p>
        <input className="w-10 h-7 ml-4 p-1 focus:outline-none text-DeepPurple"></input>
      </div>
      {sets.length === 1 ? null: <button className="ml-5 border rounded p-1" onClick={handleDeleteSet} value={index}>
        Remove Set
      </button>}
      
    </>
  );
};
