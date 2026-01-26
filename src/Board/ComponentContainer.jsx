import { dataTimeFramer } from './dataTimeFramer'

import Overview from './components/Overview.jsx'
import GenresDistribution from './components/GenresDistribution.jsx'
import DirectorsDistribution from './components/DirectorsDistribution.jsx'
import DecadesDistribution from './components/DecadesDistribution.jsx'
import RatingsDistribution from './components/RatingsDistribution.jsx'
import LastWatched from './components/LastWatched.jsx'
import TopRatings from './components/TopRatings.jsx'

export default function ComponentContainer({ data, metadata, timeframe }) {
    const framedData = dataTimeFramer(data, timeframe)

    return (
        <div className="component-container">
            <Overview data={framedData} />
            <GenresDistribution data={framedData} />
            <DirectorsDistribution data={framedData} />
            <DecadesDistribution data={framedData} />
            <RatingsDistribution data={framedData} />
            <LastWatched data={framedData} metadata={metadata}/>
            <TopRatings data={framedData} metadata={metadata} />
        </div>
    )
}