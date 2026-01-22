import { useRef } from "react"

export default function DropZone ({ onDataLoaded }) {
    const inputRef = useRef(null)

    const handleFile = (file) => {
        if (!file) return
        const reader = new FileReader()
        reader.onload = (e) => {
            const content = e.target.result
            onDataLoaded(content)
        }
        reader.readAsText(file)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        handleFile(file)
    }

    const handleDragOver = (e) => {
        e.preventDefault()
    }
    
    return (
        <div
            className="drop-zone"
            onClick={() => inputRef.current.click()}
            onDrop={handleDrop}
            onDrag={handleDragOver}
        >
            <p>Drag and drop your IMDB ratings file</p>
            <p>or click to upload (.csv only)</p>
            <input 
                ref={inputRef}
                type="file"
                accept=".csv"
                hidden
                onChange={(e) => handleFile(e.target.files[0])} 
            />
        </div>  
    )
}