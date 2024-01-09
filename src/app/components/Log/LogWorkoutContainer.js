import { useState, useEffect } from "react";
import { ListOfExercises } from "./PickExercises";
import { ChosenExercisesContainer } from "./ChosenExercisesContainer";
import { LoadingSkeleton } from "../General/LoadingSkeleton";
import { useRouter } from "next/navigation";

export const LogWorkoutContainer = () => {
  const router = useRouter();

  const [chosenExercises, setChosenExercises] = useState([]);
  const [allExercises, setAllExercises] = useState([]);
  const [isExerciseShowing, setIsExerciseShowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogLoading, setisLogLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isPostError, setIsPostError] = useState(false);
  const [workoutData, setWorkoutData] = useState({});
  const [numOfSessions, setNumOfSessions] = useState(null);

  useEffect(() => {
    Promise.all([fetch("/api/exercises"), fetch("/api/checkLoggedWorkout")])
      .then(([res, res2]) => {
        return Promise.all([res.json(), res2.json()]);
      })
      .then(([exerciseData, loggedWorkoutData]) => {
        setAllExercises(exerciseData);
        setNumOfSessions(loggedWorkoutData.session_id + 1);
        setIsLoading(false);
      });
  }, []);

  function handleAddExerciseButton(e) {
    setIsExerciseShowing(!isExerciseShowing);
  }

  const handleLogWorkout = () => {
    setisLogLoading(true);
    const workoutId = 1;
    const userId = 1;

    for (const exerciseId in workoutData) {
      Promise.all(
        workoutData[exerciseId].map((set) => {
          const newLoggedWorkout = {
            session_id: numOfSessions,
            exercise_id: parseInt(exerciseId),
            workout_id: workoutId,
            user_id: userId,
            weight: set.weight,
            reps: set.reps,
          };

          return fetch(`/api/loggedWorkouts`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newLoggedWorkout),
          });
        })
      )
        .then(() => {
          setisLogLoading(false);
          setIsLogged(true);
          setTimeout(() => router.push("/"), 1000);
        })
        .then(() => {})
        .catch(() => setIsPostError(true));
    }
  };

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className=" my-7 mx-16">
      <div className="flex items-center">
        <button
          className="border p-1 rounded relative"
          onClick={handleAddExerciseButton}
        >
          Add Exercise
          <>
            {isExerciseShowing ? (
              <ListOfExercises
                allExercises={allExercises}
                setChosenExercises={setChosenExercises}
                setIsExerciseShowing={setIsExerciseShowing}
                chosenExercises={chosenExercises}
              />
            ) : null}
          </>
        </button>
        <button
          className={`p-1 ml-4 rounded transition-[0.3s] bg-LightPurple text-platinum ${
            !chosenExercises.length ? "opacity-30" : null
          }`}
          onClick={handleLogWorkout}
          disabled={!chosenExercises.length}
        >
          Log Workout
        </button>
        <button className="border border-DeepPurple p-1 ml-4 rounded bg-LightGreen text-platinum">
          Log & Post
        </button>
        <p className={`ml-4 italic text-lg ${isLogged ? 'text-LightGreen': null} ${isPostError ? 'text-Red': null}`}>{isLogLoading ? "Logging..." : (isLogged ? 'Success' : (isPostError ? 'Error - try again' : null))}</p>
      </div>

      <div className="z-1">
        <ChosenExercisesContainer
          setChosenExercises={setChosenExercises}
          chosenExercises={chosenExercises}
          workoutData={workoutData}
          setWorkoutData={setWorkoutData}
        />
      </div>
    </div>
  );
};
