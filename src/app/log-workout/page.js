"use client";

import { Title } from "../components/General/Title";
import { LogWorkoutContainer } from "../components/Log/LogWorkoutContainer";

export default function LogPage() {
  return (
    <>
      <Title text={"Log Workout"} />
      <div>
        <button className="ml-5 border p-1 rounded">Use a Template</button>
        <LogWorkoutContainer />
      </div>
    </>
  );
}
