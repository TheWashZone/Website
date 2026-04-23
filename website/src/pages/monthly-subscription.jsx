import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import '../css/monthly-subscription.css';
import washZoneDesignLogo from '../images/The Wash ZONE logo design.png';
import { Link } from 'react-router-dom';
import { auth, db } from '../api/firebaseconfig';

const EMPTY_FORM = {
  vehicleYear: '',
  name: '',
  contactPerson: '',
  vehicleMake: '',
  vehicleModel: '',
  vehicleColor: '',
  streetAddress: '',
  city: '',
  state: '',
  zipCode: '',
  phone: '',
  email: '',
  plan: 'deluxe',
  authorized: false,
  printName: ''
};

const USERS_COLLECTION = 'users';

const PLAN_TO_PREFIX = {
  basic: 'B',
  deluxe: 'D',
  ultimate: 'U'
};

function normalizePlan(plan) {
  const value = String(plan || '').trim().toLowerCase();
  return PLAN_TO_PREFIX[value] ? value : 'deluxe';
}

async function ensureAuthenticated() {
  if (!auth.currentUser) {
    await signInAnonymously(auth);
  }
}

function generateId(prefix) {
  const suffix = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  return `${prefix}${suffix}`;
}

async function allocateMemberId(prefix) {
  for (let i = 0; i < 20; i += 1) {
    const candidateId = generateId(prefix);
    const existing = await getDoc(doc(db, USERS_COLLECTION, candidateId));
    if (!existing.exists()) {
      return candidateId;
    }
  }

  throw new Error('Unable to create a unique subscription ID. Please try again.');
}

