"use client";

import { BrowseWorkoutsContainer } from "../components/Browse/BrowseWorkoutsContainer";
import { LoadingSkeleton } from "../components/General/LoadingSkeleton";
import { Title } from "../components/General/Title";
import { useEffect, useState } from "react";

export default function BrowsePage(){

  const [workouts, setWorkouts] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch("/api/workouts")
      .then((res) => {
        setIsLoading(false)
        return res.json();
      })
      .then((workoutsData) => {
        console.log(workoutsData)
        setWorkouts(workoutsData);
      });
  }, []);

  if(isLoading) {
    return <LoadingSkeleton/>
  }

  return(
    <main>
      <Title text={"Browse Workouts"}/>
      <BrowseWorkoutsContainer workouts={workouts}/>
    </main>
  )
}