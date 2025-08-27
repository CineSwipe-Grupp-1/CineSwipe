// @vitest-environment jsdom
//Sätter testmiljön till jsdom (en fejkad DOM i Node). Behövs för att rendera React-komponenter i test.
//Aktiverar matchers som toBeInTheDocument() så asserterna blir läsbara.
//Importerar testverktygen. userEvent låter oss klicka som en användare gör.
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// 1) Mocka nätverkslagret – minimal nivå: kastar fel
//Byter ut hela modulen ../api/tmdb i testsammanhang. getTrending blir en spion/fake som du kan styra: “kasta fel”, “returnera data”, osv. Inga riktiga HTTP-anrop.
vi.mock('../api/tmdb', () => ({
  getTrending: vi.fn(),
}));

// 2) Mocka adapter så att posterUrl alltid finns (slipper riktig TMDB-data)
vi.mock('../lib/tmdbAdapter', () => ({
  mapMovie: m => ({ id: m.id, title: m.title ?? 'Film', posterUrl: '/x.jpg' }),
}));

// 3) Mocka tunga barn (gör dem ofarliga)/utan att bära tunga UI-detaljer
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

// 4) Mocka swipe-hook till ett ofarligt, deterministiskt värde
vi.mock('../lib/useSwipeNav', () => ({
  useSwipeNav: movies => ({
    current: movies[0] ?? null,
    index: 0,
  }),
}));

import { getTrending } from '../api/tmdb';
import { HomePage } from './HomePage';

const user = userEvent.setup();

beforeEach(() => {
  vi.clearAllMocks();
  // sessionStorage används i koden – stubba enkelt
  vi.spyOn(window.sessionStorage.__proto__, 'getItem').mockReturnValue(null);
  vi.spyOn(window.sessionStorage.__proto__, 'setItem').mockImplementation(
    () => {}
  );
});

describe('HomePage – errorhantering', () => {
  it('visar error-kort när första fetchen failar', async () => {
    // Första anropet -> kastar fel
    getTrending.mockRejectedValueOnce(new Error('boom'));

    render(<HomePage />);

    // Först: loading
    expect(screen.getByText(/laddar trending/i)).toBeInTheDocument();

    // Sen: error-UI
    expect(
      await screen.findByText(/kunde inte hämta trending/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /försök igen/i })
    ).toBeInTheDocument();
  });

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

    // Bekräfta att getTrending kallades två gånger (fail + retry)
    expect(getTrending).toHaveBeenCalledTimes(2);
  });
});
