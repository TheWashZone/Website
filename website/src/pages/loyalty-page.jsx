import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/loyalty-page.css';

function LoyaltyPage() {
  // ===== EDIT YOUR CONTENT BELOW =====
  
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Hero Section
  const heroTitle = "Loyalty Rewards";
  const heroSubtitle = "Track your washes and earn free rewards!";
  
  // Wash Progress Section
  const progressTitle = "Your Wash Progress";
  const progressText = "3 washes until your next free wash!";
  
  // Membership Details Section
  const membershipTitle = "Membership Details";
  const membershipFillerText = "Log in to view your membership details and track your rewards.";
  const membershipPlaceholderText = "Your membership information will appear here";
  
  // ===== END EDITABLE CONTENT =====

  // Loyalty data
  const [userData, setUserData] = useState({
    membershipType: 'Ultimate',
    memberSince: '2024-01-15',
    totalWashes: 7,
    washesUntilFree: 3,
    washesPerFree: 10
  });

  // Handle login button
  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <>
      <div className="loyalty-page">
        {/* Hero Section */}
        <div className="loyalty-hero">
          <h1>{heroTitle}</h1>
          <p className="subtitle">{heroSubtitle}</p>
        </div>

        {/* Main Content */}
        <div className="loyalty-content">
          {/* Wash Progress */}
          <section className="loyalty-section">
            <h2>{progressTitle}</h2>
            <p>
              {userData.washesUntilFree === 0 
                ? "Congratulations! You've earned a free wash!" 
                : `${userData.washesUntilFree} wash${userData.washesUntilFree !== 1 ? 'es' : ''} until your next free wash!`}
            </p>
            <button className="login-button" onClick={handleLoginClick}>
              Login to Your Account
            </button>
          </section>

          {/* Membership Details */}
          <section className="loyalty-section membership">
            <h2>{membershipTitle}</h2>
            
            {isLoggedIn ? (
              <div className="membership-content">
                <ul>
                  <li><strong>Membership Type:</strong> {userData.membershipType}</li>
                  <li><strong>Member Since:</strong> {new Date(userData.memberSince).toLocaleDateString()}</li>
                  <li><strong>Total Washes:</strong> {userData.totalWashes}</li>
                  <li><strong>Next Free Wash:</strong> After {userData.washesUntilFree} more wash{userData.washesUntilFree !== 1 ? 'es' : ''}</li>
                </ul>
              </div>
            ) : (
              <div className="membership-filler">
                <p>{membershipFillerText}</p>
                <div className="filler-placeholder">
                  <p>{membershipPlaceholderText}</p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}

export default LoyaltyPage;