async function createSubscriptionLead(submission) {
  if (!submission?.name?.trim()) {
    throw new Error('Name is required.');
  }

  await ensureAuthenticated();

  const plan = normalizePlan(submission.plan);
  const tier = PLAN_TO_PREFIX[plan];
  const memberId = await allocateMemberId(tier);

  const leadData = {
    name: submission.name.trim(),
    car: submission.car || '',
    status: 'payment_needed',
    notes: '',
    email: submission.email?.trim() || '',
    tier,
    plan,
    phone: submission.phone?.trim() || '',
    address: submission.address || '',
    contactPerson: submission.contactPerson?.trim() || '',
    vehicleYear: submission.vehicleYear?.trim() || '',
    vehicleMake: submission.vehicleMake?.trim() || '',
    vehicleModel: submission.vehicleModel?.trim() || '',
    vehicleColor: submission.vehicleColor?.trim() || '',
    authorized: Boolean(submission.authorized),
    printName: submission.printName?.trim() || '',
    submittedAt: submission.submittedAt || new Date().toISOString(),
    paymentStatus: 'pending',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  await setDoc(doc(db, USERS_COLLECTION, memberId), leadData);

  return {
    id: memberId,
    ...leadData
  };
}

function MonthlySubscriptionPage() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const isTenDigitPhoneNumber = (value) => value.replace(/\D/g, '').length === 10;
  const isTwoWordName = (value) => value.trim().split(/\s+/).filter(Boolean).length === 2;

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = 'Name is required.';
    if (!formData.contactPerson.trim()) nextErrors.contactPerson = 'Contact person is required.';
    if (!formData.email.trim()) nextErrors.email = 'Email is required.';
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (!formData.phone.trim()) {
      nextErrors.phone = 'Phone is required.';
    } else if (!isTenDigitPhoneNumber(formData.phone)) {
      nextErrors.phone = 'Enter a 10-digit phone number.';
    }
    if (!formData.vehicleMake.trim()) nextErrors.vehicleMake = 'Vehicle make is required.';
    if (!formData.vehicleModel.trim()) nextErrors.vehicleModel = 'Vehicle model is required.';
    if (!formData.plan) nextErrors.plan = 'Please select a plan.';
    if (!formData.authorized) nextErrors.authorized = 'Authorization is required.';
    if (!formData.printName.trim()) {
      nextErrors.printName = 'Print name is required.';
    } else if (!isTwoWordName(formData.printName)) {
      nextErrors.printName = 'Print name must contain two words.';
    }

    return nextErrors;
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitStatus('idle');
    setStatusMessage('Submitting form...');

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitStatus('error');
      setStatusMessage('Not all filds are completed');
      return;
    }

    const car = [
      formData.vehicleYear.trim(),
      formData.vehicleMake.trim(),
      formData.vehicleModel.trim(),
      formData.vehicleColor.trim() ? `(${formData.vehicleColor.trim()})` : ''
    ]
      .filter(Boolean)
      .join(' ');

    const address = [
      formData.streetAddress.trim(),
      formData.city.trim(),
      formData.state.trim(),
      formData.zipCode.trim()
    ]
      .filter(Boolean)
      .join(', ');

    const submission = {
      ...formData,
      car,
      address,
      submittedAt: new Date().toISOString(),
      status: 'payment_needed'
    };

    try {
      await createSubscriptionLead(submission);

      setSubmitStatus('success');
      setStatusMessage('Form submitted successfully.');
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage(error?.message || 'Unable to submit your form right now. Please try again.');
    }
  };

  return (
    <div className="subscription-wrapper">
      <div className="subscription-form-container">
        <div className="subscription-header">
          <h2 className="subscription-title">Monthly Pass Registration Form</h2>
          <img className="subscription-logo" src={washZoneDesignLogo} alt="The Wash Zone logo" />
        </div>
      

        <Form className="subscription-form" onSubmit={handleSubmit} noValidate>
            {/* Vehicle */}
            <Row className="mb-3">
              <Col md={12}>
                <Form.Label>Vehicle (year, make, model, color)</Form.Label>
                <Row className="g-2">
                  <Col xs={3}>
                    <Form.Control
                      type="text"
                      name="vehicleYear"
                      placeholder="Year"
                      value={formData.vehicleYear}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col xs={3}>
                    <Form.Control
                      type="text"
                      name="vehicleMake"
                      placeholder="Make"
                      value={formData.vehicleMake}
                      onChange={handleChange}
                      isInvalid={!!errors.vehicleMake}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.vehicleMake}
                    </Form.Control.Feedback>
                  </Col>
                  <Col xs={3}>
                    <Form.Control
                      type="text"
                      name="vehicleModel"
                      placeholder="Model"
                      value={formData.vehicleModel}
                      onChange={handleChange}
                      isInvalid={!!errors.vehicleModel}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.vehicleModel}
                    </Form.Control.Feedback>
                  </Col>
                  <Col xs={3}>
                    <Form.Control
                      type="text"
                      name="vehicleColor"
                      placeholder="Color"
                      value={formData.vehicleColor}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>

          {/* Name + Contact Person */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="contactPerson">
                <Form.Label>Contact Person <span className="text-muted">(if different)</span></Form.Label>
                <Form.Control
                  type="text"
                  name="contactPerson"
                  placeholder="Contact person"
                  value={formData.contactPerson}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Street Address */}
          <Form.Group className="mb-3" controlId="streetAddress">
            <Form.Label>Street Address</Form.Label>
            <Form.Control
              type="text"
              name="streetAddress"
              placeholder="Street address"
              value={formData.streetAddress}
              onChange={handleChange}
            />
          </Form.Group>

          {/* City, State, Zip */}
          <Row className="mb-3">
            <Col md={5}>
              <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  placeholder="WA"
                  value={formData.state}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="zipCode">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  type="text"
                  name="zipCode"
                  placeholder="Zip code"
                  value={formData.zipCode}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Phone + Email */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="phone">
                <Form.Label>Phone <span className="text-danger">(required)</span></Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder="(509) 555-5555"
                  value={formData.phone}
                  onChange={handleChange}
                  isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="email">
                <Form.Label>Email <span className="text-muted">(for monthly receipt)</span></Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Plan Selection */}
          <Row className="mb-4 subscription-plan-row">
            <Col lg={12} className="subscription-plans-col">
              <Form.Label className="d-block fw-bold mb-3" style={{ fontSize: '1.1rem' }}>Select Your Plan</Form.Label>
              <Row className="g-3 subscription-plan-grid">
                <Col md={6}>
                  <div
                    className={`plan-card ${formData.plan === 'deluxe' ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, plan: 'deluxe' })}
                    role="button"
                    tabIndex="0"
                  >
                    <div className="plan-card-header">
                      <h3>Deluxe Pass</h3>
                      <div className="plan-badge">Popular</div>
                    </div>
                    <div className="plan-card-price">$27<span>/month</span></div>
                    <ul className="plan-card-features">
                      <li>Wash and Shine</li>
                      <li>Foaming Polish</li>
                      <li>Clear Coat Sealant</li>
                      <li>Hand Dry</li>
                    </ul>
                    <Form.Check
                      type="radio"
                      id="plan-deluxe"
                      name="plan"
                      value="deluxe"
                      checked={formData.plan === 'deluxe'}
                      onChange={handleChange}
                      className="plan-card-radio"
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div
                    className={`plan-card ${formData.plan === 'ultimate' ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, plan: 'ultimate' })}
                    role="button"
                    tabIndex="0"
                  >
                    <div className="plan-card-header">
                      <h3>Ultimate Pass</h3>
                      <div className="plan-badge best">Best Value</div>
                    </div>
                    <div className="plan-card-price">$33<span>/month</span></div>
                    <ul className="plan-card-features">
                      <li>Wheel Brite</li>
                      <li>Wash and Shine</li>
                      <li>Triple Foam</li>
                      <li>Clear Coat Sealant</li>
                      <li>Hand Dry</li>
                    </ul>
                    <Form.Check
                      type="radio"
                      id="plan-ultimate"
                      name="plan"
                      value="ultimate"
                      checked={formData.plan === 'ultimate'}
                      onChange={handleChange}
                      className="plan-card-radio"
                    />
                  </div>
                </Col>
              </Row>
              {errors.plan && <div className="text-danger small mt-2">{errors.plan}</div>}
            </Col>
          </Row>

          {/* Terms */}
          <div className="subscription-terms mb-4">
            <ul>
              <li>Winter months our hours are weather dependent. If it gets too cold, for the safety of your vehicle, we cannot wash your car (ice tends to dent, not wash).</li>
              <li>NOT for commercial users without prior okay.</li>
              <li>Prices subject to change yearly.</li>
              <li>This monthly pass is good for one vehicle only, the sticker needs to be stuck to your window.</li>
            </ul>
          </div>

          {/* Authorization */}
          <Form.Group className="mb-4" controlId="authorized">
            <Form.Check
              type="checkbox"
              name="authorized"
              label={<span>I authorize The Wash Zone to process this monthly pass request <span className="text-danger">(required)</span>.</span>}
              checked={formData.authorized}
              onChange={handleChange}
              isInvalid={!!errors.authorized}
            />
            {errors.authorized && <div className="text-danger small mt-2">{errors.authorized}</div>}
          </Form.Group>

          {/* Print Name */}
          <Form.Group className="mb-4" controlId="printName">
            <Form.Label>Print Name</Form.Label>
            <Form.Control
              type="text"
              name="printName"
              placeholder="Print your full name"
              value={formData.printName}
              onChange={handleChange}
              isInvalid={!!errors.printName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.printName}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="subscription-submit-btn"
          >
            Proceed to Payment
          </Button>

          {submitStatus !== 'idle' && (
            <p className={`status-text mt-3 ${submitStatus}`}>{statusMessage}</p>
          )}
          <div className="subscription-contact-cta">
            <p>
              Please <Link to="/contact-us" className="subscription-contact-link">contact us</Link> or visit our <Link to="/frequently-asked" className="subscription-contact-link">frequently asked questions</Link> for more info.
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default MonthlySubscriptionPage;