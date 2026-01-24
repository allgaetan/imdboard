import './App.css'
import { useState } from 'react'
import { imdbCSVParser } from './imdbCSVParser.js'
import { fetchMovieMetadata } from "./tmdb";

import Landing from './Landing/Landing.jsx'
import Header from './Header/Header.jsx'
import Board from './Board/Board.jsx'
import Reports from './Reports/Reports.jsx'

export default function App() {
    const apiKey="da4921b664b5f312706abe8914cbd57c"
    const [data, setData] = useState(null)
    const [metadata, setMetadata] = useState(null)
    const [tab, setTab] = useState('board')

    const handleDataLoaded = (csvContent) => {
        const ratings = imdbCSVParser(csvContent)
        if (ratings) {
            setData(ratings)
            loadMetadata(ratings)
        } else {
            alert("No ratings found.")
        }
    }

    const loadMetadata = async (data) => {
        const metadata = {}
        for (const film of data) {
            const id = film.const
            const meta = await fetchMovieMetadata(id, apiKey)
            if (meta) metadata[id] = meta
        }
        setMetadata(metadata)
    }

    return (
        <div className="app noise">
            {(!data || !metadata) ? (
                <main className="main-content">
                    <Landing onDataLoaded={handleDataLoaded} />
                </main>  
            ) : (
                <main className="main-content">
                    <Header tab={tab} setTab={setTab} landing={!data} setData={setData}/>
                    {tab === 'board' ? (
                        <Board data={data} metadata={metadata}/>
                    ) : (
                        <Reports data={data} />
                    )}
                </main>
            )}
        </div>
    )
}