import { useEffect, useRef, useState } from "react";
import { getLastWatched, dateFormatter } from "./util";
import { FaHistory } from "react-icons/fa";
import { IconContext } from "react-icons";
import { IoStar } from "react-icons/io5";

export default function LastWatched({ data, metadata }) {
    const [items, setItems] = useState([])
    const [size, setSize] = useState(5)

    const handleSizeChange = () => {
        const size = document.getElementById("size-selector").value
        setSize(size)
        getLastWatchedMetadata(metadata, size)
    }

    const getLastWatchedMetadata = (metadata, size) => {
        const films = getLastWatched(data, size);
        const pairs = []
        for (const film of films) {
            const id = film.const
            const meta = metadata[id]
            pairs.push({ film, meta })
        }
        setItems(pairs)
    }

    useEffect(() => {
        getLastWatchedMetadata(metadata, size)
    }, [metadata])

    return (
        <div className="card last-watched">
            <div className="card-header" style={{ display: "flex", justifyContent: "space-between", paddingLeft: "10px", paddingRight: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
                    <IconContext.Provider value={{ style: {fontSize: "25"} }}>
                        <FaHistory />
                    </IconContext.Provider>
                    <h2>Recently watched</h2>
                </div>
                <div style={{ display: "flex", alignItems: "center"}}>
                    <p style={{ color: "var(--text)" }}>Show</p>
                    <select id="size-selector" defaultValue="5" onChange={handleSizeChange}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                    </select>
                </div>   
            </div>
            {!items.length ? (
                <p>No recent items.</p>
            ) : (
                <div className="watch-history">
                    {items.map(({ film, meta }) => (
                        <div key={film.const || film.title}>
                            {meta?.posterPath ? (
                                <img 
                                    src={meta.posterPath}
                                    alt={meta.title}
                                    style={{ borderRadius: "8px" }}
                                />
                            ) : (
                                <div>No poster</div>
                            )}
                            <div style={{ fontWeight: "bold" }}>
                                {meta?.title || film.title}
                            </div>
                            <div style={{ color: "var(--muted-text)" }}>
                                {meta.releaseYear ? `(${meta.releaseYear})` : ""}
                            </div>
                            <div style={{ display: "flex", gap: "var(--space-sm)", alignItems: "center", justifyContent: "center" }}>
                                <p style={{ fontWeight: "bold", margin: "0px" }}>{film.rating}</p>
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