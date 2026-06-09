import React, { useState, useEffect } from 'react';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../api/firebaseconfig.js';
import { createOrGetUser } from '../api/firebase-addbasic.js';
import '../css/loyalty-page.css';

const googleProvider = new GoogleAuthProvider();

function LoyaltyPage() {
  // ===== EDIT YOUR CONTENT BELOW =====
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    membershipType: 'Basic',
    memberSince: '2024-01-15',
    totalWashes: 0,
    washesUntilFree: 10,
    washesPerFree: 10
  });

  // Hero Section
  const heroTitle = "Loyalty Rewards";
  const heroSubtitle = "Track your washes and earn free rewards!";
  
  // Wash Progress Section
  const progressTitle = "Your Wash Progress";
  
  // Membership Details Section
  const membershipTitle = "Membership Details";
  const membershipFillerText = "Log in to view your membership details and track your rewards.";
  const membershipPlaceholderText = "Your membership information will appear here";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      if (user) {
        // Load user data asynchronously
        createOrGetUser(user.uid, {
          email: user.email,
          displayName: user.displayName
        }).then((firestoreUserData) => {
          setUserData({
            membershipType: firestoreUserData.membershipType || 'Basic',
            memberSince: firestoreUserData.memberSince || new Date().toISOString().split('T')[0],
            totalWashes: firestoreUserData.totalWashes || 0,
            washesUntilFree: firestoreUserData.washesPerFree - (firestoreUserData.totalWashes % firestoreUserData.washesPerFree) || 10,
            washesPerFree: firestoreUserData.washesPerFree || 10
          });
        }).catch((error) => {
          console.error('Error loading user data:', error);
        });
      } else {
        // Reset to default when logged out
        setUserData({
          membershipType: 'Basic',
          memberSince: '2024-01-15',
          totalWashes: 0,
          washesUntilFree: 10,
          washesPerFree: 10
        });
      }
    });
    return unsubscribe;
  }, []);

  // Handle login/logout button
  const handleLoginClick = async () => {
    if (isLoggedIn) {
      await signOut(auth);
    } else {
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (error) {
        console.error('Login popup failed:', error);
      }
    }
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
              {isLoggedIn ? 'Logout' : 'Login to Your Account'}
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