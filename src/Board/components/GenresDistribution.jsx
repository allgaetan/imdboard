import { useState } from "react";
import { getGenreDistribution } from "./util";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { MdOutlineTheaterComedy } from "react-icons/md";
import { IconContext } from "react-icons";

export default function GenresDistribution({ data }) {
    const dist = getGenreDistribution(data)
    const sliced = Object.fromEntries(
        Object.entries(dist.count).slice(0, 10)
    )
    const ROW_HEIGHT = 32
    const chartHeight = Object.keys(sliced).length * ROW_HEIGHT

    const CustomTooltip = ({ active, payload, label }) => {
        if (!active || !payload || !payload.length) return null
        const count = payload[0].value
        return (
            <div
                style={{
                    background: "var(--muted-surface)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "8px",
                    padding: "10px 12px",
                    color: "var(--muted-text)",
                }}
            >
                <div style={{ fontSize: 12, opacity: 0.7 }}>
                    Genre
                </div>
                <div 
                    style={{ 
                        justifyContent: "center", 
                        fontSize: 16, 
                        fontWeight: 600, 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "5px", 
                    }}
                >
                    {label}
                </div>
                <div>
                    {count} films
                </div>
            </div>
        )
    }

    const [displayTooltip, setDisplayTooltip] = useState(false)
    const hideTooltip = () => {
        setDisplayTooltip(false)
    }
    const showTooltip = () => {
        setDisplayTooltip(true)
    }

    return (
        <div className="card genres-distribution">
            <div className="card-header">
                <IconContext.Provider value={{ style: {fontSize: "30"} }}>
                    <MdOutlineTheaterComedy />
                </IconContext.Provider>
                <h2>Genres watched</h2>
            </div>
            <div className="bar-chart">
                <BarChart 
                    layout="vertical"
                    responsive
                    height={chartHeight}
                    data={Object.entries(sliced).map(([genre, count]) => ({ genre, count }))}
                    onMouseEnter={showTooltip}
                    onMouseLeave={hideTooltip}
                >
                    <Bar 
                        dataKey="count" 
                        fill="var(--accent)" 
                        radius={[0, 5, 5, 0]}
                        activeBar={{ fill: "var(--accent-2)" }}
                    />
                    <XAxis type="count" hide={true}/>
                    <YAxis dataKey="genre" type="category" axisLine={false} tickLine={false} width={100}/>
                    <Tooltip 
                        cursor={{fill: "transparent"}}
                        content={<CustomTooltip />}
                        active={displayTooltip}
                    />
                </BarChart>
            </div>
        </div>
    )
}