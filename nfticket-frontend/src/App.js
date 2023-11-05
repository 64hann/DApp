import { Homepage } from "./pages/Homepage"
import { Events } from "./pages/Events"
import { Wallet } from "./pages/Wallet"
import "bootstrap/dist/css/bootstrap.min.css"
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/events" element={<Events />} />
      <Route path="/tickets" element={<Wallet />} />
    </Routes>
  )
}

export default App
