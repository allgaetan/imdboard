import Overview from './components/Overview.jsx'
import RatingsDistribution from './components/RatingsDistribution.jsx'
import TopRatings from './components/TopRatings.jsx'
import DecadesDistribution from './components/DecadesDistribution.jsx'
import DirectorsDistribution from './components/DirectorsDistribution.jsx'
import GenresDistribution from './components/GenresDistribution.jsx'
import LastWatched from './components/LastWatched.jsx'
import { dataTimeFramer } from './dataTimeFramer.js'

export default function ComponentContainer({ data, timeframe }) {
    const framedData = dataTimeFramer(data, timeframe)

    return (
        <div className="component-container">
            <Overview data={framedData} />
            <GenresDistribution data={framedData} />
            <DirectorsDistribution data={framedData} />
            <DecadesDistribution data={framedData} />
            <RatingsDistribution data={framedData} />
            <LastWatched data={framedData} />
            <TopRatings data={framedData} />
        </div>
    )
}