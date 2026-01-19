export default function AllRatings({ data }) {
    return (
        <div className="card">
            <h2>All Ratings</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}