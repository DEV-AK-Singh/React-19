import { useContext, useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import useLocalStorage from "./hooks/useLocalStorage";
import { ThemeContext } from "./contexts/ThemeContext";
import ThemeToggler from "./components/ThemeToggler";

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

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
        <span className="absolute top-4 right-4"><ThemeToggler theme={theme} toggleTheme={toggleTheme}/></span>
        <div className={`w-full h-full flex justify-center items-center ${theme == "light" ? "bg-black" : "bg-white"}`}>
          <div>
            <div className="flex justify-between items-center gap-2">
              <h1 className={`text-2xl font-light text-center mb-1 ${theme == "light" ? "text-white" : "text-black"}`}>
                All Todos
              </h1>
              <p className={`border-l-2 border-r-2 border-gray-300 px-2 mx-2 ${theme == "light" ? "text-white" : "text-black"}`}>{tasks.length}</p>
              <button
                onClick={() => setCurrentTask(initialTask)}
                className={`${theme == "light" ? "bg-black text-white hover:bg-gray-700 border border-white" : "bg-white text-black hover:bg-gray-200 border border-black"} rounded-2xl px-3 py-1 text-xs cursor-pointer`}
              >
                Add Todo
              </button>
            </div>
            <hr className={`my-4 ${theme == "light" ? "bg-white text-white" : "bg-black text-black"}`} />
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
                <h1 className={`text-2xl font-light text-center mb-1 ${theme == "light" ? "text-white" : "text-black"}`}>
                  No Todos
                </h1>
              )}
            </div>
          </div>
        </div>
        <div className={`w-full h-full flex justify-center items-center ${theme == "light" ? "bg-white" : "bg-black"}`}>
          <TodoForm saveTask={saveTask} currentTask={currentTask} />
        </div>
      </div>
    </>
  );
}

export default App;
