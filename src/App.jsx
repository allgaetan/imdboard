import './App.css'
import { useEffect, useState } from 'react'
import { superParser } from './dataParsing'
import { fetchFilmMetadata } from "./tmdb"

import Upload from './Upload/Upload.jsx'
import Loading from './Upload/Loading.jsx'
import Header from './Header/Header.jsx'
import Board from './Board/Board.jsx'

export default function App() {
    const [data, setData] = useState(null)
    const [metadata, setMetadata] = useState(null)
    const [tab, setTab] = useState('board')
    const [progress, setProgress] = useState(0)
    const [source, setSource] = useState(null)

    const handleDataLoaded = async (file) => {
        const parsed = await superParser(file)
        const ratings = parsed.ratings
        const source = parsed.source
        setSource(source)
        setData(ratings)
        loadMetadata(ratings, source)
    }

    const loadMetadata = async (ratings, source) => {
        const length = ratings.length
        var idx = 0
        const metadata = []
        for (const rating of ratings) {
            const meta = await fetchFilmMetadata(rating, source)
            if (meta) metadata.push(meta)
            idx += 1
            setProgress((idx / length))
        }
        setMetadata(metadata)
    }

    return (
        <div className="app noise">
            {!(data && metadata) ? (
                <main className="main-content">
                    {(data ? (<>
                        <Loading source={source} progress={progress} />
                    </>) : (<>
                        <Upload onDataLoaded={handleDataLoaded} />
                    </>))}
                </main>  
            ) : (
                <main className="main-content">
                    <Header tab={tab} setTab={setTab} upload={!data} setData={setData} setMetadata={setMetadata} />
                    {tab === 'board' ? (
                        <Board metadata={metadata} />
                    ) : (
                        <div>Reports not available yet.</div>
                    )}
                </main>
            )}
        </div>
    )
}