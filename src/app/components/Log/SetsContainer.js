import { SetContainer } from "./SetContainer";

export const SetsContainer = ({ sets, setSets }) => {
  function handleAddSet(e) {
    setSets([...sets, { weight: 0, reps: 0 }]);
  }

  function handleDeleteSet(e) {
    const amendedSets = [...sets.slice(0, sets.length - 1)];

    setSets(amendedSets);
  }

  return (
    <div className="flex flex-col">
      {sets.map((set, index) => {
        return (
          <div key={index} className="grid grid-cols-4 mb-1 ">
            <SetContainer
              sets={sets}
              setSets={setSets}
              index={index}
              handleDeleteSet={handleDeleteSet}
            />
          </div>
        );
      })}

      <div>
        <button className="ml-5 border rounded p-1 w-24" onClick={handleAddSet}>
          Add Set
        </button>
        <button
          className={`ml-5 border rounded p-1 transition-[0.3s] z-[10] ${
            sets.length === 1 ? "opacity-30" : null
          }`}
          onClick={handleDeleteSet}
          disabled={sets.length === 1}
        >
          Remove Set
        </button>
      </div>
    </div>
  );
};
