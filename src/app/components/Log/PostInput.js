import { useState } from "react";

export const PostInput = ({setTitle, setDescription}) => {
  

  function handleChangeTitle(e){
    setTitle(e.target.value)
  }
  function handleChangeDescription(e){
    setDescription(e.target.value)
  }


  return (
    <>
      <p className="mr-2">Title: </p>
      <input className="p-2 focus:outline-none rounded-lg" onChange={handleChangeTitle}></input>
      <p className="ml-10 mr-2">Description: </p>
      <input className="p-2 focus:outline-none rounded-lg w-96" onChange={handleChangeDescription}></input>
    </>
  );
};
