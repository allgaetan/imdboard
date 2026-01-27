import { SiThemoviedatabase } from "react-icons/si";
import { IconContext } from "react-icons";

export default function Loading({ source, progress }) {
    return (
        <div className="loading">
            <div>
                <h2>Parsing and enriching your data...</h2>
                <div
                    className="drop-zone"
                >
                    <IconContext.Provider value={{ className: "upload-icon", style: { fontSize: "50px" } }}>
                        <SiThemoviedatabase />
                    </IconContext.Provider>
                    {(source === "imdb") ? (
                        <p>Data imported from IMDb.</p>
                    ) : (
                        <p>Data imported from Letterboxd.</p>
                    )}
                    <p>Fetching metadata from TMDB...</p>
                    <p>(This could take some time)</p>
                    <p>Progress: {(progress * 100).toFixed(0)} %</p>
                    <progress value={progress} />
                </div>  
            </div>
        </div>
    )
}