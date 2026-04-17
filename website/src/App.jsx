import HomePage from './pages/home-page.jsx'
import AboutPage from './pages/about-us.jsx'
import FrequentlyAskedPage from './pages/frequently-asked.jsx'
import GiftCardPage from './pages/gift-cards.jsx'
import LoyaltyPage from './pages/loyalty-page.jsx'
import MonthlySubscriptionPage from './pages/monthly-subscription.jsx'
import ContactPage from './pages/contact-us.jsx'
import './App.css'
import './css/home-page.css'
import './css/hamburger-menu.css'
import './css/monthly-subscription.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HamburgerMenu from './components/hamburger-menu';
import { Navbar, Nav, Container } from 'react-bootstrap';

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <Navbar className="fixed-top">
            <Container fluid>
              <Navbar.Brand as={Link} to="/" className="text-black navbar-brand fw-bold">The Wash Zone</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Nav>
                 <Nav.Link as={Link} to="/" className="text-black px-4 d-none d-lg-block fw-bold">Home</Nav.Link>
                 <Nav.Link as={Link} to="/about-us" className="text-black px-4 d-none d-lg-block fw-bold">About</Nav.Link>
                 <Nav.Link as={Link} to="/frequently-asked" className="text-black px-4 d-none d-lg-block fw-bold">FAQ</Nav.Link>
                 <Nav.Link as={Link} to="/contact-us" className="text-black px-4 d-none d-lg-block fw-bold">Contact Us</Nav.Link>
                 <Nav.Link as={Link} to="/gift-card" className="text-black px-4 d-none d-lg-block fw-bold">Gift Cards</Nav.Link>
                 <Nav.Link as={Link} to="/loyalty-page" className="text-black px-4 d-none d-lg-block fw-bold">Loyalty</Nav.Link>
                 <Nav.Link as={Link} to="/monthly-subscription" className="text-black px-4 d-none d-lg-block fw-bold">Monthly Subscription</Nav.Link>
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
          <Route path="/loyalty-page" element={<LoyaltyPage />} />
          <Route path="/monthly-subscription" element={<MonthlySubscriptionPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
