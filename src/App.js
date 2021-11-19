import HomePage from "./pages/HomePage";
import CoinPage from "./pages/CoinPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/coins/:id" element={<CoinPage />} exact />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
