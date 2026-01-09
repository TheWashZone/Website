import HomePage from './pages/home-page.jsx'
import './App.css'
import './css/home-page.css'
import './css/hamburger-menu.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
}

export default App
