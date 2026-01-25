import location from '../images/temp-washzone-picture.jpg';
import banner from '../images/ChatGPT-Soapy-Pavement.png';
// import logo from '../images/TheWashZoneLogo.jpg';
import { Stack } from 'react-bootstrap';
import '../css/home-page.css';

function HomePage() {
  return (
    <>
      <div className="container-fluid p-0 w-100 header-container">
        <img src={banner} className="header-img" alt="banner image" />
      </div>
      <div className="home-format">
        <div className="colored">
          <div className="title">
            The Wash Zone
          </div>
          <div className="subtitle">
            1907 E Isaacs Ave, Walla Walla, WA 99362
          </div>
        </div>
        <div className="colored2">
          <img src={location} alt="The Wash Zone Image" />
        </div>
        <div className="colored">
          <div className="membership-section-title">Memberships</div>
          <div className="membership-container">
            <div className="boxed membership-item" data-testid="box1">
              <div className="membership-title">Ultimate - $16.50</div>
              <ul>
                <li className="left-align">1</li>
                <li className="left-align">2</li>
                <li className="left-align">3</li>
                <li className="left-align">4</li>
                <li className="left-align">5</li>
              </ul>
            </div>
            <div className="boxed membership-item" data-testid="box2">
              <div className="membership-title">Deluxe - $13.50</div>
              <ul>
                <li className="left-align">1</li>
                <li className="left-align">2</li>
                <li className="left-align">3</li>
                <li className="left-align">4</li>
              </ul>
            </div>
            <div className="boxed membership-item" data-testid="box3">
              <div className="membership-title">Basic - $10.00</div>
              <ul>
                <li className="left-align">1</li>
                <li className="left-align">2</li>
              </ul>
              <p className="basic-disclaimer">No longer accepting new subscriptions for this wash type</p>
            </div>
            <div className="boxed membership-item" data-testid="box4">
              <div className="membership-title">Add Ons</div>
              <ul>
                <li className="left-align">Wax: $0.00</li>
                <li className="left-align">Wheel Brite: $0.00</li>
                <li className="left-align">Floor Mats: $0.00</li>
                <li className="left-align">Hand Wash: $0.00</li>
              </ul>
            </div>
            <div className="boxed membership-item" data-testid="box5">
              <div className="membership-title">Single Wash</div>
              <ul>
                <li className="left-align">TEMP: $0.00</li>
                <li className="left-align">TEMP: $0.00</li>
                <li className="left-align">TEMP: $0.00</li>
                <li className="left-align">TEMP: $0.00</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="colored2">
          <span className="hours-parent">Hours of Operation</span>
          <Stack gap={3} className="hours-stack">
            <div className="hours">Sunday: 9:00 AM - 5:00 PM</div>
            <div className="hours">Monday: 7:30 AM - 7:00 PM</div>
            <div className="hours">Tuesday: 7:30 AM - 7:00 PM</div>
            <div className="hours">Wednesday: 7:30 AM - 7:00 PM</div>
            <div className="hours">Thursday: 7:30 AM - 7:00 PM</div>
            <div className="hours">Friday: 7:30 AM - 7:00 PM</div>
            <div className="hours">Saturday: 8:00 AM - 7:00 PM</div>
          </Stack>
        </div>
      </div>
    </>
  )
}

export default HomePage