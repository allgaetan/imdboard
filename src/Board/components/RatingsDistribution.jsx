import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { IoStatsChart } from "react-icons/io5";
import { IconContext } from "react-icons";
import { IoStar } from "react-icons/io5";
import { getRatingDistribution } from "./util";
import { useState } from "react";

export default function RatingsDistribution({ data }) {
    const distribution = getRatingDistribution(data)

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
                    Rating
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
                    <p style={{ margin: 0 }}>{label}</p> 
                    <IoStar color="gold"/>
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
        <div className="card ratings-distribution">
            <div className="card-header">
                <IconContext.Provider value={{ style: {fontSize: "30"} }}>
                    <IoStatsChart />
                </IconContext.Provider>
                <h2>Ratings distribution</h2>
            </div>
            <div className="bar-chart">
                <BarChart 
                    responsive
                    width={450} 
                    height={200} 
                    data={Object.entries(distribution).map(([rating, count]) => ({ rating, count }))}
                    onMouseLeave={hideTooltip}
                    onMouseEnter={showTooltip}
                >
                    <Bar 
                        dataKey="count" 
                        fill="var(--accent)" 
                        radius={[5, 5, 0, 0]}
                        activeBar={{ fill: "var(--accent-2)" }}
                    />
                    <XAxis dataKey="rating" axisLine={false} tickLine={false} />
                    <YAxis dataKey="count" hide={true} />
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
