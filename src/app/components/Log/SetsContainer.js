import { SetContainer } from "./SetContainer";

export const SetsContainer = ({ sets, setSets }) => {

  function handleAddSet(e) {
    setSets([...sets, {weight: 0, reps: 0}]);
  }

  function handleDeleteSet(e) {
    const index = parseInt(e.target.value);
    
    const copySets = [...sets]
    const amended = copySets.filter((_, i) => i !== index)
    setSets(amended)
  }

  return (
    <div className="flex flex-col">
      {sets.map((set, index) => {
        return (
          <div key={index} className="grid grid-cols-4 mb-1 ">
            <SetContainer sets={sets} setSets={setSets} index={index} handleDeleteSet={handleDeleteSet}/>
          </div>
        );
      })}
      <button className="ml-5 border rounded p-1 w-24" onClick={handleAddSet}>
        Add Set
      </button>
    </div>
  );
};
