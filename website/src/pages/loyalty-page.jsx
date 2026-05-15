import React, { useState } from 'react';
import { createUser } from '../api/firebase-auth';
import { createMember, findMemberByLicense, findMemberByLoyaltyOrLicense, updateMember, getMember, logWash, redeemFreeWash } from '../api/firebase-crud';
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

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // null | login | signup
  const [mode, setMode] = useState(null);

  const [signupData, setSignupData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    licensePlate: "",
  });

  const [loginData, setLoginData] = useState({
    loyaltyNumber: "",
  });

  // ===== USER DATA =====

  const [userData, setUserData] = useState({
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

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    console.log("Signup Data:", signupData);
    // Normalize license plate
    const normalizedPlate = signupData.licensePlate ? signupData.licensePlate.trim().toUpperCase().replace(/\s+/g, '') : '';

    if (!normalizedPlate) {
      alert('Please enter a license plate to use as your loyalty number.');
      return;
    }

    try {
      // 0) Ensure license is unique
      const existing = await findMemberByLicense(normalizedPlate);
      if (existing) {
        alert('This license plate already has a loyalty account: ' + (existing.loyaltyNumber || existing.car));
        return;
      }

      // 1) Create Firebase Auth user
      const user = await createUser(signupData.email, signupData.password);

      // 2) Create user document in Firestore using uid as id
      const uid = user.uid;
      await createMember(uid, signupData.name, normalizedPlate, 'active', '', signupData.email);

      // 3) Save loyaltyNumber and phone
      await updateMember(uid, { loyaltyNumber: normalizedPlate, phone: signupData.phone });

      // Clear form and close
      setSignupData({ name: "", phone: "", email: "", password: "", licensePlate: "" });
      setMode(null);
      alert(`Signup successful — your loyalty number is ${normalizedPlate}`);
    } catch (err) {
      console.error('Signup failed:', err);
      alert('Signup failed: ' + (err.message || 'unknown error'));
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", loginData);

    (async () => {
      const value = loginData.loyaltyNumber ? loginData.loyaltyNumber.trim().toUpperCase().replace(/\s+/g, '') : '';
      if (!value) {
        alert('Please enter a loyalty number (license plate)');
        return;
      }

      try {
        const member = await findMemberByLoyaltyOrLicense(value);
        if (!member) {
          alert('No loyalty account found for ' + value);
          return;
        }

        // Set logged-in state and user data
        setUserData(member);
        setIsLoggedIn(true);
        setMode(null);
        alert('Logged in. Welcome, ' + (member.name || 'member'));
      } catch (err) {
        console.error('Login lookup failed:', err);
        alert('Lookup failed: ' + (err.message || 'unknown error'));
      }
    })();
  };

  const handleLogWash = async () => {
    if (!isLoggedIn || !userData?.id) return alert('Not logged in');
    try {
      await logWash(userData.id, 'basicWashes');
      const updated = await getMember(userData.id);
      setUserData(updated);
      alert('Wash logged');
    } catch (err) {
      console.error('Log wash failed:', err);
      alert('Log wash failed: ' + (err.message || 'unknown error'));
    }
  };

  const handleRedeem = async () => {
    if (!isLoggedIn || !userData?.id) return alert('Not logged in');
    try {
      const res = await redeemFreeWash(userData.id);
      if (res && res.redeemed) {
        const updated = await getMember(userData.id);
        setUserData(updated);
        alert('Free wash redeemed');
      } else {
        alert('Cannot redeem free wash: ' + (res?.reason || 'not eligible'));
      }
    } catch (err) {
      console.error('Redeem failed:', err);
      alert('Redeem failed: ' + (err.message || 'unknown error'));
    }
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
                type="password"
                placeholder="Password"
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({
                    ...signupData,
                    password: e.target.value
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

              <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                <button className="login-button" onClick={handleLogWash}>Log Wash</button>
                <button className="login-button" onClick={handleRedeem}>Redeem Free Wash</button>
              </div>

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