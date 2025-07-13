import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails";
import PostForm from "./pages/PostForm";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/post/create" element={<PostForm />} />  
        <Route path="/post/update/:id" element={<PostForm />} />  
        <Route path="/posts/:id" element={<PostDetails />} /> 
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
