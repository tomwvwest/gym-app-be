"use client";
import { HomePostContainer } from "./components/Posts/HomePostContainer";
import { LoadingSkeleton } from "./components/General/LoadingSkeleton";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => {
        setIsLoading(false);
        return res.json();
      })
      .then((postsData) => {
        setPosts(
          postsData.sort((a, b) => {
            return new Date(b.completed_at) - new Date(a.completed_at)
          })
        );
      });
  }, []);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <main>
      <HomePostContainer posts={posts} />
    </main>
  );
}
