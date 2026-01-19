import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { getRatingDistribution } from "./util.js";

export default function RatingsDistribution({ data }) {
    const distribution = getRatingDistribution(data);

    return (
        <div className="card ratings-distribution">
            <h2>Ratings distribution</h2>
            <BarChart width={500} height={300} data={Object.entries(distribution).map(([rating, count]) => ({ rating, count }))}>
                <Bar dataKey="count" fill="#8884d8" />
                <XAxis dataKey="rating" />
                <YAxis dataKey="count" />
            </BarChart>
        </div>
    );
}
