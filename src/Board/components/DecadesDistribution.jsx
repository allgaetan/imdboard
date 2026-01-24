import { getDecadeDistribution } from "./util";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { CiCalendarDate } from "react-icons/ci";
import { IconContext } from "react-icons";

export default function DecadesDistribution({ data }) {
    const distribution = getDecadeDistribution(data)
    const ROW_HEIGHT = 32
    const chartHeight = Object.keys(distribution).length * ROW_HEIGHT

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
                    Decade
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
        <div className="card decades-distribution">
            <div className="card-header">
                <IconContext.Provider value={{ style: {fontSize: "35"} }}>
                    <CiCalendarDate />
                </IconContext.Provider>
                <h2>Decades watched</h2>
            </div>
            <div className="bar-chart">
                <BarChart 
                    layout="vertical"
                    responsive
                    height={chartHeight}
                    data={distribution.map(([decade, count]) => ({ decade, count }))}
                >
                    <Bar 
                        dataKey="count" 
                        fill="var(--accent)" 
                        radius={[0, 5, 5, 0]}
                        activeBar={{ fill: "var(--accent-2)" }}
                    />
                    <XAxis type="count" hide={true}/>
                    <YAxis dataKey="decade" type="category" axisLine={false} tickLine={false} />
                    <Tooltip 
                        cursor={{fill: "transparent"}}
                        content={<CustomTooltip />}
                    />
                </BarChart>
            </div>
        </div>
    );
}