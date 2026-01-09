import HamburgerMenu from '../components/hamburger-menu';
import logo from '../images/TheWashZoneLogo.jpg';

function HomePage() {
      return (
    <>
    <HamburgerMenu />
      <div className ="title">
        The Wash Zone
      </div>
      <div className ="subtitle">
        1907 E Isaacs Ave, Walla Walla, WA 99362
      </div>
      <img src={logo} alt="The Wash Zone Logo" />
    </>
  )
}

export default HomePage