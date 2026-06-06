import { useState, useMemo } from 'react';
import { doc, getDoc, setDoc, serverTimestamp, collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { createUser, signIn } from '../api/firebase-auth';
import { db } from '../api/firebaseconfig';

import '../css/rewards-page.css';

const USERS_COLLECTION = 'users';
const REWARDS_ID_PREFIX = 'R';

async function findMemberByEmailOrPhone(value) {
  const trimmed = value.trim().toLowerCase();
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
  const field = isEmail ? 'email' : 'phone';
  const searchValue = isEmail ? trimmed : trimmed.replace(/\D/g, '');

  const q = query(collection(db, 'users'), where(field, '==', searchValue));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const docSnap = snapshot.docs[0];
  return { id: docSnap.id, ...docSnap.data() };
}

function generateId(prefix) {
  const suffix = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${prefix}${suffix}`;
}

async function allocateRewardsId(prefix) {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const candidateId = generateId(prefix);
    const existing = await getDoc(doc(db, USERS_COLLECTION, candidateId));
    if (!existing.exists()) return candidateId;
  }
  throw new Error('Unable to create a unique rewards ID. Please try again.');
}

async function createRewardsAccount(submission) {
  if (!submission?.name?.trim()) throw new Error('Name is required.');
  const memberId = submission.memberId || await allocateRewardsId(REWARDS_ID_PREFIX);
  const rewardsData = {
    name: submission.name.trim(),
    status: 'active',
    notes: 'Rewards signup via website',
    email: submission.email?.trim().toLowerCase() || '',
    phone: submission.phone?.trim() || '',
    authEmail: submission.authEmail,
    contactMethod: submission.contactMethod,
    rewardsId: memberId,
    loyaltyNumber: memberId,
    membershipType: 'Rewards',
    memberSince: submission.memberSince || new Date().toISOString().split('T')[0],
    totalWashes: 0,
    washesPerFree: 10,
    washesUntilFree: 10,
    authorized: Boolean(submission.authorized),
    submittedAt: submission.submittedAt || new Date().toISOString(),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await setDoc(doc(db, USERS_COLLECTION, memberId), rewardsData);
  return { id: memberId, ...rewardsData };
}

function RewardsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authTab, setAuthTab] = useState('signup');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState({ text: '', type: '' }); // 'error' | 'success'

  const [signupData, setSignupData] = useState({
    name: '',
    emailOrPhone: '',
    password: '',
    confirmPassword: '',
    authorized: false,
  });

  const [loginData, setLoginData] = useState({ emailOrPhone: '', password: '' });

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
    { number: '01', title: 'Join', copy: 'Create your rewards account and use your rewards ID as your membership ID.' },
    { number: '02', title: 'Earn', copy: 'Every paid wash adds another stamp and moves you toward a free wash.' },
    { number: '03', title: 'Redeem', copy: 'On the 10th wash, the reward is ready to claim at the register.' },
  ];

  const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const normalizePhone = (value) => value.replace(/\D/g, '');
  const isTwoWordName = (value) => value.trim().split(/\s+/).filter(Boolean).length >= 2;
  const hasNoNumbers = (value) => !/\d/.test(value);
  const isFakePhone = (digits) => digits === '0000000000' || digits === '1234567890';
  const buildAuthEmail = (value) =>
    isEmail(value) ? value.trim().toLowerCase() : `${normalizePhone(value)}@washzone.com`;

  const updateSignupField = (event) => {
    const { name, value, type, checked } = event.target;
    setSignupData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const resetSignupForm = () => {
    setSignupData({ name: '', emailOrPhone: '', password: '', confirmPassword: '', authorized: false });
    setFormMessage({ text: '', type: '' });
    setErrors({});
  };

  const resetLoginForm = () => {
    setLoginData({ emailOrPhone: '', password: '' });
    setErrors({});
  };

  const validateSignup = () => {
    const nextErrors = {};
    const { name, emailOrPhone, password, confirmPassword, authorized } = signupData;

    if (!name.trim()) {
      nextErrors.name = 'Name is required.';
    } else if (!hasNoNumbers(name)) {
      nextErrors.name = 'Name cannot contain numbers.';
    } else if (!isTwoWordName(name)) {
      nextErrors.name = 'Please enter your first and last name.';
    }

    if (!emailOrPhone.trim()) {
      nextErrors.emailOrPhone = 'Email or phone is required.';
    } else if (!isEmail(emailOrPhone)) {
      const digits = normalizePhone(emailOrPhone);
      if (digits.length !== 10) {
        nextErrors.emailOrPhone = 'Enter a valid email or 10-digit phone number.';
      } else if (isFakePhone(digits)) {
        nextErrors.emailOrPhone = 'Enter a valid phone number.';
      }
    }

    if (!password.trim()) {
      nextErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.';
    }

    if (!confirmPassword.trim()) {
      nextErrors.confirmPassword = 'Please confirm your password.';
    } else if (password !== confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!authorized) nextErrors.authorized = 'Authorization is required.';

    return nextErrors;
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    setFormMessage({ text: '', type: '' });

    const nextErrors = validateSignup();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const { name, emailOrPhone, password, authorized } = signupData;
    const contactValue = emailOrPhone.trim();
    const normalizedPhone = normalizePhone(contactValue);
    const contactMethod = isEmail(contactValue) ? 'email' : 'phone';
    const authEmail = buildAuthEmail(contactValue);

    setIsSubmitting(true);
    try {
      await createUser(authEmail, password);
      const existingMember = await findMemberByEmailOrPhone(contactValue);
      const rewardsAccount = await createRewardsAccount({
        memberId: existingMember?.id,
        name,
        email: isEmail(contactValue) ? contactValue.toLowerCase() : '',
        phone: isEmail(contactValue) ? '' : normalizedPhone,
        authEmail,
        contactMethod,
        authorized,
        submittedAt: new Date().toISOString(),
      });

      resetSignupForm();
      setFormMessage({ text: `Account created successfully! Your rewards ID is ${rewardsAccount.id}.`, type: 'success' });
      setAuthTab('login');
    } catch (err) {
      console.error('Signup failed:', err);
      if (err.code === 'auth/email-already-in-use') {
        setFormMessage({ text: 'An account with this email or phone already exists. Please log in instead.', type: 'error' });
        setAuthTab('login');
      } else if (err.code === 'auth/weak-password') {
        setFormMessage({ text: 'Password must be at least 6 characters.', type: 'error' });
      } else if (err.code === 'auth/invalid-email') {
        setFormMessage({ text: 'Please enter a valid email address.', type: 'error' });
      } else {
        setFormMessage({ text: err.message || 'Signup failed. Please try again.', type: 'error' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setFormMessage({ text: '', type: '' });

    const value = loginData.emailOrPhone.trim();
    const password = loginData.password.trim();

    if (!value) {
      setFormMessage({ text: 'Please enter your email or phone number.', type: 'error' });
      return;
    }

    if (!password) {
      setFormMessage({ text: 'Please enter your password.', type: 'error' });
      return;
    }

    if (!isEmail(value)) {
      const digits = normalizePhone(value);
      if (digits.length !== 10) {
        setFormMessage({ text: 'Enter a valid email or 10-digit phone number.', type: 'error' });
        return;
      }
      if (isFakePhone(digits)) {
        setFormMessage({ text: 'Enter a valid phone number.', type: 'error' });
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const authEmail = buildAuthEmail(value);
      await signIn(authEmail, password);
      const member = await findMemberByEmailOrPhone(value);
      if (!member) {
        setFormMessage({ text: 'No rewards account found for ' + value, type: 'error' });
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
      setFormMessage({ text: 'Welcome back, ' + (member.name || 'member') + '!', type: 'success' });
      resetLoginForm();
    } catch (err) {
      console.error('Login lookup failed:', err);
      setFormMessage({ text: err.message || 'Lookup failed. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchTab = (tab) => {
    setAuthTab(tab);
    setFormMessage({ text: '', type: '' });
    setErrors({});
  };

  return (
    <div className="rewards-page">

      <section className="rewards-hero">
        <h1>Rewards Program</h1>
        <p className="subtitle">
          Join in minutes, watch your stamps add up, and redeem a free wash when your card fills.
        </p>
      </section>

      <section className="rewards-content">

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

        <article className="rewards-auth-card">
          <div className="auth-card-header">
            <h3>{authTab === 'signup' ? 'Create your account' : 'Welcome back'}</h3>
          </div>

          <div className="rewards-auth-panel">
            {authTab === 'signup' ? (
              <form className="rewards-signup-form" onSubmit={handleSignupSubmit} noValidate>
                <div className="form-grid two-col">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full name"
                      value={signupData.name}
                      onChange={updateSignupField}
                      className={errors.name ? 'is-invalid' : ''}
                    />
                    {errors.name && <div className="field-error">{errors.name}</div>}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="emailOrPhone"
                      placeholder="Email / Phone"
                      value={signupData.emailOrPhone}
                      onChange={updateSignupField}
                      className={errors.emailOrPhone ? 'is-invalid' : ''}
                    />
                    {errors.emailOrPhone && <div className="field-error">{errors.emailOrPhone}</div>}
                  </div>
                </div>

                <div className="form-grid two-col">
                  <div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Create password"
                      value={signupData.password}
                      onChange={updateSignupField}
                      className={errors.password ? 'is-invalid' : ''}
                    />
                    {errors.password && <div className="field-error">{errors.password}</div>}
                  </div>
                  <div>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      value={signupData.confirmPassword}
                      onChange={updateSignupField}
                      className={errors.confirmPassword ? 'is-invalid' : ''}
                    />
                    {errors.confirmPassword && <div className="field-error">{errors.confirmPassword}</div>}
                  </div>
                </div>

                <div className="form-check rewards-form-check">
                  <input
                    className={`form-check-input ${errors.authorized ? 'is-invalid' : ''}`}
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
                {errors.authorized && <div className="field-error">{errors.authorized}</div>}

                <button className="submit-button" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating account...' : 'Create Rewards Account'}
                </button>

                <div className="auth-helper-row">
                  <span>Already have an account?</span>
                  <button className="inline-link-button" type="button" onClick={() => switchTab('login')}>
                    Log in here
                  </button>
                </div>

                {formMessage.text && (
                  <div className={`form-message form-message--${formMessage.type}`} role="alert">
                    {formMessage.text}
                  </div>
                )}
              </form>
            ) : (
              <form className="rewards-login-form" onSubmit={handleLoginSubmit} noValidate>
                <p className="auth-form-intro">Use your email or phone number and password to sign in.</p>
                <input
                  type="text"
                  placeholder="Email / Phone"
                  value={loginData.emailOrPhone}
                  onChange={(event) => setLoginData((prev) => ({ ...prev, emailOrPhone: event.target.value }))}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(event) => setLoginData((prev) => ({ ...prev, password: event.target.value }))}
                />
                <button className="submit-button" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Signing in...' : 'Log In'}
                </button>

                <div className="auth-helper-row">
                  <span>Need a new account?</span>
                  <button className="inline-link-button" type="button" onClick={() => switchTab('signup')}>
                    Sign up here
                  </button>
                </div>

                {formMessage.text && (
                  <div className={`form-message form-message--${formMessage.type}`} role="alert">
                    {formMessage.text}
                  </div>
                )}
              </form>
            )}
          </div>
        </article>

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
