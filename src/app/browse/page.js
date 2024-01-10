"use client";

import { BrowseUsersContainer } from "../components/Browse/BrowseUsersContainer";
import { BrowseWorkoutsContainer } from "../components/Browse/BrowseWorkoutsContainer";
import { LoadingSkeleton } from "../components/General/LoadingSkeleton";
import { Title } from "../components/General/Title";
import { useEffect, useState } from "react";
import { useUserContext } from "@/app/contexts/userContext";

export default function BrowsePage() {
  const { user, setUser } = useUserContext();
  const [workouts, setWorkouts] = useState(null);
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showWorkouts, setShowWorkouts] = useState(true);

  useEffect(() => {
    Promise.all([fetch("/api/workouts"), fetch("/api/users")])
      .then(([res, res2]) => {
        return Promise.all([res.json(), res2.json()]);
      })
      .then(([workoutsData, usersData]) => {
        setIsLoading(false);
        setWorkouts(workoutsData);
        setUsers(usersData);
      });
  }, []);

  function handleShowContent(e) {
    setShowWorkouts(e.target.textContent === "Workouts");
  }

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <main>
      <Title text={"Browse"} />
      <div className="flex p-1 ml-12 mb-5">
        <p
          className={`mr-5 hover:cursor-pointer p-1 rounded ${
            showWorkouts ? "border font-bold" : null
          }`}
          onClick={handleShowContent}
        >
          Workouts
        </p>
        <p
          onClick={handleShowContent}
          className={`hover:cursor-pointer p-1 rounded ${
            !showWorkouts ? "border font-bold" : null
          }`}
        >
          Users
        </p>
      </div>

      {showWorkouts ? (
        <BrowseWorkoutsContainer workouts={workouts} />
      ) : (
        <BrowseUsersContainer users={users} />
      )}
    </main>
  );
}
