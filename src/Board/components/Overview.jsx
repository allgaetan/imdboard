import { getAverageRating, 
    getNumberOfFilmsWatched,
    getTotalTimeWatchedInHours,
    getLongestStreak} from "./util.js"

export default function Overview({ data }) {
    const numberOfFilmsWatched = getNumberOfFilmsWatched(data)
    const totalTimeWatched = getTotalTimeWatchedInHours(data)
    const averageRating = getAverageRating(data)
    const longestStreak = getLongestStreak(data)

    return (
        <div className="card overview">
            <h2>Overview</h2>
            <p>Number of films watched: {numberOfFilmsWatched}</p>
            <p>Total time watched: {totalTimeWatched} hours</p>
            <p>Average rating: {averageRating}</p>
            <p>Longest streak: {longestStreak} days</p>
        </div>
    )
}