import "./Landing.css"
import DropZone from "./DropZone.jsx"
import { FaImdb } from "react-icons/fa";
import { FaSquareLetterboxd } from "react-icons/fa6";
import { IconContext } from "react-icons";
import { FaFileCsv } from "react-icons/fa";
import { FaFileZipper } from "react-icons/fa6";
import { BiSolidMoviePlay } from "react-icons/bi";
import { DiGithubBadge, DiGithubFull } from "react-icons/di";

export default function Upload({ onDataLoaded }) {
    return (
        <div className="landing">
            <span>
                <span className="app-name">
                    <IconContext.Provider value={{ style: { fontSize: "140px"} }}>
                        <BiSolidMoviePlay />
                    </IconContext.Provider>
                    <span>
                        <h1 style={{ fontSize: "60px", fontWeight: "bolder" }}>IMDashBoard</h1>
                        <h1 style={{ fontSize: "20px", fontWeight: "lighter" }}>The Interactive Movie DashBoard</h1>
                    </span>
                </span>
                <span className="desc" style={{ fontSize: "20px" }}>
                    <p>Your movie stats at all time, in an interactive and comprehensive dashboard</p>
                    <p style={{ color: "var(--muted-text)" }}>Coming soon: exclusive reports </p>
                </span>
                <div className="instructions">
                    <a className="imdb" href="https://www.imdb.com/" target="_blank">
                        <span style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "var(--space-sm)"}}>
                            <IconContext.Provider value={{ style: { fontSize: "40px", color: "gold"} }}>
                                <FaImdb />
                            </IconContext.Provider>
                            <h3>From IMDb</h3>
                        </span>
                        <p>1. Go to your ratings page</p>
                        <p>2. Click on the "Export" button in the top right</p>
                        <p>3. Go to the exports page</p>
                        <p>4. Wait for the export to be ready then click the download button</p>
                        <span style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "var(--space-sm)"}}>           
                            <IconContext.Provider value={{ style: { fontSize: "40px", color: ""} }}>
                                <FaFileCsv />
                            </IconContext.Provider>
                            <p style={{ fontWeight: "bold" }}>Your data will be in a .csv file</p>
                        </span>
                    </a>
                    <a className="letterboxd" href="https://letterboxd.com/" target="_blank">
                        <span style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "var(--space-sm)"}}>           
                            <IconContext.Provider value={{ style: { fontSize: "40px", color: "var(--success)"} }}>
                                <FaSquareLetterboxd />
                            </IconContext.Provider>
                            <h3>From Letterboxd</h3>
                        </span>
                        <p>1. Go to your account settings</p>
                        <p>2. Go to the data section</p>
                        <p>3. Click on the "Export you data" button</p>
                        <span style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "var(--space-sm)"}}>           
                            <IconContext.Provider value={{ style: { fontSize: "40px", color: ""} }}>
                                <FaFileZipper />
                            </IconContext.Provider>
                            <p style={{ fontWeight: "bold" }}>Your data will be compressed in a .zip file</p>
                        </span>
                    </a>
                </div>
                <DropZone onDataLoaded={onDataLoaded} />
                <div className="github">
                    <a href="https://github.com/allgaetan/imdboard" target="_blank">
                        <IconContext.Provider value={{ style: { fontSize: "45"} }}>
                            <DiGithubFull />
                            <DiGithubBadge />
                        </IconContext.Provider>
                    </a>
                </div>
            </span>
        </div>
    )
}