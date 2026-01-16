import location from '../images/temp-washzone-picture.jpg';
import banner from '../images/ChatGPT-Soapy-pavement.png';
import logo from '../images/TheWashZoneLogo.jpg';


import '../css/home-page.css';
// THIS PICTURE SHOULD BE REPLACED WHEN WE HAVE ANOTHER ONE


function HomePage() {
      return (
    <>
    <div className="container-fluid p-0 w-100 header-container">
      <img src={banner} className="header-img" alt="Responsive image" />
    </div>
    <div className ="home-flex">
      <div className = "boxed">
        <div className ="title">
          The Wash Zone
        </div>
        <div className ="subtitle">
          1907 E Isaacs Ave, Walla Walla, WA 99362
        </div>
      </div>
      <div>
         <img src={location} alt="The Wash Zone Image" />
      </div>
      <div className="boxed">
        <span className="subtitle">Memberships</span>
        <p>memberships</p>
      </div>
      <div className="boxed">
        <span className="subtitle">Hours of Operation</span>
          <p>hours</p>
      </div>
    </div>
    </>
  )
}

export default HomePage