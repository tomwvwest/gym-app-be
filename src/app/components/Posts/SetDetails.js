import { useState } from "react"

export const SetDetails = ({exercise}) => {
  //[name, [1,2,3], [11,11,11]]
  let setInfo = "";
  for(let i = 0; i<exercise[1].length; i++){
    if(i=== exercise[1].length -1){
      setInfo += `${exercise[2][i]} x ${exercise[1][i]}kg `
    } else{
      setInfo += `${exercise[2][i]} x ${exercise[1][i]}kg, `
    }
  }

  return (
    <div className="mb-2">
      {exercise[1].length} x {exercise[0]} 
      <p className="italic ml-1 opacity-80">({setInfo})</p>
    </div>
  )
}