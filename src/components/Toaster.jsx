import { toast } from 'sonner';

export function NotifyAdded(movie) {
  toast.custom(
    () => (
      <div className='cine-toast'>
        <img src={movie.posterUrl} alt='' />
        <div>
          <div className='title'>Lagt till i Watchlist</div>
          <div className='subtitle'>{movie.title}</div>
        </div>
      </div>
    ),
    { duration: 1000 }
  );
}
