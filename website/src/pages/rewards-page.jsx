import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { createUser } from '../api/firebase-auth';
import {
  createMember,
  findMemberByLicense,
  findMemberByRewardsOrLicense,
  getMemberRewardsId,
  updateMemberRewardsData,
} from '../api/firebase-crud';

import '../css/rewards-page.css';

function RewardsPage() {
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

  const [loginData, setLoginData] = useState({ rewardsId: '' });

  const [userData, setUserData] = useState({
    membershipType: 'Rewards',
    memberSince: 'Today',
    totalWashes: 0,
    washesUntilFree: 10,
    washesPerFree: 10,
  });

  const washesPerFree = Number(userData?.washesPerFree) || 10;
  const totalWashes = Number(userData?.totalWashes) || 0;
  const washesUntilFree = Number.isFinite(Number(userData?.washesUntilFree))
    ? Number(userData?.washesUntilFree)
    : Math.max(washesPerFree - (totalWashes % washesPerFree), 0);

  const rewardsProgress = useMemo(() => {
    const progress = ((washesPerFree - washesUntilFree) / washesPerFree) * 100;
    return Math.max(0, Math.min(100, progress));
  }, [washesPerFree, washesUntilFree]);

  const rewardsSteps = [
    {
      number: '01',
      title: 'Join',
      copy: 'Create your rewards account and use your rewards ID as your membership ID.',
    },
    {
      number: '02',
      title: 'Earn',
      copy: 'Every paid wash adds another stamp and moves you toward a free wash.',
    },
    {
      number: '03',
      title: 'Redeem',
      copy: 'On the 10th wash, the reward is ready to claim at the register.',
    },
  ];

  const updateSignupField = (event) => {
    const { name, value, type, checked } = event.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
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
      alert('Please enter your rewards ID.');
      return;
    }

    if (!signupData.authorized) {
      alert('Please authorize the rewards signup to continue.');
      return;
    }

    try {
      const existing = await findMemberByLicense(normalizedPlate);
      if (existing) {
        alert('This rewards ID already has an account: ' + getMemberRewardsId(existing));
        return;
      }

      const user = await createUser(signupData.email, signupData.password);
      const uid = user.uid;

      await createMember(
        uid,
        signupData.name.trim(),
        normalizedPlate,
        'active',
        'Rewards signup',
        signupData.email.trim()
      );

      await updateMemberRewardsData(uid, {
        rewardsId: normalizedPlate,
        phone: signupData.phone.trim(),
        authorized: Boolean(signupData.authorized),
        washesPerFree: 10,
        washesUntilFree: 10,
        totalWashes: 0,
        membershipType: 'Rewards',
      });

      resetSignupForm();
      setAuthTab('login');

      alert(`Signup successful. Your rewards ID is ${normalizedPlate}.`);
    } catch (err) {
      console.error('Signup failed:', err);
      alert('Signup failed: ' + (err.message || 'unknown error'));
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const value = loginData.rewardsId
      ? loginData.rewardsId.trim().toUpperCase().replace(/\s+/g, '')
      : '';

    if (!value) {
      alert('Please enter your rewards ID.');
      return;
    }

    try {
      const member = await findMemberByRewardsOrLicense(value);

      if (!member) {
        alert('No rewards account found for ' + value);
        return;
      }

      const normalizedMember = {
        ...member,
        washesPerFree: Number(member.washesPerFree) || 10,
        totalWashes: Number(member.totalWashes) || 0,
        washesUntilFree: Number.isFinite(Number(member.washesUntilFree))
          ? Number(member.washesUntilFree)
          : Math.max(10 - ((Number(member.totalWashes) || 0) % 10), 0),
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
    <div className="rewards-page">

      {/* Hero */}
      <section className="rewards-hero">
        <h1>Rewards Program</h1>
        <p className="subtitle">
          Join in minutes, watch your stamps add up, and redeem a free wash when your card fills.
        </p>
      </section>

      <section className="rewards-content">

        {/* How it works */}
        <article className="rewards-program-card">
          <h2>Rewards Program Details</h2>
          <div className="program-steps" aria-label="How rewards work">
            {rewardsSteps.map((step) => (
              <div key={step.number} className="program-step">
                <span className="step-number">{step.number}</span>
                <div className="step-body">
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* Auth card */}
        <article className="rewards-auth-card">
          <div className="auth-card-header">
            <h3>{authTab === 'signup' ? 'Create your account' : 'Welcome back'}</h3>
          </div>

          <div className="rewards-auth-panel">
            {authTab === 'signup' ? (
              <form className="rewards-signup-form" onSubmit={handleSignupSubmit}>
                <div className="form-grid two-col">
                  <input type="text" name="name" placeholder="Full name" value={signupData.name} onChange={updateSignupField} required />
                  <input type="tel" name="phone" placeholder="Phone" value={signupData.phone} onChange={updateSignupField} required />
                </div>

                <div className="form-grid two-col">
                  <input type="email" name="email" placeholder="Email" value={signupData.email} onChange={updateSignupField} required />
                  <input type="password" name="password" placeholder="Create password" value={signupData.password} onChange={updateSignupField} required />
                </div>

                <div className="form-grid two-col">
                  <input type="text" name="licensePlate" placeholder="Rewards ID" value={signupData.licensePlate} onChange={updateSignupField} required />
                  <input type="password" name="confirmPassword" placeholder="Confirm password" value={signupData.confirmPassword} onChange={updateSignupField} required />
                </div>

                <div className="form-grid two-col">
                  <div>
                    <div className="form-check rewards-form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="authorized"
                        id="rewards-authorized"
                        checked={signupData.authorized}
                        onChange={updateSignupField}
                      />
                      <label className="form-check-label rewards-form-check-label" htmlFor="rewards-authorized">
                        I authorize The Wash Zone to process this rewards signup <span className="text-danger">(required)</span>.
                      </label>
                    </div>
                  </div>
                  <div />
                </div>

                <button className="submit-button" type="submit">Create Rewards Account</button>

                
              </form>
            ) : (
              <form className="rewards-login-form" onSubmit={handleLoginSubmit}>
                <p className="auth-form-intro">Use your rewards ID to find your account.</p>
                <input
                  type="text"
                  placeholder="Enter rewards ID"
                  value={loginData.rewardsId}
                  onChange={(event) => setLoginData({ rewardsId: event.target.value })}
                />
                <button className="submit-button" type="submit">Log In</button>

                <div className="auth-helper-row">
                  <span>Need a new account?</span>
                  <button className="inline-link-button" type="button" onClick={() => setAuthTab('signup')}>
                    Sign up here
                  </button>
                </div>
              </form>
            )}

            <div className="auth-tabs-bottom" role="tablist" aria-label="Rewards authentication tabs">
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
                Sign Up
              </button>
            </div>
          </div>
        </article>

        {/* Member dashboard (shown after login) */}
        {isLoggedIn && (
          <aside className="member-preview-card" aria-live="polite">
            <div className="member-preview-header">
              <span className="member-preview-kicker">Member dashboard</span>
              <span className="member-preview-status">Signed in</span>
            </div>
            <h3>{userData.membershipType}</h3>
            <p>
              {userData.totalWashes} total wash{userData.totalWashes === 1 ? '' : 'es'} recorded.{' '}
              {userData.washesUntilFree} more visit{userData.washesUntilFree === 1 ? '' : 's'} until your next free wash.
            </p>
            <div className="member-preview-meter">
              <span style={{ width: `${rewardsProgress}%` }} />
            </div>
            <div className="member-preview-meta">
              <span>Member since {userData.memberSince}</span>
              <span>{Math.round(rewardsProgress)}% complete</span>
            </div>
          </aside>
        )}

      </section>

      {/* Contact footer */}
      <footer className="rewards-contact-footer" role="contentinfo">
        <div className="rewards-contact-inner">
          <p className="contact-cta-text">Questions about our rewards? Stop by or give us a call.</p>
          <Link to="/contact-us" className="contact-cta-button">Contact Us</Link>
        </div>
      </footer>

    </div>
  );
}

export default RewardsPage;
