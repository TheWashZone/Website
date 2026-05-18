import React, { useMemo, useState } from 'react';
import { createUser } from '../api/firebase-auth';
import {
  createMember,
  findMemberByLicense,
  findMemberByLoyaltyOrLicense,
  updateMember,
  getMember
} from '../api/firebase-crud';

import '../css/loyalty-page.css';

function LoyaltyPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authTab, setAuthTab] = useState('signup');

  const [signupData, setSignupData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    licensePlate: '',
    authorized: false,
  });

  const [loginData, setLoginData] = useState({ loyaltyNumber: '' });

  const [userData, setUserData] = useState({
    membershipType: 'Loyalty Rewards',
    memberSince: 'Today',
    totalWashes: 0,
    washesUntilFree: 10,
    washesPerFree: 10
  });

  const washesPerFree = Number(userData?.washesPerFree) || 10;
  const totalWashes = Number(userData?.totalWashes) || 0;
  const washesUntilFree = Number.isFinite(Number(userData?.washesUntilFree))
    ? Number(userData?.washesUntilFree)
    : Math.max(washesPerFree - (totalWashes % washesPerFree), 0);

  const loyaltyProgress = useMemo(() => {
    const progress = ((washesPerFree - washesUntilFree) / washesPerFree) * 100;
    return Math.max(0, Math.min(100, progress));
  }, [washesPerFree, washesUntilFree]);

  const updateSignupField = (event) => {
    const { name, value, type, checked } = event.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const resetSignupForm = () => {
    setSignupData({
      name: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      licensePlate: '',
      authorized: false,
    });
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();

    const normalizedPlate = signupData.licensePlate
      ? signupData.licensePlate.trim().toUpperCase().replace(/\s+/g, '')
      : '';

    if (!signupData.name.trim() || !signupData.email.trim() || !signupData.password.trim()) {
      alert('Please complete name, email, and password.');
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    if (!signupData.phone.trim()) {
      alert('Please enter a phone number.');
      return;
    }

    if (!normalizedPlate) {
      alert('Please enter a license plate to use as your loyalty number.');
      return;
    }

    if (!signupData.authorized) {
      alert('Please authorize the loyalty signup to continue.');
      return;
    }

    try {
      const existing = await findMemberByLicense(normalizedPlate);
      if (existing) {
        alert('This license plate already has a loyalty account: ' + (existing.loyaltyNumber || existing.car));
        return;
      }

      const user = await createUser(signupData.email, signupData.password);
      const uid = user.uid;

      await createMember(
        uid,
        signupData.name.trim(),
        normalizedPlate,
        'active',
        'Loyalty rewards signup',
        signupData.email.trim()
      );

      await updateMember(uid, {
        loyaltyNumber: normalizedPlate,
        phone: signupData.phone.trim(),
        authorized: Boolean(signupData.authorized),
        washesPerFree: 10,
        washesUntilFree: 10,
        totalWashes: 0,
        membershipType: 'Loyalty Rewards'
      });

      resetSignupForm();
      setAuthTab('login');

      alert(`Signup successful. Your loyalty number is ${normalizedPlate}.`);
    } catch (err) {
      console.error('Signup failed:', err);
      alert('Signup failed: ' + (err.message || 'unknown error'));
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const value = loginData.loyaltyNumber
      ? loginData.loyaltyNumber.trim().toUpperCase().replace(/\s+/g, '')
      : '';

    if (!value) {
      alert('Please enter a loyalty number (license plate).');
      return;
    }

    try {
      const member = await findMemberByLoyaltyOrLicense(value);

      if (!member) {
        alert('No loyalty account found for ' + value);
        return;
      }

      const normalizedMember = {
        ...member,
        washesPerFree: Number(member.washesPerFree) || 10,
        totalWashes: Number(member.totalWashes) || 0,
        washesUntilFree: Number.isFinite(Number(member.washesUntilFree))
          ? Number(member.washesUntilFree)
          : Math.max(10 - ((Number(member.totalWashes) || 0) % 10), 0)
      };

      setUserData(normalizedMember);
      setIsLoggedIn(true);

      alert('Wash logged. Welcome, ' + (member.name || 'member'));
    } catch (err) {
      console.error('Login lookup failed:', err);
      alert('Lookup failed: ' + (err.message || 'unknown error'));
    }
  };

  return (
    <div className="loyalty-page">
      <section className="loyalty-hero">
        <p className="hero-kicker">The Wash Zone Perks</p>
        <h1>LOYALTY REWARDS!!</h1>
        <p className="subtitle">
          Wash with us, track your progress, and claim a free wash after every 10 paid washes.
        </p>
      </section>

      <section className="loyalty-content">
        <div className="loyalty-story-panel">
          <article className="loyalty-program-card">
            <div className="program-headline-row">
              <h2>Loyalty Program Details</h2>
              <span className="program-pill">10 Washes = 1 Free</span>
            </div>

            <div className="hero-reward-block">
              <div className="reward-number">FREE</div>
              <div className="reward-copy">
                <p className="program-intro">
                  Join once, wash often, and unlock your reward. Every paid wash gets you closer to your next free one.
                </p>
                <div className="progress-track compact" role="progressbar" aria-valuenow={Math.round(loyaltyProgress)} aria-valuemin={0} aria-valuemax={100}>
                  <div className="progress-fill" style={{ width: `${loyaltyProgress}%` }} />
                </div>
                <div className="progress-copy compact-copy">
                  {washesUntilFree === 0
                    ? 'You earned a free wash. Redeem it now.'
                    : `${washesUntilFree} wash${washesUntilFree === 1 ? '' : 'es'} left until your free wash.`}
                </div>
              </div>
            </div>

            <div className="program-stat-chips">
              <div className="stat-chip">
                <span className="chip-value">1</span>
                <span className="chip-label">Vehicle Per Account</span>
              </div>
              <div className="stat-chip">
                <span className="chip-value">10</span>
                <span className="chip-label">Paid Washes Needed</span>
              </div>
              <div className="stat-chip">
                <span className="chip-value">FREE</span>
                <span className="chip-label">Reward Wash</span>
              </div>
            </div>

            <div className="program-steps" aria-label="How loyalty works">
              <div className="program-step">
                <span className="step-number">01</span>
                <h3>Sign Up</h3>
                <p>Create your loyalty account using your plate as your loyalty number.</p>
              </div>
              <div className="program-step">
                <span className="step-number">02</span>
                <h3>Wash & Track</h3>
                <p>Each paid wash counts toward your next free reward.</p>
              </div>
              <div className="program-step">
                <span className="step-number">03</span>
                <h3>Redeem</h3>
                <p>After 10 washes, claim your free wash at check-in.</p>
              </div>
            </div>

          </article>
        </div>

        <article className="loyalty-auth-card">
          {authTab === 'signup' ? (
            <form className="loyalty-signup-form" onSubmit={handleSignupSubmit}>
              <h3>Sign Up For Loyalty</h3>

              <div className="form-grid two-col">
                <input type="text" name="name" placeholder="Full name" value={signupData.name} onChange={updateSignupField} required />
                <input type="tel" name="phone" placeholder="Phone" value={signupData.phone} onChange={updateSignupField} required />
              </div>

              <div className="form-grid two-col">
                <input type="email" name="email" placeholder="Email" value={signupData.email} onChange={updateSignupField} required />
                <input type="password" name="password" placeholder="Create password" value={signupData.password} onChange={updateSignupField} required />
              </div>

              <div className="form-grid two-col">
                <input type="text" name="licensePlate" placeholder="License plate (loyalty number)" value={signupData.licensePlate} onChange={updateSignupField} required />
                <input type="password" name="confirmPassword" placeholder="Confirm password" value={signupData.confirmPassword} onChange={updateSignupField} required />
              </div>

              <div className="form-check loyalty-form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="authorized"
                  id="loyalty-authorized"
                  checked={signupData.authorized}
                  onChange={updateSignupField}
                />
                <label className="form-check-label loyalty-form-check-label" htmlFor="loyalty-authorized">
                  I authorize The Wash Zone to process this loyalty signup <span className="text-danger">(required)</span>.
                </label>
              </div>

              <button className="submit-button" type="submit">Create Loyalty Account</button>
            </form>
          ) : (
            <form className="loyalty-login-form" onSubmit={handleLoginSubmit}>
              <h3>Log In To Your Loyalty Account</h3>
              <p>Use your loyalty number or license plate.</p>
              <input
                type="text"
                placeholder="Enter loyalty number"
                value={loginData.loyaltyNumber}
                onChange={(event) => setLoginData({ loyaltyNumber: event.target.value })}
              />
              <button className="submit-button" type="submit">Log In</button>
            </form>
          )}

          <div className="auth-tabs-bottom" role="tablist" aria-label="Loyalty authentication tabs">
            <button
              className={authTab === 'login' ? 'tab-button active' : 'tab-button'}
              onClick={() => setAuthTab('login')}
              type="button"
              role="tab"
              aria-selected={authTab === 'login'}
            >
              Log In
            </button>
            <button
              className={authTab === 'signup' ? 'tab-button active' : 'tab-button'}
              onClick={() => setAuthTab('signup')}
              type="button"
              role="tab"
              aria-selected={authTab === 'signup'}
            >
              Signup
            </button>
          </div>
        </article>
      </section>
    </div>
  );
}

export default LoyaltyPage;