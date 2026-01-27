import { useEffect, useState } from "react";
import { getLastWatched, dateFormatter } from "./util";
import { FaHistory } from "react-icons/fa";
import { IconContext } from "react-icons";
import { IoStar } from "react-icons/io5";

export default function LastWatched({ data }) {
    const [films, setFilms] = useState([])
    const [size, setSize] = useState(5)

    const handleSizeChange = () => {
        const size = document.getElementById("size-selector").value
        setSize(size)
        getLastWatchedFilms(data, size)
    }   

    const getLastWatchedFilms = (data, size) => {
        const lastWatchedFilms = getLastWatched(data, size)
        setFilms(lastWatchedFilms)
    }

    useEffect(() => {
        getLastWatchedFilms(data, size)
    }, [data])

    return (
        <div className="card last-watched">
            <div className="card-header last-watched-header">
                <div className="title">
                    <IconContext.Provider value={{ style: {fontSize: "25"} }}>
                        <FaHistory />
                    </IconContext.Provider>
                    <h2>Recently rated</h2>
                </div>
                <div className="selector">
                    <p>Show</p>
                    <select id="size-selector" defaultValue="5" onChange={handleSizeChange}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                    </select>
                </div>   
            </div>
            {!films.length ? (
                <p>No films.</p>
            ) : (
                <div className="watch-history">
                    {films.map((film) => (
                        <div key={film.id || film.title}>
                            {film?.posterPath ? (
                                <img 
                                    src={film.posterPath}
                                    alt={film.title}
                                    style={{ borderRadius: "8px" }}
                                />
                            ) : (
                                <div>No poster.</div>
                            )}
                            <div style={{ fontWeight: "bold" }}>
                                {film.title}
                            </div>
                            <div style={{ color: "var(--muted-text)" }}>
                                {film.year}
                            </div>
                            <div style={{ display: "flex", gap: "var(--space-sm)", alignItems: "center", justifyContent: "center" }}>
                                <p style={{ fontWeight: "bold", margin: "0px" }}>{film.yourRating}</p>
                                <IoStar color="gold"/>
                            </div>
                            <div style={{ color: "var(--muted-text)" }}>
                                Rated on {dateFormatter(film.dateRated)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}