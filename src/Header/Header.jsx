import './Header.css'
import { DiGithubBadge, DiGithubFull } from "react-icons/di";
import { FiUpload } from "react-icons/fi";
import { IconContext } from 'react-icons';

export default function Header({ tab, setTab, landing = true, setData }) {
    return (
        <header className="app-header">
            {!landing && (<> 
                <div className="header-left" onClick={(e) => {setData(null); setTab('board')}}>
                    <IconContext.Provider value={{ style: { fontSize: "20"} }}>
                        <FiUpload />
                    </IconContext.Provider>
                    <h1>Upload another CSV file</h1>
                </div>
                <nav className="header-center" role="tablist" aria-label="Main tabs">
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
                <a className="header-right" href="https://github.com/allgaetan/imdboard" target="_blank">
                    <IconContext.Provider value={{ style: { fontSize: "45"} }}>
                        <DiGithubFull />
                        <DiGithubBadge />
                    </IconContext.Provider>
                </a>
            </>)}
        </header>
    )
}