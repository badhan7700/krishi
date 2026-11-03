import { Routes, Route } from "react-router"
import HomePage from "./pages/HomePage"
import WeatherPage from "./pages/WeatherPage"
import NotFoundPage from "./pages/NotFoundPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/weather" element={<WeatherPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App