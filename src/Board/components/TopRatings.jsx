import { getHighestRatedFilms, getDirectorDistribution, getGenreDistribution } from "./util";
import { useState, useEffect } from "react";
import { IoStar } from "react-icons/io5";
import { GiStarsStack } from "react-icons/gi";
import { IconContext } from "react-icons";
import { FaFilm } from "react-icons/fa6";
import { GiDirectorChair } from "react-icons/gi";
import { MdOutlineTheaterComedy } from "react-icons/md";
import { fetchPersonPicture } from "../../tmdb";
import { CgComedyCentral } from "react-icons/cg";

export default function TopRatings({ data, metadata }) {
    const apiKey = import.meta.env.VITE_API_KEY
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
        for (const director of Object.keys(dirSliced)) {
            const name = director
            const directorPic = await fetchPersonPicture(name, apiKey)
            if (directorPic) pairs.push({ name, directorPic })
                else pairs.push({ name })
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
     * 
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

            <div className="card-header">
                <IconContext.Provider value={{ style: {fontSize: "20"} }}>
                    <FaFilm />
                </IconContext.Provider>
                <h2>Top 10 films</h2>
            </div>
            {!filmMeta.length ? (
                <p>No items.</p>
            ) : (
                <div className="top-films">
                    {filmMeta.map(({ film, meta }) => (
                        <div key={film.const || film.title}>
                            {meta?.posterPath ? (
                                <img 
                                    src={meta.posterPath}
                                    alt={film.title}
                                />
                            ) : (
                                <div>No poster</div>
                            )}
                            <div style={{ fontWeight: "bold" }}>
                                {film.title}
                            </div>
                            <div style={{ color: "var(--muted-text)" }}>
                                {film.year}
                            </div>
                            <div style={{ display: "flex", gap: "var(--space-sm)", alignItems: "center", justifyContent: "center" }}>
                                <p style={{ fontWeight: "bold", margin: "0px" }}>{film.rating}</p>
                                <IoStar color="gold"/>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="card-header">
                <IconContext.Provider value={{ style: {fontSize: "30"} }}>
                    <GiDirectorChair />
                </IconContext.Provider>
                <h2>Top 10 directors</h2>
            </div>
            {!directorPics.length ? (
                <p>No items.</p>
            ) : (
                <div className="top-directors">
                    {directorPics.map(({ name, directorPic }) => (
                        <div key={name}>
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
                                {name}
                            </div>
                            <div style={{ color: "var(--muted-text)" }}>{dirDist.count[name]} film(s) watched</div>
                            <div style={{ display: "flex", gap: "var(--space-sm)", alignItems: "center", justifyContent: "center" }}>
                                <p style={{ fontWeight: "bold", margin: "0px" }}>{dirDist.rating[name]}</p>
                                <IoStar color="gold" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="card-header">
                <IconContext.Provider value={{ style: {fontSize: "30"} }}>
                    <MdOutlineTheaterComedy />
                </IconContext.Provider>
                <h2>Top 10 genres</h2>
            </div>
            {!genres.length ? (
                <p>No items.</p>
            ) : (
                <div className="top-genres">
                    {genres.map(({ name, rating }) => (<>
                        <div className="genre-line" key={name} style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <p style={{ fontWeight: "bold", margin: "0px", textAlign: "left" }}>{name}</p>
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