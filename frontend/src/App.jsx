import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Placeholder imports for pages - will be updated as pages are migrated
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import CreateTrip from './pages/CreateTrip'
import Explore from './pages/Explore'
import TripDetails from './pages/TripDetails'
// import Chat from './pages/Chat' // If chat exists

import BackgroundMusic from './components/BackgroundMusic'

function App() {
    console.log('App component rendering')
    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/create" element={<CreateTrip />} />
                        <Route path="/explore" element={<Explore />} />
                        <Route path="/trip/:id" element={<TripDetails />} />
                        {/* <Route path="/chat" element={<Chat />} /> */}
                    </Routes>
                </main>
                <Footer />
                <BackgroundMusic />
            </div>
        </Router>
    )
}

export default App
