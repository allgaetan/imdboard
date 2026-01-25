import './App.css'
import { useState } from 'react'
import { imdbCSVParser } from './imdbCSVParser.js'
import { fetchFilmMetadata } from "./tmdb";

import Landing from './Landing/Landing.jsx'
import Loading from './Landing/Loading.jsx'
import Header from './Header/Header.jsx'
import Board from './Board/Board.jsx'

export default function App() {
    const apiKey = import.meta.env.VITE_API_KEY
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
            const meta = await fetchFilmMetadata(id, apiKey)
            if (meta) metadata[id] = meta
        }
        setMetadata(metadata)
    }

    return (
        <div className="app noise">
            {(!data || !metadata) ? (
                <main className="main-content">
                    {(data ? (
                        <Loading />
                    ) : (
                        <Landing onDataLoaded={handleDataLoaded} />
                    ))}
                </main>  
            ) : (
                <main className="main-content">
                    <Header tab={tab} setTab={setTab} landing={!data} setData={setData}/>
                    {tab === 'board' ? (
                        <Board data={data} metadata={metadata} />
                    ) : (
                        <div>Reports not available yet.</div>
                    )}
                </main>
            )}
        </div>
    )
}