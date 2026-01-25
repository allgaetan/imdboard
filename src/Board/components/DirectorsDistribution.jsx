import { getDirectorDistribution } from "./util";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { GiDirectorChair } from "react-icons/gi";
import { IconContext } from "react-icons";


export default function DirectorsDistribution({ data }) {
    const dist = getDirectorDistribution(data)
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
                    Director
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

    return (
        <div className="card directors-distribution">
            <div className="card-header">
                <IconContext.Provider value={{ style: {fontSize: "30"} }}>
                    < GiDirectorChair />
                </IconContext.Provider>
                <h2>Directors watched</h2>
            </div>
            <div className="bar-chart">
                <BarChart 
                    layout="vertical"
                    responsive
                    height={chartHeight}
                    data={Object.entries(sliced).map(([director, count]) => ({ director, count }))}
                >
                    <Bar 
                        dataKey="count" 
                        fill="var(--accent)" 
                        radius={[0, 5, 5, 0]}
                        activeBar={{ fill: "var(--accent-2)" }}
                    />
                    <XAxis type="count" hide={true}/>
                    <YAxis dataKey="director" type="category" axisLine={false} tickLine={false} width={100}/>
                    <Tooltip 
                        cursor={{fill: "transparent"}}
                        content={<CustomTooltip />}
                    />
                </BarChart>
            </div>
        </div>
    );
}