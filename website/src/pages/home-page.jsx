import location from '../images/temp-washzone-picture.jpg';
import banner from '../images/ChatGPT-Soapy-Pavement.png';
// import logo from '../images/TheWashZoneLogo.jpg';
import { Stack } from 'react-bootstrap';
import '../css/home-page.css';

function HomePage() {
  return (
    <>
      <div className="container-fluid">
        <img src={banner} className="header-img" alt="banner image" />
      </div>
      <div className="">
        <div className="orange-background">
          <div className="title-text">
            The Wash Zone
          </div>
          <div className="address-text">
            1907 E Isaacs Ave, Walla Walla, WA 99362
          </div>
        </div>
        <div>
          <img src={location} alt="The Wash Zone Image" className="carwash-img"/>
        </div>
        <div className="orange-background-memberships">
          <div className="membership-title">Memberships</div>
          <div className="membership-flex">
            <div className="membership-item" data-testid="box1">
              <div className="membership-item-title">Ultimate - $16.50</div>
              <ul>
                <li className="" data-testid="ultimate1">1</li>
                <li className="" data-testid="ultimate2">2</li>
                <li className="" data-testid="ultimate3">3</li>
                <li className="" data-testid="ultimate4">4</li>
                <li className="" data-testid="ultimate5">5</li>
              </ul>
            </div>
            <div className="membership-item" data-testid="box2">
              <div className="membership-item-title">Deluxe - $13.50</div>
              <ul>
                <li className="" data-testid="deluxe1">1</li>
                <li className="" data-testid="deluxe2">2</li>
                <li className="" data-testid="deluxe3">3</li>
                <li className="" data-testid="deluxe4">4</li>
              </ul>
            </div>
            <div className="membership-item" data-testid="box3">
              <div className="membership-item-title">Basic - $10.00</div>
              <ul>
                <li className="" data-testid="basic1">1</li>
                <li className="" data-testid="basic2">2</li>
              </ul>
              <p className="">No longer accepting new subscriptions for this wash type</p>
            </div>
            <div className="membership-item" data-testid="box4">
              <div className="membership-item-title">Add Ons</div>
              <ul>
                <li className="" data-testid="addOn1">Wax: $0.00</li>
                <li className="" data-testid="addOn2">Wheel Brite: $0.00</li>
                <li className="" data-testid="addOn3">Floor Mats: $0.00</li>
                <li className="" data-testid="addOn4">Hand Wash: $0.00</li>
              </ul>
            </div>
            <div className="membership-item" data-testid="box5">
              <div className="membership-item-title">Single Wash</div>
              <ul>
                <li className="" data-testid="singleWash1">TEMP: $0.00</li>
                <li className="" data-testid="singleWash2">TEMP: $0.00</li>
                <li className="" data-testid="singleWash3">TEMP: $0.00</li>
                <li className="" data-testid="singleWash4">TEMP: $0.00</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="hours-section">
          <span className="hours-title">Hours of Operation</span>
          <Stack gap={3} className="hours-item" data-testid="hours-box">
            <div className="">Sunday: 9:00 AM - 5:00 PM</div>
            <div className="">Monday: 7:30 AM - 7:00 PM</div>
            <div className="">Tuesday: 7:30 AM - 7:00 PM</div>
            <div className="">Wednesday: 7:30 AM - 7:00 PM</div>
            <div className="">Thursday: 7:30 AM - 7:00 PM</div>
            <div className="">Friday: 7:30 AM - 7:00 PM</div>
            <div className="">Saturday: 8:00 AM - 7:00 PM</div>
          </Stack>
          <div className="hours-disclaimer">
            These hours change seasonally based on daylight hours. 
            Please check our <a href="https://www.facebook.com/profile.php?id=100054247250715">Facebook</a> to find the official hours.
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage