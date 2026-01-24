import { useState } from 'react'
import ComponentContainer from './ComponentContainer.jsx'
import TimeframeSelector from './TimeframeSelector.jsx'
import './Board.css'

export default function Board({ data, metadata }) {
    const [timeframe, setTimeframe] = useState('all')
    let suffix = ""
    switch (timeframe) {
        case "last-7-days": suffix = "in the last 7 days" 
            break
        case "last-30-days": suffix = "in the last 30 days" 
            break
        case "last-90-days": suffix = "in the last 90 days" 
            break
        case "last-180-days": suffix = "in the last 180 days" 
            break
        case "last-365-days": suffix = "in the last 365 days" 
            break
        case "all": suffix = "all time" 
            break
    }

    return (
        <div className="board">
            <div className="board-header">
                <h1>Your stats {suffix}</h1>
                <TimeframeSelector timeframe={timeframe} onChange={setTimeframe} />
            </div>
            <div className="board-container">
                <ComponentContainer data={data} metadata={metadata} timeframe={timeframe} />
            </div>
        </div>
    )
}