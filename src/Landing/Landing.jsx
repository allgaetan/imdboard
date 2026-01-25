import "./Landing.css"
import DropZone from "./DropZone.jsx"

export default function Landing({ onDataLoaded }) {
    return (
        <div className="landing">
            <div>
                <h1>Upload your IMDb ratings</h1>
                <DropZone onDataLoaded={onDataLoaded} />
            </div>
        </div>
    )
}