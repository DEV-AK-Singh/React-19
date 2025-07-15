import React from "react";

export default function TodoItem({task, editTask, deleteTask}) {
  const [check, setCheck] = React.useState(false);
  return (
    <div className="flex justify-between items-center gap-4 bg-white border border-gray-300 px-4 py-2 rounded-2xl my-2">
      <div className="flex items-center gap-2">
        <input className="cursor-pointer" type="checkbox" name={task.task} id={task.id} onChange={(e) => setCheck(e.target.checked)}/>
        <label htmlFor={task.id} className={check ? "line-through cursor-pointer" : "cursor-pointer"}>{task.task}</label>
      </div>
      <div className="flex items-center gap-2">
        <button className="cursor-pointer" onClick={() => editTask(task.id)}><i className="fa-regular fa-pen-to-square text-blue-500"></i></button>
        <p> | </p>
        <button className="cursor-pointer" onClick={() => deleteTask(task.id)}><i className="fa-solid fa-trash text-red-500"></i></button>
      </div>
    </div>
  );
}
