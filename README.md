# CineSwipe

**Responsiv film/serie-app med TMDB-integration**
FRK24M_AFU – Grupp 1
Kurs: Avancerad frontendutveckling (VT/HT 2025)
Lärare: Rachel Richter

---

## Innehåll

- [Översikt]
- [Funktioner]
- [Teknikstack & arkitektur]()
- [API-integration]
- [Kom igång]()
- [Testning]
- [Tillgänglighet & responsivitet]()

---

## Översikt

CineSwipe är en mobil- och läsplatteanpassad webbapp byggd i React där användaren kan swipa igenom trendande titlar från The Movie Database (TMDB). Svep höger eller tryck ❤️ för att lägga till en film i Min Filmlista, svep vänster eller tryck "X" för att hoppa över. Detaljer visas i en modal. Filmlistan sparas lokalt i webbläsaren.

## Funktioner

- **Upptäck**: Hämtar trendande filmer/serier från TMDB.
- **Svepinteraktion**: Vänster = ignorera, höger = lägg till i watchlist.
- **Watchlist**: Lokal lagring (LocalStorage). Se, ta bort, eller rensa listan.
- **Detaljvy (Modal)**: Poster, beskrivning, betyg, år, releasedatum.
- **Feedback**: Toast-notis (Sonner) när något läggs till.
- **Felsäkerhet**: Tydlig error-UI vid misslyckade API-anrop och knapp för “Försök igen”.

---

## Teknikstack & arkitektur

- **React 19**, **React Router 7**, **Vite 7**
- **Sonner** för toast-notiser
- **Cypress** (E2E), **Vitest + Testing Library** (enhet/komponent)
- **CSS**: Egna stilar (responsivt fokus)
- **State**: Komponentstate + **LocalStorage** (watchlist) och **SessionStorage** (swipade kort i aktuell session)

**Nyckelkomponenter**

- `StackedDeck` + `SwipeLayer` – lager av kort + pekgester
- `HomePage` – hämtar data, visar kort, hanterar svep/like/dismiss
- `WatchlistPage` – listar sparade titlar, ta bort/clear, öppna modal
- `MovieModal`, `MovieCard`, `HeartButton`, `XButton`
- `StateGate` – kapslar “loading/error/ready”-logik

**Routing**

- `/` och `/HomePage` → startsida (svep)
- `/WatchlistPage` → watchlist

---

## API-integration (TMDB)

- Endpoint: `GET /trending/{media_type}/{time_window}`

  - Vi använder `media_type=all` och `time_window=week`

- Språkparametrar: Begäran skickas med `language=sv-SE`
- Miljövariabel: `VITE_API_KEY` (kräver TMDB-konto & API-nyckel)

**Klient**

- `src/api/client.js` bygger URL\:er och anropar `fetch`.
- `src/api/tmdb.js` tillhandahåller `getTrending()` med enkel “force error”-mekanism för test (lägga till `?forceError` i URL):

```js
// I dev: http://localhost:5173/?forceError
if (
  import.meta.env.DEV &&
  new URLSearchParams(window.location.search).has("forceError")
) {
  throw new Error("Testfel: forced");
}
```

**Datamodell/adapter**

- `src/lib/tmdbAdapter.js` normaliserar TMDB-respons till appens filmobjekt och bygger poster-URLer via `https://image.tmdb.org/t/p/`.

---

## Kom igång

**Krav**: Node 18+ (LTS rekommenderas), npm 9+.

````bash
# 1) Installera beroenden
npm install

# 2) Skapa miljöfil
cp .env.example .env.local
# Redigera .env.local och ange din nyckel
VITE_API_KEY=din_tmdb_api_nyckel

# 3) Starta dev-server
npm run dev
# Öppna http://localhost:5173

## Testning

**Enhet/komponent (Vitest + Testing Library)**

```bash
# Kör alla tester i watch-läge
npx vitest

# UI-läge
npx vitest --ui

# Kör enskild fil
npx vitest run src/pages/HomePage.error.test.jsx
````

Exempeltest: `HomePage.error.test.jsx` verifierar att fel vid första hämtningen visar ett **error-kort** och att “**Försök igen**” triggar ny lyckad hämtning och renderar innehåll.

**E2E (Cypress)**

```bash
# Öppna Cypress GUI
npx cypress open

# Eller kör headless
npx cypress run
```

`cypress.config.js` använder `baseUrl: http://localhost:5173`.

---

## Tillgänglighet & responsivitet

- Pekgester via `Pointer Events`.
- ARIA: Knappar har tydliga `aria-label` (t.ex. “Lägg till i watchlist”).
- Semantiska roller i `StateGate` (t.ex. `role="status"`, `role="alert"`).

---
