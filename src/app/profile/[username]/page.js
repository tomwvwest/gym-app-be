"use client";
import { LoadingSkeleton } from "@/app/components/General/LoadingSkeleton";
import { Title } from "@/app/components/General/Title";
import { useEffect, useState } from "react";

export default function ProfilePage(req) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const username = req.params.username;

  useEffect(() => {
    fetch(`/api/users`)
      .then((res) => {
        return res.json();
      })
      .then((usersData) => {
        const userData = usersData.find((user) => user.username === username);
        setUser(userData);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      <Title text={`${username}`} />
      <div className="px-12 pt-4">
        <div className="">
          <p className="text-2xl font-bold text-DeepPurple">Recent Posts</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-DeepPurple">Workouts</p>
        </div>
      </div>
    </>
  );
}
