import { Navbar } from './Navbar';
import '../styles/App.css';

export const mockData = [
  {
    adult: false,
    backdrop_path: '/7Zx3wDG5bBtcfk8lcnCWDOLM4Y4.jpg',
    genre_ids: [10751, 878, 35, 12],
    id: 552524,
    original_language: 'en',
    original_title: 'Lilo & Stitch',
    overview:
      'Lilo & Stitch är live-action versionen av Disneys animerade film från 2002 och är den roliga och rörande berättelsen om Lilo, en hawaiiansk föräldralös flicka och den förrymda utomjordingen Stitch. Tillsammans bildar de en ny stark familj.',
    popularity: 158.1718,
    poster_path: '/zzzMfit6EfawKbGoKFi2jfXGtLw.jpg',
    release_date: '2025-05-17',
    title: 'Lilo & Stitch',
    video: false,
    vote_average: 7.323,
    vote_count: 1360,
  },
  {
    adult: false,
    backdrop_path: '/9whEVuKte4Qi0LI4TzPf7glinJW.jpg',
    genre_ids: [16, 10751, 14],
    id: 936108,
    original_language: 'en',
    original_title: 'Smurfs',
    overview:
      'När Gammelsmurfen mystiskt blir kidnappad av de onda trollkarlarna Razamel och Gargamel, leder Smurfan smurfarna på ett uppdrag till den verkliga världen för att rädda honom. Med hjälp av nya vänner måste smurfarna upptäcka vad som definierar deras öde att rädda universum.',
    popularity: 210.0301,
    poster_path: '/koubZdJjsecr0v5z5A27tSMHjvM.jpg',
    release_date: '2025-07-05',
    title: 'Smurfar',
    video: false,
    vote_average: 6.2,
    vote_count: 113,
  },
  {
    adult: false,
    backdrop_path: '/zNriRTr0kWwyaXPzdg1EIxf0BWk.jpg',
    genre_ids: [878, 12, 28],
    id: 1234821,
    original_language: 'en',
    original_title: 'Jurassic World Rebirth',
    overview:
      'Fem år efter händelserna i Jurassic World Dominion får Zora Bennett, expert på hemliga operationer, i uppdrag att leda ett skickligt team på ett topphemligt uppdrag för att säkra genetiskt material från världens tre mest massiva dinosaurier. När Zoras uppdrag korsas med en civil familj vars båtexpedition har kapsejsat, blir de alla strandsatta på en ö där de ställs ansikte mot ansikte med en olycksbådande, chockerande upptäckt som har varit dold för världen i årtionden.',
    popularity: 509.6217,
    poster_path: '/tilSr67rE4GEgJafvVcUehMJ3tS.jpg',
    release_date: '2025-07-01',
    title: 'Jurassic World Rebirth',
    video: false,
    vote_average: 6.38,
    vote_count: 1676,
  },
  {
    adult: false,
    backdrop_path: '/eU7IfdWq8KQy0oNd4kKXS0QUR08.jpg',
    genre_ids: [878, 12, 28],
    id: 1061474,
    original_language: 'en',
    original_title: 'Superman',
    overview:
      'Superman måste förena sitt utomjordiska kryptoniska arv med sin mänskliga uppväxt som reportern Clark Kent. Som förkroppsligandet av sanning, rättvisa och det mänskliga sättet befinner han sig snart i en värld som ser dessa som gammalmodiga.',
    popularity: 1010.8682,
    poster_path: '/gylKre9JT0Bqcsws7AbyXOZwBjP.jpg',
    release_date: '2025-07-09',
    title: 'Superman',
    video: false,
    vote_average: 7.594,
    vote_count: 2303,
  },
];

export { mockData }; // <-- Export the mockData so WatchlistPage can use it

export function App() {
  return <Navbar />;
}
