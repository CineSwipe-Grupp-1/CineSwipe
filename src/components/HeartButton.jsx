import "./../styles/HeartButton.css";

export function HeartButton({ onClick }) {
    return (
        <button className="heart-button" onClick={onClick} aria-label="Add to Watchlist">
            ❤️
        </button>
    );
}
