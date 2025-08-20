import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { App } from "./components/App";
import { WatchlistPage } from "./pages/WatchlistPage";
import { HomePage } from "./pages/HomePage";
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />} />

      <Route
        element={
          <section>
            <h1>404</h1>
          </section>
        }
        path="*"
      />
      <Route path="/HomePage" element={<HomePage />} />
      <Route path="/WatchlistPage" element={<WatchlistPage />} />
    </Route>
  )
);
