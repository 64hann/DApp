import { Homepage } from "./pages/Homepage"
import { Events } from "./pages/Events"
import { Wallet } from "./pages/Wallet"
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import { EventDetails } from "./pages/EventDetails"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:title/:id" element={<EventDetails />} />
        <Route path="/tickets" element={<Wallet />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
