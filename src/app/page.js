"use client";
import { HomePostContainer } from "./components/Posts/HomePostContainer";
import { LoadingSkeleton } from "./components/General/LoadingSkeleton";
import { Title } from "./components/General/Title";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => {
        setIsLoading(false)
        return res.json();
      })
      .then((postsData) => {
        setPosts(postsData);
      });
  }, []);

  if(isLoading) {
    return <LoadingSkeleton/>
  }

  return (
    <main>
        <Title text={"Home"}/>
        <HomePostContainer posts={posts}/>
    </main>
  );
}