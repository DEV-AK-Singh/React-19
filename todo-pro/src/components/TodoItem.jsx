import React from "react";

export default function TodoItem({task, editTask, deleteTask, handleIsDone, dragListeners}) {  
  return (
    <div className="flex justify-between items-center gap-4 bg-white border border-gray-300 px-4 py-2 rounded-2xl my-2 transition-all duration-200" >
      <div className="flex items-center gap-2">
        <input className="cursor-pointer" type="checkbox" name={task.task} id={task.id} checked={task.isDone} onChange={() => handleIsDone(task.id)}/>
        <label htmlFor={task.id} className={task.isDone ? "line-through cursor-pointer" : "cursor-pointer"}>{task.task}</label> 
      </div>
      <div className="flex items-center justify-center gap-2">
        <button className="cursor-pointer z-10" onClick={(e) => {e.stopPropagation(); editTask(task.id)}}><i className="fa-regular fa-pen-to-square text-blue-500"></i></button>
        <p> | </p>
        <button className="cursor-pointer z-10" onClick={(e) => {e.stopPropagation(); deleteTask(task.id)}}><i className="fa-solid fa-trash text-red-500"></i></button>
        <p> | </p>
        <button {...dragListeners} className="cursor-grab">
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
    </div>
  );
}
