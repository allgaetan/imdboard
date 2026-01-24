import './App.css'
import { useState } from 'react'
import { imdbCSVParser } from './imdbCSVParser.js'

import Landing from './Landing/Landing.jsx'
import Header from './Header/Header.jsx'
import Board from './Board/Board.jsx'
import Reports from './Reports/Reports.jsx'

export default function App() {
    const [data, setData] = useState(null)
    const [tab, setTab] = useState('board')

    const handleDataLoaded = (csvContent) => {
        const ratings = imdbCSVParser(csvContent)
        if (ratings) {
            setData(ratings)
        } else {
            alert("No ratings found.")
        }
    }

    return (
        <div className="app noise">
            {!data ? (
                <main className="main-content">
                    <Landing onDataLoaded={handleDataLoaded} />
                </main>
            ) : (
                <main className="main-content">
                    <Header tab={tab} setTab={setTab} landing={!data} setData={setData}/>
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