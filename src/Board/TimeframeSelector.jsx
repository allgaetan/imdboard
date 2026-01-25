import { useState } from "react";

const options = [
    { value: "last-7-days", label: "Last 7 days" },
    { value: "last-30-days", label: "Last 30 days" },
    { value: "last-90-days", label: "Last 90 days" },
    { value: "last-180-days", label: "Last 180 days" },
    { value: "last-365-days", label: "Last 365 days" },
    { value: "all", label: "All time" },
]

export default function TimeframeSelector({ timeframe, onChange }) {
    const [open, setOpen] = useState(false)
    const selected = options.find(o => o.value === timeframe);

    return (
        <div className="dropdown">
            <button
                className="dropdown-trigger card"
                onClick={() => setOpen(!open)}
            >
                {selected.label}
                {open ? (
                    <span className="arrow">▲</span>
                ) : (
                    <span className="arrow">▼</span>
                )}
                
            </button>
            {open && (
                <ul className="dropdown-menu">
                    {options.map((opt) => (
                        <li
                        key={opt.value}
                        onClick={() => {
                            setOpen(false);
                            onChange(opt.value);
                        }}
                        >
                        {opt.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}