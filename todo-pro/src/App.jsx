import { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const initialTask = { task: "", description: "", date: "" };
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [currentTask, setCurrentTask] = useState(initialTask);

  const saveTask = async (id, task, description, date) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (task && description && date) {
      const data = { id, task, description, date };
      if (id === currentTask.id) {
        setTasks(tasks.map((t) => (t.id === id ? data : t)));
      } else {
        setTasks([...tasks, data]);
      }
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
    setTasks(tasks.filter((task) => task.id !== id));
  };   

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="w-full h-full flex justify-center items-center bg-black">
          <div>
            <div className="flex justify-between items-center gap-2">
              <h1 className="text-2xl font-light text-center text-white mb-1">
                All Todos | {tasks.length} |
              </h1>
              <button
                onClick={() => setCurrentTask(initialTask)}
                className="text-black bg-white rounded-2xl px-4 py-2 text-xs cursor-pointer hover:bg-gray-200"
              >
                Add Todo
              </button>
            </div>
            <hr className="my-4 bg-white text-white" />
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
                <h1 className="text-2xl font-light text-center text-white mb-1">
                  No Todos
                </h1>
              )}
            </div>
          </div>
        </div>
        <div className="w-full h-full flex justify-center items-center bg-white">
          <TodoForm saveTask={saveTask} currentTask={currentTask} />
        </div>
      </div>
    </>
  );
}

export default App;
