import HomePage from './pages/home-page.jsx'
import AboutPage from './pages/about-us.jsx'
import FrequentlyAskedPage from './pages/frequently-asked.jsx'
import GiftCardPage from './pages/gift-card.jsx'
import ContactPage from './pages/contact-us.jsx'
import './App.css'
import './css/home-page.css'
import './css/hamburger-menu.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HamburgerMenu from './components/hamburger-menu';
import { Navbar, Nav, Container } from 'react-bootstrap';

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <Navbar bg="primary" className="fixed-top ">
            <Container>
              <Navbar.Brand as={Link} to="/" className="text-white">The Wash Zone</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Nav>
                <Nav.Link as={Link} to="/" className="text-white px-4 d-none d-lg-block">Home</Nav.Link>
                <Nav.Link as={Link} to="/about-us" className="text-white px-4 d-none d-lg-block">About</Nav.Link>
                <Nav.Link as={Link} to="/frequently-asked" className="text-white px-4 d-none d-lg-block">Frequently Asked Questions</Nav.Link>
                <Nav.Link as={Link} to="/contact-us" className="text-white px-4 d-none d-lg-block">Contact Us</Nav.Link>
                <Nav.Link as={Link} to="/gift-card" className="text-white px-4 d-none d-lg-block">Gift Cards</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </div>
        <div className="d-lg-none position-relative">
          <HamburgerMenu />
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/frequently-asked" element={<FrequentlyAskedPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/gift-card" element={<GiftCardPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
