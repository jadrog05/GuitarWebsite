import { Outlet, NavLink } from 'react-router-dom';
import './Layout.css'; 

const Layout = () => {
  return (
    <div>
      <header className="header">
        <h1>String Theory</h1>
        <nav className="nav">
          <NavLink to="/songs" className={({ isActive}) => (isActive ? 'active' : '')}>
            Songs
          </NavLink>  
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
          <NavLink to="/theory" className={({ isActive }) => (isActive ? 'active' : '')}>
            Theory
          </NavLink>
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <p>© 2024 Super duper cool app</p>
      </footer>
    </div>
  );
};

export default Layout;