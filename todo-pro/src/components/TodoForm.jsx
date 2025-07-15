import React, { useEffect } from "react";
import { useFormStatus } from "react-dom"; 
import { nanoid } from "nanoid";

const SubmitButton = ({ title }) => {
  const { pending } = useFormStatus(); 
  return (
    <button
      type="submit" 
      disabled={pending}
      className="mt-3 w-full rounded-2xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "wait..." : title}
    </button>
  );
};

const InputBox = ({ type, label, val, setVal }) => {
  return (
    <label htmlFor={label} className="mt-2 block"> 
      <input
        type={type}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        id={label}
        name={label}
        placeholder={`Enter ${label}`}
        className="mt-0.5 p-2 w-full rounded-2xl border-gray-300 shadow-sm sm:text-sm border-1"
      />
    </label>
  );
};

export default function TodoForm({ saveTask, currentTask }) { 
  const currentDate = new Date();
  const id = nanoid();
  const [task, setTask] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [date, setDate] = React.useState("");  

  useEffect(() => {
    setTask(currentTask.task);
    setDescription(currentTask.description);
    setDate(currentTask.date || currentDate.toISOString().split("T")[0]);
  }, [currentTask]);

  return (
    <div className="w-sm m-5 border border-gray-300 p-4 rounded-2xl">
      <h1 className="text-2xl font-light text-center">{currentTask.id ? "Update" : "Add"} Task</h1> 
      <form action={ async ()=>{
        await saveTask(currentTask.id ? currentTask.id : id, task, description, date);
        setTask("");
        setDescription("");
        setDate(currentDate.toISOString().split("T")[0]);
      }}>
        <InputBox type="text" label="Task" val={task} setVal={setTask} />
        <InputBox type="text" label="Description" val={description} setVal={setDescription}/>
        <InputBox type="date" label="Date" val={date} setVal={setDate} />
        <SubmitButton title={currentTask.id ? "Update Task" : "Add Task"} />
      </form>
    </div>
  );
}
