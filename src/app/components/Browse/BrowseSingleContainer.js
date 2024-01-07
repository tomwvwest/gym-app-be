import { useEffect } from "react"

export const BrowseSingleContainer = ({workout}) => {

  useEffect(()=> {
    fetch(`/api/users/3`).then(res => {console.log(res)})
  }, [])

  return (
    <div className="mb-4 w-[80%] bg-LightPurple text-platinum rounded-2xl p-4">
      <p className="font-bold">{workout.workout_name}</p>
    </div>
  )
}