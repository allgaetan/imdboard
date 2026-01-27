import { useRef } from "react"
import { MdOutlineFileUpload } from "react-icons/md";
import { IconContext } from "react-icons";

export default function DropZone ({ onDataLoaded }) {
    const inputRef = useRef(null)
    const accepted = [".csv", ".zip"]

    const handleFile = (file) => {
        onDataLoaded(file)   
    }
    const handleDrop = (e) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        handleFile(file)
    }
    const handleDragOver = (e) => {
        e.preventDefault()
    }
    
    return (<>
        <div
            className="drop-zone"
            onClick={() => inputRef.current.click()}
            onDrop={handleDrop}
            onDrag={handleDragOver}
        >
            <span className="upload-icon" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "var(--space-sm)"}}>
                <IconContext.Provider value={{ style: { fontSize: "50px" } }}>
                    <MdOutlineFileUpload />
                </IconContext.Provider>
                <h2>Upload your data</h2>
            </span>
            <p>Drag and drop or click to upload one of these:</p>
            <p>- IMDB ratings file (.csv file)</p>
            <p>- Letterboxd data export (.zip file)</p>
            <input 
                ref={inputRef}
                type="file"
                accept={accepted}
                hidden
                onChange={(e) => handleFile(e.target.files[0])} 
            />
        </div>  
    </>)
}