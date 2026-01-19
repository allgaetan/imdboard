import './Header.css'

export default function Header({ sidebarOpen, setSidebarOpen }) {
    return (
        <header className="app-header">
            <button
                className="menu-toggle"
                aria-label="Toggle menu"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                ☰
            </button>
            <h1>IMDB Dashboard</h1>
        </header>
    )
}