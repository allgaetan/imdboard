import { getHighestRatedFilms } from "./util";
import { useState, useEffect } from "react";

export default function TopRatings({ data, metadata }) {
    const [items, setItems] = useState([])

    const getTopFilmsMetadata = (metadata) => {
        const films = getHighestRatedFilms(data, 5)
        const pairs = []
        for (const film of films) {
            const id = film.const
            const meta = metadata[id]
            pairs.push({ film, meta })
        }
        setItems(pairs)
    }

    useEffect(() => {
        getTopFilmsMetadata(metadata)
    }, [metadata])

    return (
        <div className="card top-ratings">
            <div className="card-header">
                <h2>Top Ratings</h2>
                <p>Not implemented yet.</p>
            </div>
            <div className="top-films">
                <div className="top-film">

                </div>
                <li className="next-films">

                </li>
            </div>
            <div className="top-directors">

            </div>
            <div className="top-genres">

            </div>
        </div>
    );
}