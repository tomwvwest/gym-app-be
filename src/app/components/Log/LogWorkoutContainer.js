import { useState, useEffect } from "react";
import { ListOfExercises } from "./PickExercises";
import { ChosenExercisesContainer } from "./ChosenExercisesContainer";
import { LoadingSkeleton } from "../General/LoadingSkeleton";
import { useRouter } from "next/navigation";
import { PostInput } from "./PostInput";
import { useUserContext } from "@/app/contexts/userContext";

export const LogWorkoutContainer = ({chosenExercises, setChosenExercises, chosenWorkout}) => {
  const router = useRouter();
  const {user, setUser} = useUserContext(); 
  const [allExercises, setAllExercises] = useState([]);
  const [isExerciseShowing, setIsExerciseShowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogLoading, setisLogLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isPostError, setIsPostError] = useState(false);
  const [workoutData, setWorkoutData] = useState({});
  const [numOfSessions, setNumOfSessions] = useState(null);
  const [showPostDetails, setShowPostDetails] = useState(false);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);

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

  const handleLogWorkout = async (e) => {
    setisLogLoading(true);
    const isLog = e.target.textContent === 'Log Workout'
    const workoutId = chosenWorkout.workout_id;
    const userId = user.user_id;

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
          isLog ? setTimeout(() => router.push("/"), 1000) : null;
        })
        .then(() => {})
        .catch(() => setIsPostError(true));
    }
  };

  const handlePostWorkout = async (e) => {
    await handleLogWorkout(e);
    const userId = user.user_id
    const newPost = {
      session_name : title,
      description : description,
      session_id : parseInt(numOfSessions),
      user_id : userId
    }
    fetch(`/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost)
    }).then(() => {
      setTimeout(() => router.push("/"), 1000);
    });
  }

  const handleShowPostDetails = () => {
    setShowPostDetails(!showPostDetails);
  };

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className=" my-7 mx-16">
      <div className="flex items-center">
        <button
          className="border p-1 rounded relative z-[100] "
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
        <button
          className="border border-DeepPurple p-1 ml-4 rounded bg-LightGreen text-platinum"
          onClick={handleShowPostDetails}
        >
          Create a Post
        </button>
        <p
          className={`ml-4 italic text-lg ${
            isLogged ? "text-LightGreen" : null
          } ${isPostError ? "text-Red" : null}`}
        >
          {isLogLoading
            ? "Logging..."
            : isLogged
            ? "Success"
            : isPostError
            ? "Error - try again"
            : null}
        </p>
      </div>

      {showPostDetails ? (
        <div className={`flex mt-5 items-center`}>
          <PostInput setTitle={setTitle} setDescription={setDescription} />
          <button className={`border border-DeepPurple p-1 ml-4 rounded bg-LightGreen text-platinum ${!chosenExercises.length || !title || !description ? "opacity-30" : null}`} onClick={handlePostWorkout} disabled={!chosenExercises.length || !title || !description}>
            Post
          </button>
          <p className="text-Red italic ml-2">{!title || !description ? 'Please provide both a title and description' : null}</p>
        </div>
      ) : null}

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
