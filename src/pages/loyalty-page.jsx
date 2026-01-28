import { Stack } from 'react-bootstrap';
import banner from '../images/ChatGPT-Soapy-Pavement.png';
import '../css/loyalty-page.css';

function LoyaltyPage() {
  // Temporary mock data - will be replaced with actual user data later
  const mockUserData = {
    loyaltyNumber: "WZ-2024-00123",
    washesUntilFree: 3,
    totalWashesNeeded: 10,
    currentWashCount: 7,
    membershipType: "Ultimate",
    memberSince: "2024-01-15"
  };

  // Calculate progress percentage
  const progressPercentage = (mockUserData.currentWashCount / mockUserData.totalWashesNeeded) * 100;

  return (
    <>
      {/* ADD THIS BANNER CONTAINER - Same as homepage */}
      <div className="container-fluid p-0 w-100 header-container">
        <img src={banner} className="header-img" alt="banner image" />
      </div>
      
      <div className="loyalty-format">
        <div className="loyalty-colored">
          <div className="loyalty-title">
            Loyalty Rewards
          </div>
          <div className="loyalty-subtitle">
            Track your washes and earn free rewards!
          </div>
        </div>
        
        <div className="loyalty-colored2">
          <div className="progress-container">
            <div className="progress-title">Your Wash Progress</div>
            <div className="progress-text">
              {mockUserData.washesUntilFree} washes until your next free wash!
            </div>
            <div className="progress-text">
              Current count: {mockUserData.currentWashCount} / {mockUserData.totalWashesNeeded}
            </div>
            
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            
            <div className="loyalty-number">
              Loyalty Number: {mockUserData.loyaltyNumber}
            </div>
          </div>
        </div>
        
        <div className="loyalty-colored">
          <div className="loyalty-section-title">Your Membership Info</div>
          <div className="loyalty-container">
            <div className="loyalty-boxed loyalty-item" data-testid="loyalty-box1">
              <div className="progress-title">Membership Details</div>
              <ul>
                <li className="left-align">
                  <strong>Membership Type:</strong> {mockUserData.membershipType}
                </li>
                <li className="left-align">
                  <strong>Member Since:</strong> {mockUserData.memberSince}
                </li>
                <li className="left-align">
                  <strong>Total Washes:</strong> {mockUserData.currentWashCount}
                </li>
                <li className="left-align">
                  <strong>Next Free Wash:</strong> After {mockUserData.washesUntilFree} more washes
                </li>
              </ul>
            </div>
            
            <div className="loyalty-boxed loyalty-item" data-testid="loyalty-box2">
              <div className="progress-title">How It Works</div>
              <ul>
                <li className="left-align"> Every wash counts towards your loyalty rewards</li>
                <li className="left-align"> Get 1 free wash for every {mockUserData.totalWashesNeeded} washes</li>
                <li className="left-align"> Your loyalty number is unique to you</li>
                <li className="left-align"> Present your QR code at checkout</li>
                <li className="left-align"> Rewards never expire!</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="loyalty-colored2">
          <div className="qr-container">
            <div className="loyalty-section-title">Your Loyalty QR Code</div>
            <p className="progress-text">
              Show this code at checkout to earn rewards
            </p>
            <div className="qr-placeholder">
              <div>
                <p>QR Code Placeholder</p>
                <p>(Will be generated dynamically)</p>
              </div>
            </div>
            <div className="progress-text">
              <em>QR code functionality will be implemented with user accounts</em>
            </div>
          </div>
        </div>
        
        <div className="loyalty-colored">
          <div className="loyalty-section-title">Need Help?</div>
          <Stack gap={3} className="hours-stack">
            <div className="hours">Visit us at: 1907 E Isaacs Ave, Walla Walla, WA 99362</div>
            <div className="hours">Call us: (509) 522-5684</div>
            <div className="hours">Your loyalty rewards are automatically tracked with each wash</div>
          </Stack>
        </div>
      </div>
    </>
  )
}

export default LoyaltyPage;