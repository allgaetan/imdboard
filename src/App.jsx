import './App.css'
import { useState } from 'react'
import { imdbCSVParser } from './imdbCSVParser.js'

import Landing from './Landing/Landing.jsx'
import Header from './Header/Header.jsx'
import Sidebar from './Sidebar/Sidebar.jsx'
import Board from './Board/Board.jsx'
import Reports from './Reports/Reports.jsx'

export default function App() {
    const [data, setData] = useState(null)
    const [tab, setTab] = useState('board')
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const handleDataLoaded = (csvContent) => {
        const ratings = imdbCSVParser(csvContent)
        if (ratings) {
            setData(ratings)
        } else {
            alert("No ratings found.")
        }
    }

    return (
        <div className="app">
            <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
            <Sidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onSelect={(p) => { setTab(p); setSidebarOpen(false) }}
            />
            {!data ? (
                <Landing onDataLoaded={handleDataLoaded} />
            ) : (
                <main className="main-content">
                    {tab === 'board' ? (
                        <Board data={data} />
                    ) : (
                        <Reports data={data} />
                    )}
                </main>
            )}
        </div>
    )
}