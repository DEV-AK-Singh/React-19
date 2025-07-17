import React, { useContext, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { ThemeContext } from "../contexts/ThemeContext";

const Button = ({ title, type, disabled, action, theme }) => {
  const { pending } = useFormStatus();
  return (
    <button
      type={type}
      disabled={disabled || pending}
      onClick={action || null}
      className={`mt-3 w-full rounded-2xl px-4 py-2 text-sm font-medium hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border-2 border-black ${
        theme == "dark" ? "bg-white text-black " : "bg-gray-500 text-white "
      }`}
    >
      {pending ? "wait..." : title}
    </button>
  );
};

const InputBox = ({ type, label, val, setVal }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <label htmlFor={label} className="mt-2 block">
      <input
        type={type}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        id={label}
        name={label}
        placeholder={`Enter ${label}`}
        className={`mt-0.5 p-2 w-full rounded-2xl border-gray-300 shadow-sm sm:text-sm border-1 placeholder:text-gray-400 ${
          theme == "dark" ? "text-white" : "text-black"
        }`}
      />
    </label>
  );
};

export default function TodoForm({
  saveTask,
  currentTask,
  undo,
  undoAble,
  redo,
  redoAble,
}) {
  const { theme } = useContext(ThemeContext);
  const currentDate = new Date();
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
      <h1
        className={`text-2xl font-light text-center ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        {currentTask.id ? "Update" : "Add"} Task
      </h1>
      <form
        action={async () => {
          await saveTask(
            currentTask.id ? currentTask.id : null,
            task,
            description,
            date
          );
          setTask("");
          setDescription("");
          setDate(currentDate.toISOString().split("T")[0]);
        }}
      >
        <InputBox type="text" label="Task" val={task} setVal={setTask} />
        <InputBox
          type="text"
          label="Description"
          val={description}
          setVal={setDescription}
        />
        <InputBox type="date" label="Date" val={date} setVal={setDate} />
        <Button
          title={currentTask.id ? "Update Task" : "Add Task"}
          type="submit"
          disabled={null}
          action={null}
          theme={"dark"}
        />
        <div className="flex justify-between items-center gap-2">
          <Button
            title={"Undo"}
            type="button"
            disabled={!undoAble}
            action={undo}
            theme={"dark"}
          />
          <Button
            title={"Redo"}
            type="button"
            disabled={!redoAble}
            action={redo}
            theme={"light"}
          />
        </div>
      </form>
    </div>
  );
}
