import { GrOverview } from "react-icons/gr";
import { IconContext } from "react-icons";
import { IoStar } from "react-icons/io5";
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
            <div className="card-header">
                <IconContext.Provider value={{ style: {fontSize: "30"} }}>
                    <GrOverview />
                </IconContext.Provider>
                <h2>Overview</h2>
            </div>
            <div className="overview-stats">
                <div className="nb-films">
                    <h1>{numberOfFilmsWatched}</h1>
                    <p>Number of films watched</p>
                </div>
                <div className="time-watched">
                    <h1>
                        {totalTimeWatched.toFixed(1)}
                        <p>hours</p>
                    </h1>
                    <p>Total watch time</p>
                </div>
                <div className="average">
                    <h1>
                        {averageRating}
                        <IoStar color="gold"/>
                    </h1>
                    <p>Average rating</p>
                </div>
            </div>
            
        </div>
    )
}