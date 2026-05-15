import React, { useState } from 'react';
import '../css/loyalty-page.css';

function LoyaltyPage() {
  // ===== PAGE TEXT =====

  const heroTitle = "Loyalty Rewards";
  const heroSubtitle = "Track your washes and earn free rewards!";

  const progressTitle = "Wash Progress";

  const membershipTitle = "Membership Details";
  const membershipFillerText =
    "Log in to view your membership details and track your rewards.";

  const membershipPlaceholderText =
    "Your membership information will appear here";

  // ===== STATE =====

  const [isLoggedIn] = useState(false);

  // null | login | signup
  const [mode, setMode] = useState(null);

  const [signupData, setSignupData] = useState({
    name: "",
    phone: "",
    email: "",
    licensePlate: "",
  });

  const [loginData, setLoginData] = useState({
    loyaltyNumber: "",
  });

  // ===== USER DATA =====

  const [userData] = useState({
    membershipType: 'Ultimate',
    memberSince: '2024-01-15',
    totalWashes: 7,
    washesUntilFree: 3,
    washesPerFree: 10
  });

  // ===== BUTTON HANDLERS =====

  const handleLoginClick = () => {
    setMode("login");
  };

  const handleSignupClick = () => {
    setMode("signup");
  };

  // ===== FORM SUBMITS =====

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    console.log("Signup Data:", signupData);

    // Firestore save will go here later
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    console.log("Login Data:", loginData);

    // Firestore lookup will go here later
  };

  return (
    <div className="loyalty-page">

      {/* HERO SECTION */}
      <div className="loyalty-hero">
        <h1>{heroTitle}</h1>
        <p className="subtitle">{heroSubtitle}</p>
      </div>

      {/* MAIN CONTENT */}
      <div className="loyalty-content">

        {/* WASH PROGRESS */}
        <section className="loyalty-section">

          <h2>{progressTitle}</h2>

          <p>
            {userData.washesUntilFree === 0
              ? "Congratulations! You've earned a free wash!"
              : `${userData.washesUntilFree} wash${userData.washesUntilFree !== 1 ? 'es' : ''} until your next free wash!`}
          </p>

          {/* BUTTONS */}
          <div
            style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            <button
              className="login-button"
              onClick={handleLoginClick}
            >
              Login
            </button>

            <button
              className="login-button"
              onClick={handleSignupClick}
            >
              Signup
            </button>
          </div>

          {/* SIGNUP FORM */}
          {mode === "signup" && (
            <form
              className="signup-form"
              onSubmit={handleSignupSubmit}
            >

              <h3>Sign Up</h3>

              <input
                type="text"
                placeholder="Name"
                value={signupData.name}
                onChange={(e) =>
                  setSignupData({
                    ...signupData,
                    name: e.target.value
                  })
                }
              />

              <input
                type="text"
                placeholder="Phone"
                value={signupData.phone}
                onChange={(e) =>
                  setSignupData({
                    ...signupData,
                    phone: e.target.value
                  })
                }
              />

              <input
                type="email"
                placeholder="Email"
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({
                    ...signupData,
                    email: e.target.value
                  })
                }
              />

              <input
                type="text"
                placeholder="License Plate"
                value={signupData.licensePlate}
                onChange={(e) =>
                  setSignupData({
                    ...signupData,
                    licensePlate: e.target.value
                  })
                }
              />

              <button
                type="submit"
                className="login-button"
              >
                Create Loyalty Account
              </button>

            </form>
          )}

          {/* LOGIN FORM */}
          {mode === "login" && (
            <form
              className="signup-form"
              onSubmit={handleLoginSubmit}
            >

              <h3>Login</h3>

              <input
                type="text"
                placeholder="Enter Loyalty Number"
                value={loginData.loyaltyNumber}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    loyaltyNumber: e.target.value
                  })
                }
              />

              <button
                type="submit"
                className="login-button"
              >
                Login
              </button>

            </form>
          )}

        </section>

        {/* MEMBERSHIP DETAILS */}
        <section className="loyalty-section membership">

          <h2>{membershipTitle}</h2>

          {isLoggedIn ? (
            <div className="membership-content">

              <ul>
                <li>
                  <strong>Membership Type:</strong>{" "}
                  {userData.membershipType}
                </li>

                <li>
                  <strong>Member Since:</strong>{" "}
                  {new Date(userData.memberSince).toLocaleDateString()}
                </li>

                <li>
                  <strong>Total Washes:</strong>{" "}
                  {userData.totalWashes}
                </li>

                <li>
                  <strong>Next Free Wash:</strong>{" "}
                  After {userData.washesUntilFree} more
                  wash{userData.washesUntilFree !== 1 ? 'es' : ''}
                </li>
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
  );
}

export default LoyaltyPage;