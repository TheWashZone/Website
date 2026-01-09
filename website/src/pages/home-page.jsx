import HamburgerMenu from '../components/hamburger-menu';
import logo from '../images/TheWashZoneLogo.jpg';
import { Navbar, Nav, Container } from 'react-bootstrap';

function HomePage() {
      return (
    <>
    <div className="hide-navbar">
      <Navbar bg="primary" className="fixed-top">
        <Container>
          <Navbar.Brand href="/" className="text-white">The Wash Zone</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
      </Navbar>
    </div>
    <div className="hamburger-hidden">
      <HamburgerMenu />
    </div>
    <div className ="home-flex">
      <div>
        <div className ="title">
          The Wash Zone
        </div>
        <div className ="subtitle">
          1907 E Isaacs Ave, Walla Walla, WA 99362
        </div>
      </div>
      <div>
         <img src={logo} alt="The Wash Zone Logo" />
      </div>
    </div>
    </>
  )
}

export default HomePage