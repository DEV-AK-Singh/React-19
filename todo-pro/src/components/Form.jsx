import React, { useEffect } from "react";
import { useFormStatus } from "react-dom";

const TasksContext = React.createContext();

const SubmitButton = ({ title }) => {
  const { pending } = useFormStatus(); 
  return (
    <button
      type="submit" 
      disabled={pending}
      className="mt-6 w-full rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "wait..." : title}
    </button>
  );
};

const InputBox = ({ type, label, val, setVal }) => {
  return (
    <label htmlFor={label} className="mt-2 block">
      <span className="text-sm font-medium text-gray-700"> {label} </span>
      <input
        type={type}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        id={label}
        name={label}
        placeholder={`Enter ${label}`}
        className="mt-0.5 p-2 w-full rounded border-gray-300 shadow-sm sm:text-sm border-1"
      />
    </label>
  );
};

export default function Form() {
  const currentDate = new Date();
  const [task, setTask] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [date, setDate] = React.useState("");

  useEffect(() => {
    setDate(currentDate.toISOString().split("T")[0]);
  }, []);
  
  const saveTask = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); 
    if (task && description && date) {
      const data = { task, description, date };
      console.log(data);
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <div className="max-w-sm m-5">
      <form action={saveTask}>
        <InputBox type="text" label="Task" val={task} setVal={setTask} />
        <InputBox type="text" label="Description" val={description} setVal={setDescription}/>
        <InputBox type="date" label="Date" val={date} setVal={setDate} />
        <SubmitButton title="Submit" />
      </form>
    </div>
  );
}
