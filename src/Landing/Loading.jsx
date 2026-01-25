import "./Landing.css"
import { SiThemoviedatabase } from "react-icons/si";
import { IconContext } from "react-icons";

export default function Loading({ onDataLoaded }) {
    return (
        <div className="loading">
            <div>
                <h1>Upload your IMDb ratings</h1>
                <div
                    className="drop-zone"
                >
                    <IconContext.Provider value={{ className: "upload-icon", style: { fontSize: "50px" } }}>
                        <SiThemoviedatabase />
                    </IconContext.Provider>
                    <p>Fetching metadata from TMDB...</p>
                    <p>(This could take a few seconds)</p>
                </div>  
            </div>
        </div>
    )
}