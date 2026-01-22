import './Header.css'

export default function Header({ tab, setTab, landing = true }) {
    const title = "Your IMDb Stats"

    const handleReset = (e) => {
        return
    }

    return (
        <header className="app-header">
            {landing && (
                <div className="header-center">
                    <h1>{title}</h1>
                </div>
            )}
            {!landing && (<> 
                <div className="header-left" onClick={handleReset}>
                    <h1>{title}</h1>
                </div>
                <nav className="header-tabs" role="tablist" aria-label="Main tabs">
                    <button
                        className={`tab ${tab === 'board' ? 'active' : ''}`}
                        onClick={() => setTab('board')}
                    >
                        Dashboard
                    </button>
                    <button
                        className={`tab ${tab === 'reports' ? 'active' : ''}`}
                        onClick={() => setTab('reports')}
                    >
                        Reports
                    </button>
                </nav>
            </>)}
        </header>
    )
}