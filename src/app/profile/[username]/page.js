"use client";
import { LoadingSkeleton } from "@/app/components/General/LoadingSkeleton";
import { Title } from "@/app/components/General/Title";
import { useEffect, useState } from "react";
import { useUserContext } from "@/app/contexts/userContext";
import WorkoutCard from "../../components/workouts/WorkoutCard";
import { UserPostContainer } from "@/app/components/Posts/UserPosts";
import { useRouter } from "next/navigation";

export default function ProfilePage({params}) {
  const { user, setUser } = useUserContext();
  const [profileUser, setProfileUser] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    Promise.all([fetch(`/api/workouts`), fetch(`/api/posts`), fetch(`/api/users/profile/${params.username}`)])
      .then(([res, res2, res3]) => {
        return Promise.all([res.json(), res2.json(), res3.json()]);
      })
      .then(([workoutsData, postsData, userData]) => {
        setProfileUser(userData)
        const workoutData = workoutsData.filter(
          (workout) => workout.creator_id === userData.user_id
        );
        const postData = postsData.filter((post) => post.user_id === userData.user_id);
        setWorkouts(workoutData);
        setPosts(postData);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  const handleLogout = () => {
    setUser({});
    router.push("/");
  };

  return (
    <>
      <div className="flex justify-between items-end pr-16">
        <Title text={`${profileUser.username}`} />
        {user.username === profileUser.username ? 
          <button className="border rounded-lg p-2" onClick={handleLogout}>
            Logout
          </button> :
          null
        }
      </div>
      <div className="px-12 pt-4 flex justify-around">
        <div className="w-full">
          <p className="text-2xl font-bold text-DeepPurple">Recent Posts</p>
          <div className="rounded-2xl border w-5/6 mt-3">
            {posts.map((post, index, array) => {
              const isNotLastChild = index !== array.length - 1 ? true : false;
              return (
                <div key={post.post_id} className="flex justify-center mt-3">
                  <UserPostContainer
                    post={post}
                    isNotLastChild={isNotLastChild}
                  />
                </div>
              );
            })}
            {posts.length > 1 ? <hr className="text" /> : null}
          </div>
        </div>
        <div className="w-full">
          <p className="text-2xl font-bold text-DeepPurple">Workouts</p>
          {workouts.map((workout) => {
            return (
              <div className="flex justify-start w-full" key={workout.workout_id}>
                <WorkoutCard
                  canDelete={user.user_id === workout.creator_id}
                  workout={workout}
                  setIsDeleted={setIsDeleted}
                  setWorkouts={setWorkouts}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
