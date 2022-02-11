import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ScoresPage from "./pages/ScoresPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/scores" element={<ScoresPage />} />
      </Routes>
    </BrowserRouter>
  );
}
