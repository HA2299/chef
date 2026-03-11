import { NavLink, Outlet } from 'react-router-dom';
import { Paths } from '../routes/paths';
import '../styles/Header.css';
import logo from '../assets/logo.png'; 
import Footer from '../components/Footer';
const NavLinks = () => (
  <>
    <NavLink to={`/${Paths.home}`} className={({ isActive }) => (isActive ? 'active-link' : '')}>Home</NavLink>
    <NavLink to={`/${Paths.addRecipe}`} className={({ isActive }) => (isActive ? 'active-link' : '')}>Add Recipe</NavLink>
    <NavLink to={`/${Paths.recipeList}`} className={({ isActive }) => (isActive ? 'active-link' : '')}>Recipes</NavLink>
    <NavLink to={`/${Paths.login}`} className={({ isActive }) => (isActive ? 'active-link' : '')}>Login</NavLink>
    <NavLink to={`/${Paths.register}`} className={({ isActive }) => (isActive ? 'active-link' : '')}>Register</NavLink>
  </>
);

const Layout = () => {
  return (
    <div className='layout-container'>
      <header>
        <img src={logo} alt="Logo" className="logo" />
        <nav>
          <NavLinks />
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;
