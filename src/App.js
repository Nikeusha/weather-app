import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Weekly from "./pages/Weekly";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/weather-app" element={<Home />} />
          <Route path="/weekly" element={<Weekly />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
