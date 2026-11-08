import { Routes, Route } from "react-router"
import HomePage from "./pages/HomePage"
import WeatherPage from "./pages/WeatherPage"
import TipsPage from "./pages/TipsPage"
import TipDetailPage from "./pages/TipDetailPage"
import MyCropsPage from "./pages/MyCropsPage"
import NotFoundPage from "./pages/NotFoundPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/weather" element={<WeatherPage />} />
      <Route path="/tips" element={<TipsPage />} />
      <Route path="/tips/:slug" element={<TipDetailPage />} />
      <Route path="/my-crops" element={<MyCropsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
