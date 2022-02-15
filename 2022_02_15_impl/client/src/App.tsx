import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Post } from "./pages/Posts";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
};
