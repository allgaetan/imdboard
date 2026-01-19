export default function Landing({ onDataLoaded }) {
    const handleFileUpload = (event) => {
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
            const content = e.target.result
            onDataLoaded(content)
        }
        reader.readAsText(file)
    }

    return (
        <div className="landing">
            <h1>Welcome to IMDB Dashboard</h1>
            <div>
                <p>Upload a CSV file of your IMDB ratings:</p>
                <input type="file" accept=".csv" onChange={handleFileUpload} />
            </div>  
        </div>
    )
}