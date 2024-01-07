import Link from "next/link";
import { useEffect, useState } from "react";
import { LoadingSkeleton } from "../General/LoadingSkeleton";

export const BrowseSingleContainer = ({ workout }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/users/${workout.workout_id}`)
      .then((res) => {
        return res.json();
      })
      .then((userData) => {
        setUser(userData);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return;
  }

  return (
    <div className="w-[80%] mb-4">
      <div className=" bg-LightPurple text-platinum rounded-2xl p-4 flex justify-between">
        <Link href={`/workouts/${workout.workout_id}`}>
          <p className="font-bold">{workout.workout_name}</p>
        </Link>
        <p className="italic">{user.username}</p>
        <button>+</button>
      </div>
    </div>
  );
};
