import './Sidebar.css'

export default function Sidebar({ open, onClose, onSelect }) {
    return (
        <>
            <div className={`side-menu ${open ? 'open' : ''}`}>
    
                <button onClick={() => onSelect('board')}>Dashboard</button>
                <button onClick={() => onSelect('reports')}>Reports</button>

            </div>
            <div
                className={`side-overlay ${open ? 'visible' : ''}`}
                onClick={onClose}
            />
        </>
    )
}