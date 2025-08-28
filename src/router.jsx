import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { App } from './components/App';
import { WatchlistPage } from './pages/WatchlistPage';
import { HomePage } from './pages/HomePage';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<HomePage />} />
      <Route path='watchlist' element={<WatchlistPage />} />

      <Route
        path='*'
        element={
          <section>
            <h1>404</h1>
          </section>
        }
      />
    </Route>
  )
);
