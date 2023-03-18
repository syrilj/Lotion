import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import Layout from "./pages/Layout";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Navigate to ="/notes" />}></Route>
          <Route path="/notes" element={<Home />}></Route>
          <Route path="/notes/:id" element={<Home />}></Route>
          <Route path="/notes/:id/edit" element={<Edit />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
