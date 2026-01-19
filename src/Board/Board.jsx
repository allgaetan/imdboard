import { useState } from 'react'
import ComponentContainer from './ComponentContainer.jsx'
import './Board.css'

export default function Board({ data }) {
    const [timeframe, setTimeframe] = useState('all')

    return (
        <div className="board">
            <div className="board-header">
                <h1>IMDB Dashboard</h1>
                <select className="timeframe-selector" defaultValue="all" onChange={(e) => setTimeframe(e.target.value)}>
                    <option value="last-7-days">Last 7 days</option>
                    <option value="last-30-days">Last 30 days</option>
                    <option value="last-90-days">Last 90 days</option>
                    <option value="last-180-days">Last 180 days</option>
                    <option value="last-365-days">Last 365 days</option>
                    <option value="all">All time</option>
                </select>
            </div>
            <div className="board-container">
                <ComponentContainer data={data} timeframe={timeframe} />
            </div>
        </div>
    )
}