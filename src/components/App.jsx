import { Navbar } from './Navbar';
import '../styles/App.css';
import { Outlet } from 'react-router-dom';
import  Header  from './Header';

export function App() {
  return (
    <div className='app-layout'>
      <Header />
      <main className='page-content'>
        <Outlet />
      </main>
      <Navbar />
    </div>
  );
}
