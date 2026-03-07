import location from '../images/temp-washzone-picture.jpg';
// import banner from '../images/ChatGPT-Soapy-Pavement.png';
// import logo from '../images/TheWashZoneLogo.jpg';
import { Stack } from 'react-bootstrap';
import '../css/home-page.css';

function HomePage() {
  return (
    <>
      <div className="">
        <div className="image-container">
          <img src={location} alt="The Wash Zone Image" className="carwash-img"/>
          <div className="top-left-title">The Wash Zone</div>
          <div className="top-left-address">Walla Walla Washington</div>
        </div>
        <div className="orange-background-memberships">
          <div className="section-title">SINGLE WASHES</div>
          <div className="membership-flex">
            <div className="item" data-testid="box1">
              <div className="item-title">Ultimate - $16.50</div>
              <ul>
                <li className="" data-testid="ultimate1">WHEEL BRITE</li>
                <li className="" data-testid="ultimate2">WASH AND SHINE</li>
                <li className="" data-testid="ultimate3">TRIPLE FOAM</li>
                <li className="" data-testid="ultimate4">CLEAR COAT SEALANT</li>
                <li className="" data-testid="ultimate5">HAND DRY</li>
              </ul>
            </div>
            <div className="item" data-testid="box2">
              <div className="item-title">Deluxe - $13.50</div>
              <ul>
                <li className="" data-testid="deluxe1">WASH AND SHINE</li>
                <li className="" data-testid="deluxe2">FOAMING POLISH</li>
                <li className="" data-testid="deluxe3">CLEAR COAT SEALANT</li>
                <li className="" data-testid="deluxe4">HAND DRY</li>
              </ul>
            </div>
            <div className="item" data-testid="box4">
              <div className="item-title">Add Ons</div>
              <ul>
                <li className="" data-testid="addOn1">WAX: $2.35</li>
                <li className="" data-testid="addOn2">WHEEL BRITE: $3.25</li>
                <li className="" data-testid="addOn3">FLOOR MATS: $2.50</li>
                <li className="" data-testid="addOn4">HAND WASH: $2.00 per foot</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="monthly-memberships">
          <div className="section-title">MONTHLY PLANS</div>
          <div className="membership-flex">
            <div className="item" data-testid="box1">
              <div className="item-title">Ultimate - $77.50</div>
              <ul>
                <li className="" data-testid="ultimate1">WHEEL BRITE</li>
                <li className="" data-testid="ultimate2">WASH AND SHINE</li>
                <li className="" data-testid="ultimate3">TRIPLE FOAM</li>
                <li className="" data-testid="ultimate4">CLEAR COAT SEALANT</li>
                <li className="" data-testid="ultimate5">HAND DRY</li>
              </ul>
            </div>
            <div className="item" data-testid="box2">
              <div className="item-title">Deluxe - $62.50</div>
              <ul>
                <li className="" data-testid="deluxe1">WASH AND SHINE</li>
                <li className="" data-testid="deluxe2">FOAMING POLISH</li>
                <li className="" data-testid="deluxe3">CLEAR COAT SEALANT</li>
                <li className="" data-testid="deluxe4">HAND DRY</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="other-options">
          <div className="section-title">OTHER OPTIONS</div>
          <div className="membership-flex">
            <div className="item" data-testid="box1">
              <div className="item-title">PREPAID WASH BOOKS</div>
              <ul>
                <li className="" data-testid="">Ask an attendant</li>
                <li className="" data-testid="">There are discounts for purchasing this way</li>
              </ul>
            </div>
            <div className="item" data-testid="box2">
              <div className="item-title">BUSINESS ACCOUNTS</div>
              <ul>
                <li className="" data-testid="deluxe1">Ask an attendant</li>
              </ul>
            </div>
            <div className="item" data-testid="box3">
              <div className="item-title">RV WASH</div>
              <ul>
                <li className="" data-testid="basic1">$2.00 per foot</li>
                <li className="" data-testid="basic1">Call to schedule an appointment</li>
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