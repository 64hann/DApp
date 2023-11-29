import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"

//CSS
import "./App.css"
import "./components/components.css"

//Pages
import { Landing } from "./pages/Landing"
import { Homepage } from "./pages/Homepage"
import { Events } from "./pages/Events"
import { Wallet } from "./pages/Wallet"
import { EventDetails } from "./pages/EventDetails"
import { Marketplace } from "./pages/Marketplace"
import { MobileError, NotFoundPage } from "./pages/Errors"

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1005)
    }

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (isMobile) {
    console.log("mobile")
    return <MobileError />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:title/:id" element={<EventDetails />} />
        <Route path="/tickets" element={<Wallet />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
