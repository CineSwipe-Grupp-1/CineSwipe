/* @vitest-environment jsdom
Filen testar HomePage:s errorhantering på två sätt:
1 - om första fetch misslyckas då ska användaren se error-kort. 
2. Om man klickar på försök igen- då ska komponenten försöka igen och visa innehåll när det lyckas.
Allt "tunt" (API, swipe, modal UI-komponenter) mockas bort för att fokusea på just denna logik
Kommando olika varianter:
1. npx vitest (startas i watch-mode, dvs. fortsätter köra i bakgrunden när vi ändrar i kod/filer)
2. npx vitest --ui (med lite mer översikt i webbläsaren)
3. npx vitest run (kör alla tester en gång (utan watchmode))
4. npx vitest run src/pages/HomePage.error.test.jsx (kör en specifik fil)
*/

//Sätter testmiljön till jsdom (en fejkad DOM i Node). Behövs för att rendera React-komponenter i test.
//Aktiverar matchers som toBeInTheDocument() så asserterna blir läsbara.
//Importerar testverktygen. userEvent låter oss klicka som en användare gör.
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// 1) Mocka nätverkslagret
//Byter ut hela modulen ../api/tmdb i testsammanhang. getTrending blir en spion/fake som du kan styra: “kasta fel”, “returnera data”, osv. Inga riktiga HTTP-anrop.
vi.mock('../api/tmdb', () => ({
  getTrending: vi.fn(),
}));

// 2) Mocka adapter så att posterUrl alltid finns (slipper riktig TMDB-data)
vi.mock('../lib/tmdbAdapter', () => ({
  mapMovie: m => ({ id: m.id, title: m.title ?? 'Film', posterUrl: '/x.jpg' }),
}));

// 3) Mocka tunga barn (UI-komponenter) (gör dem "ofarliga")/utan att bära tunga UI-detaljer genom att ersätta med enkla divar, knappar
vi.mock('../components/StackedDeck', () => ({
  StackedDeck: () => <div data-testid='stacked' />,
}));
vi.mock('../components/MovieCard', () => ({
  MovieCard: () => <div data-testid='movie-card' />,
}));
vi.mock('../components/MovieModal', () => ({
  default: () => null,
}));
vi.mock('../components/Toaster', () => ({
  NotifyAdded: () => {},
}));
vi.mock('../components/HeartButton', () => ({
  HeartButton: props => <button {...props}>❤</button>,
}));
vi.mock('../components/XButton', () => ({
  XButton: props => <button {...props}>X</button>,
}));

// 4) Mocka swipe-hook till ett ofarligt, deterministiskt värde. Alltid första film som current, gör testet mer stabilt.
vi.mock('../lib/useSwipeNav', () => ({
  useSwipeNav: movies => ({
    current: movies[0] ?? null,
    index: 0,
  }),
}));

// 5) Importera själva komponenten
import { getTrending } from '../api/tmdb';
import { HomePage } from './HomePage';

// 6) Setup: Gör så att vi kan simulera klick/tangentuttryck som en riktig användare.
const user = userEvent.setup();

beforeEach(() => {
  vi.clearAllMocks();
  // sessionStorage används i koden – stubba enkelt
  vi.spyOn(window.sessionStorage.__proto__, 'getItem').mockReturnValue(null);
  vi.spyOn(window.sessionStorage.__proto__, 'setItem').mockImplementation(
    () => {}
  );
});

// 7) Tests: Själva testsviten
describe('HomePage – errorhantering', () => {
  //Test nummer 1: visar error-kort när första fetchen misslyckas
  it('visar error-kort när första fetchen failar', async () => {
    // Första anropet -> kastar fel
    getTrending.mockRejectedValueOnce(new Error('boom'));

    render(<HomePage />);

    // Först: loading
    expect(screen.getByText(/laddar trending/i)).toBeInTheDocument();

    const errorNode = await screen.findByText(/kunde inte hämta trending/i);

    //ser error-kort i terminalen
    screen.debug();

    // Sen: error-UI
    expect(errorNode).toBeInTheDocument();
    expect(
      await screen.findByText(/kunde inte hämta trending/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /försök igen/i })
    ).toBeInTheDocument();
  });

  //Test nummer 2: ”Försök igen” triggar ny fetch. Andra anropet lyckasmed fejkdata.
  it('”Försök igen” triggar ny fetch och går vidare när det lyckas', async () => {
    // 1:a anropet -> fel, 2:a anropet -> ok data
    getTrending.mockRejectedValueOnce(new Error('boom')).mockResolvedValueOnce({
      results: Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        title: `A${i + 1}`,
      })),
    });

    render(<HomePage />);

    // Vänta in error
    const retryBtn = await screen.findByRole('button', {
      name: /försök igen/i,
    });
    // Klicka ”Försök igen”
    await user.click(retryBtn);

    // Efter retry: komponenten ska lämna error-läget
    await waitFor(() => {
      // Den enkla StackedDeck-stubben ska nu synas som signal på "ready"-läge
      expect(screen.getByTestId('stacked')).toBeInTheDocument();
    });

    // Bekräfta att getTrending kallades två gånger (en gång vid fail + en gång vid retry)
    expect(getTrending).toHaveBeenCalledTimes(2);
  });
});
