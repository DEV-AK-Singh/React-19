import { useContext, useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import useLocalStorage from "./hooks/useLocalStorage";
import { ThemeContext } from "./contexts/ThemeContext";
import ThemeToggler from "./components/ThemeToggler";
import { nanoid } from "nanoid";

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const initialTask = { task: "", description: "", date: "" };
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [currentTask, setCurrentTask] = useState(initialTask);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const saveTask = async (tid, task, description, date) => {
    if (task && description && date) {
      if (tid) {
        const newData = { id: tid, task, description, date };
        const oldData = tasks.find((task) => task.id === tid);
        setHistory([...history, { newData, oldData, type: "update" }]);
        setTasks(tasks.map((t) => (t.id === tid ? newData : t)));
      } else {
        const id = nanoid();
        const data = { id, task, description, date };
        setHistory([...history, { ...data, type: "save" }]);
        setTasks([...tasks, data]);
      }
      setHistoryIndex(historyIndex + 1);
      setCurrentTask(initialTask);
    } else {
      alert("Please fill all the fields");
    }
  };

  const editTask = async (id) => {
    setCurrentTask(tasks.find((task) => task.id === id));
  };

  const deleteTask = async (id) => {
    if (id === currentTask.id) setCurrentTask(initialTask);
    const data = tasks.find((task) => task.id === id);
    setTasks(tasks.filter((task) => task.id !== id));
    setHistory([...history, { ...data, type: "delete" }]);
    setHistoryIndex(historyIndex + 1);
  };

  const undo = (historyIndex) => {
    if (historyIndex === -1) return;
    if (historyIndex === history.length) {
      // console.log(history[history.length - 1]);
      handleUndo(history[history.length - 1]);
      setHistoryIndex(historyIndex - 2);
    } else {
      // console.log(history[historyIndex]);
      handleUndo(history[historyIndex]);
      setHistoryIndex(historyIndex - 1);
    }
  };

  const redo = (historyIndex) => {
    if (historyIndex === history.length - 1) return;
    if (historyIndex === -1) {
      // console.log(history[0]);
      handleRedo(history[0]);
      setHistoryIndex(0);
    } else {
      // console.log(history[historyIndex + 1]);
      handleRedo(history[historyIndex + 1]);
      setHistoryIndex(historyIndex + 1);
    }
  };

  const handleUndo = (data) => {
    if (data.type === "save") {
      // console.log("undo save", data);
      const id = data.id;
      setTasks(tasks.filter((task) => task.id !== id));
    } else if (data.type === "update") {
      // console.log("undo update", data);  
      const oldData = data.oldData;
      const id = oldData.id;  
      const task = oldData.task;
      const description = oldData.description;
      const date = oldData.date;
      editTask(id);
      setTasks(tasks.map((t) => (t.id === id ? { id, task, description, date } : t)));
    } else if (data.type === "delete") {
      // console.log("undo delete", data);
      const id = data.id;
      const task = data.task;
      const description = data.description;
      const date = data.date;
      setTasks([...tasks, { id, task, description, date }]);
    }
  };

  const handleRedo = (data) => {
    if (data.type === "save") {
      // console.log("undo save", data);
      const id = data.id;
      const task = data.task;
      const description = data.description;
      const date = data.date;
      setTasks([...tasks, { id, task, description, date }]);
    } else if (data.type === "update") {
      // console.log("redo update", data); 
      const newData = data.newData;
      const id = newData.id;
      const task = newData.task;
      const description = newData.description;
      const date = newData.date;
      setCurrentTask(initialTask);
      setTasks(tasks.map((t) => (t.id === id ? { id, task, description, date } : t)));
    } else if (data.type === "delete") {
      // console.log("undo delete", data);
      const id = data.id;
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const handleUndoAble = () => {
    if (historyIndex === -1) return false;
    return true;
  };

  const handleRedoAble = () => {
    if (historyIndex === history.length - 1) return false;
    return true;
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center sm:flex-row">
        <span className="absolute top-4 right-4">
          <ThemeToggler theme={theme} toggleTheme={toggleTheme} />
        </span>
        <div
          className={`w-full h-full flex justify-center items-center ${
            theme == "light" ? "bg-black" : "bg-white"
          }`}
        >
          <div>
            <div className="flex justify-between items-center gap-2">
              <h1
                className={`text-2xl font-light text-center mb-1 ${
                  theme == "light" ? "text-white" : "text-black"
                }`}
              >
                All Todos
              </h1>
              <p
                className={`border-l-2 border-r-2 border-gray-300 px-2 mx-2 ${
                  theme == "light" ? "text-white" : "text-black"
                }`}
              >
                {tasks.length}
              </p>
              <button
                onClick={() => setCurrentTask(initialTask)}
                className={`${
                  theme == "light"
                    ? "bg-black text-white hover:bg-gray-700 border border-white"
                    : "bg-white text-black hover:bg-gray-200 border border-black"
                } rounded-2xl px-3 py-1 text-xs cursor-pointer`}
              >
                Add Todo
              </button>
            </div>
            <hr
              className={`my-4 ${
                theme == "light" ? "bg-white text-white" : "bg-black text-black"
              }`}
            />
            <div className="max-h-[200px] overflow-y-auto">
              {tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <TodoItem
                    key={index}
                    task={task}
                    editTask={editTask}
                    deleteTask={deleteTask}
                  />
                ))
              ) : (
                <h1
                  className={`text-2xl font-light text-center mb-1 ${
                    theme == "light" ? "text-white" : "text-black"
                  }`}
                >
                  No Todos
                </h1>
              )}
            </div>
          </div>
        </div>
        <div
          className={`w-full h-full flex justify-center items-center ${
            theme == "light" ? "bg-white" : "bg-black"
          }`}
        >
          <TodoForm
            saveTask={saveTask}
            currentTask={currentTask}
            undo={() => undo(historyIndex)}
            undoAble={handleUndoAble()}
            redo={() => redo(historyIndex)}
            redoAble={handleRedoAble()}
          />
        </div>
      </div>
    </>
  );
}

export default App;
