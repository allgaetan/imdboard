import { useState, useEffect } from "react";
import { fetchPersonPicture } from "../../tmdb";
import { getHighestRatedFilms, getDirectorDistribution, getGenreDistribution } from "./util";
import { IoStar } from "react-icons/io5";
import { GiStarsStack } from "react-icons/gi";
import { IconContext } from "react-icons";
import { FaFilm } from "react-icons/fa6";
import { GiDirectorChair } from "react-icons/gi";
import { MdOutlineTheaterComedy } from "react-icons/md";

export default function TopRatings({ data, metadata }) {
    const apiKey = import.meta.env.VITE_API_KEY
    const TOP_FILM_DISPLAY = 2
    const TOP_DIRECTOR_DISPLAY = 2
    /**
     * Top films
     */
    const [filmMeta, setFilmMeta] = useState([])
    const films = getHighestRatedFilms(data, 10)
    const getTopFilmsMetadata = (metadata) => {
        const pairs = []
        for (const film of films) {
            const id = film.const
            const meta = metadata[id]
            pairs.push({ film, meta })
        }
        setFilmMeta(pairs)
    }
    /**
     * Top directors
     */
    const [directorPics, setDirectorsPics] = useState([])
    const dirDist = getDirectorDistribution(data)
    const dirSliced = Object.fromEntries(
        Object.entries(dirDist.rating).slice(0, 10)
    )
    const getTopDirectorsPicture = async () => {
        const pairs = []
        var iter = 0
        for (const director of Object.keys(dirSliced)) {
            iter += 1
            const name = director
            if (iter > TOP_DIRECTOR_DISPLAY) {
                pairs.push({ name })
            } else {
                const directorPic = await fetchPersonPicture(name, apiKey)
                if (directorPic) pairs.push({ name, directorPic })
                    else pairs.push({ name })
            }
        }
        setDirectorsPics(pairs)
    }
    /**
     * Top genres
     */
    const [genres, setGenres] = useState([])
    const genresDist = getGenreDistribution(data, 10)
    const genresSliced = Object.fromEntries(
        Object.entries(genresDist.rating).slice(0, 10)
    )
    const getTopGenres = () => {
        const pairs = []
        for (const genre of Object.keys(genresSliced)) {
            const name = genre
            const rating = genresSliced[name]
            pairs.push({ name, rating })
        }
        setGenres(pairs)
    }
    /**
     * useEffect()
     */
    useEffect(() => {
        getTopFilmsMetadata(metadata)
        getTopDirectorsPicture()
        getTopGenres()
    }, [data, metadata])

    return (
        <div className="card top-ratings">
            <div className="card-header">
                <IconContext.Provider value={{ style: {fontSize: "30"} }}>
                    <GiStarsStack />
                </IconContext.Provider>
                <h2>Top ratings</h2>
            </div>
            <div className="top-ratings-header">
                <IconContext.Provider value={{ style: {fontSize: "20"} }}>
                    <FaFilm />
                </IconContext.Provider>
                <h2>Top 10 films</h2>
            </div>
            {!filmMeta.length ? (
                <p>No items.</p>
            ) : (<>
                <div className="top-films" style={{ display: "grid", gridTemplateColumns: `repeat(${TOP_FILM_DISPLAY}, 1fr)` }}>
                    {filmMeta.map(({ film, meta }, idx) => (<>
                        {(idx <= TOP_FILM_DISPLAY - 1) ? (<div>
                            {meta?.posterPath ? (
                                <img 
                                    src={meta.posterPath}
                                    alt={film.title}
                                />
                            ) : (
                                <div>No poster</div>
                            )}
                            <div style={{ fontWeight: "bold" }}>
                                {idx + 1}. {film.title}
                            </div>
                            <div style={{ color: "var(--muted-text)" }}>
                                {film.year}
                            </div>
                            <div style={{ display: "flex", gap: "var(--space-sm)", alignItems: "center", justifyContent: "center" }}>
                                <p style={{ fontWeight: "bold", margin: "0px" }}>{film.rating}</p>
                                <IoStar color="gold"/>
                            </div>
                        </div>) : (<></>)}
                    </>))}
                </div>
                <div className="lines-display">
                    {filmMeta.map(({ film }, idx) => (
                        <div>
                            {(idx > TOP_FILM_DISPLAY - 1) ? (
                                <div className="line">
                                    <div>
                                        <p style={{ fontWeight: "bold", margin: "0px", textAlign: "left" }}>{idx + 1}. {film.title}</p>
                                        <div style={{ color: "var(--muted-text)", textAlign: "left" }}>{film.directors} ({film.year})</div>
                                    </div>   
                                    <div style={{ display: "flex", gap: "var(--space-sm)", alignItems: "center", justifyContent: "center" }}>
                                        <p style={{ fontWeight: "bold", margin: "0px" }}>{film.rating}</p>
                                        <IoStar color="gold" />
                                    </div>
                                </div>
                            ) : (<></>)}
                        </div>
                    ))}
                </div>
            </>)}

            <div className="top-ratings-header">
                <IconContext.Provider value={{ style: {fontSize: "30"} }}>
                    <GiDirectorChair />
                </IconContext.Provider>
                <h2>Top 10 directors</h2>
            </div>
            {!directorPics.length ? (
                <p>No items.</p>
            ) : (<>
                <div className="top-directors" style={{ display: "grid", gridTemplateColumns: `repeat(${TOP_DIRECTOR_DISPLAY}, 1fr)` }}>
                    {directorPics.map(({ name, directorPic }, idx) => (<>
                        {(idx <= TOP_DIRECTOR_DISPLAY - 1) ? (<div>
                            {directorPic?.imagePath ? (
                                <img 
                                    src={directorPic.imagePath}
                                    alt={name}
                                />
                            ) : (
                                <IconContext.Provider value={{ style: {fontSize: "120"}}}>
                                    <MdOutlineTheaterComedy />
                                </IconContext.Provider>
                            )}
                            <div style={{ fontWeight: "bold" }}>
                                {idx + 1}. {name}
                            </div>
                            <div style={{ color: "var(--muted-text)" }}>{dirDist.count[name]} film(s) watched</div>
                            <div style={{ display: "flex", gap: "var(--space-sm)", alignItems: "center", justifyContent: "center" }}>
                                <p style={{ fontWeight: "bold", margin: "0px" }}>{dirDist.rating[name]}</p>
                                <IoStar color="gold" />
                            </div>
                        </div>) : (<></>)}
                    </>))}
                </div>
                <div className="lines-display">
                    {directorPics.map(({ name }, idx) => (
                        <div>
                            {(idx > TOP_DIRECTOR_DISPLAY - 1) ? (
                                <div className="line">
                                    <div>
                                        <p style={{ fontWeight: "bold", margin: "0px", textAlign: "left" }}>{idx + 1}. {name}</p>
                                        <div style={{ color: "var(--muted-text)", textAlign: "left" }}>{dirDist.count[name]} film(s) watched</div>
                                    </div> 
                                    <div style={{ display: "flex", gap: "var(--space-sm)", alignItems: "center", justifyContent: "center" }}>
                                        <p style={{ fontWeight: "bold", margin: "0px" }}>{dirDist.rating[name]}</p>
                                        <IoStar color="gold" />
                                    </div>
                                </div>
                            ) : (<></>)}
                        </div>
                    ))}
                </div>
            </>)}

            <div className="top-ratings-header">
                <IconContext.Provider value={{ style: {fontSize: "30"} }}>
                    <MdOutlineTheaterComedy />
                </IconContext.Provider>
                <h2>Top 10 genres</h2>
            </div>
            {!genres.length ? (
                <p>No items.</p>
            ) : (
                <div className="lines-display">
                    {genres.map(({ name, rating }, idx) => (<>
                        <div className="line" key={name}>
                            <div>
                                <p style={{ fontWeight: "bold", margin: "0px", textAlign: "left" }}>{idx + 1}. {name}</p>
                                <div style={{ color: "var(--muted-text)" }}>{genresDist.count[name]} film(s) watched</div>
                            </div>   
                            <div style={{ display: "flex", gap: "var(--space-sm)", alignItems: "center", justifyContent: "center" }}>
                                <p style={{ fontWeight: "bold", margin: "0px" }}>{rating.toFixed(1)}</p>
                                <IoStar color="gold" />
                            </div>
                        </div>
                    </>))}
                </div>
            )}
  
        </div>
    );
}