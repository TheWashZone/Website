import HamburgerMenu from '../components/hamburger-menu';
import logo from '../images/TheWashZoneLogo.jpg';

function HomePage() {
      return (
    <>
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