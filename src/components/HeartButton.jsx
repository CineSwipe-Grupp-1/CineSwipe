import "../styles/HeartButton.css";
import { addToWatchlist } from "../lib/storage";
import { useState, useEffect } from "react";

export default function HeartButton({ movie, onSwipeRight }) {
    const [message, setMessage] = useState("");

    const handleClick = () => {
        if (!movie) return;

        // Add movie to watchlist
        addToWatchlist(movie);
        setMessage(`${movie.title} har lagts till i din watchlist!`);

        // Swipe right automatically after 1 second
        if (onSwipeRight) {
            setTimeout(() => {
                onSwipeRight();
            }, 1000);
        }
    };

    // Auto-hide the message after 3 seconds
    useEffect(() => {
        if (!message) return;
        const timer = setTimeout(() => setMessage(""), 3000);
        return () => clearTimeout(timer);
    }, [message]);

    return (
        <>
            <button
                className="heart-button"
                onClick={handleClick}
                aria-label="Lägg till i watchlist"
            >
                <span className="heart-icon">❤️</span>
            </button>

            {message && <div className="heart-message">{message}</div>}
        </>
    );
}
