import "../styles/HeartButton.css";
import { useState, useEffect } from "react";

export default function HeartButton({ movie, onSwipeRight }) {
    const [message, setMessage] = useState("");

    const handleClick = () => {
        if (!movie) return;

        setMessage(`${movie.title} har lagts till i din watchlist!`);

        if (onSwipeRight) {
            setTimeout(() => {
                onSwipeRight(); // triggers HomePage swipeRight
            }, 1000);
        }
    };

    useEffect(() => {
        if (!message) return;
        const timer = setTimeout(() => setMessage(""), 3000);
        return () => clearTimeout(timer);
    }, [message]);

    return (
        <>
            <button className="heart-button" onClick={handleClick} aria-label="Lägg till i watchlist">
                <span className="heart-icon">❤️</span>
            </button>
            {message && <div className="heart-message">{message}</div>}
        </>
    );
}
