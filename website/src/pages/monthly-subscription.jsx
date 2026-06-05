import { useMemo, useRef, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import '../css/monthly-subscription.css';
import washZoneDesignLogo from '../images/The Wash ZONE logo design.png';

const EMPTY_FORM = {
  date: '',
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
  passNumber: '',
  cardType: '',
  cardNumber: '',
  cardExpiry: '',
  cardCVV: '',
  authorized: false,
  printName: ''
};

function MonthlySubscriptionPage() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [cardTypeOpen, setCardTypeOpen] = useState(false);
  const cardTypeRef = useRef(null);

  const CARD_TYPES = [
    { value: 'visa', label: 'Visa' },
    { value: 'mastercard', label: 'Mastercard' },
    { value: 'discover', label: 'Discover' },
  ];

  const handleCardTypeSelect = (value) => {
    setFormData(prev => ({ ...prev, cardType: value }));
    setCardTypeOpen(false);
  };

  const handleCardTypeBlur = (e) => {
    if (cardTypeRef.current && !cardTypeRef.current.contains(e.relatedTarget)) {
      setCardTypeOpen(false);
    }
  };
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const checkoutUrl = useMemo(
    () => import.meta.env.VITE_CLOVER_SUBSCRIPTION_CHECKOUT_URL || '',
    []
  );

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = 'Name is required.';
    if (!formData.email.trim()) nextErrors.email = 'Email is required.';
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (!formData.phone.trim()) nextErrors.phone = 'Phone is required.';
    if (!formData.vehicleMake.trim()) nextErrors.vehicleMake = 'Vehicle make is required.';
    if (!formData.vehicleModel.trim()) nextErrors.vehicleModel = 'Vehicle model is required.';
    if (!formData.plan) nextErrors.plan = 'Please select a plan.';
    if (!formData.authorized) nextErrors.authorized = 'Authorization is required.';
    if (!formData.printName.trim()) nextErrors.printName = 'Print name is required.';

    return nextErrors;
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitStatus('idle');
    setStatusMessage('');

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    const car = [
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
      status: 'pending_payment'
    };

    try {
      const existing = JSON.parse(localStorage.getItem('monthlySubscriptionLeads') || '[]');
      localStorage.setItem('monthlySubscriptionLeads', JSON.stringify([...existing, submission]));

      setSubmitStatus('success');
      setStatusMessage('Form saved. Proceeding to payment...');

      if (checkoutUrl) {
        window.open(checkoutUrl, '_blank', 'noopener,noreferrer');
      } else {
        setStatusMessage('Form saved. Add VITE_CLOVER_SUBSCRIPTION_CHECKOUT_URL in your .env to enable payment redirect.');
      }
    } catch {
      setSubmitStatus('error');
      setStatusMessage('Unable to save your form right now. Please try again.');
    }
  };

  return (
    <div className="subscription-wrapper">
      <div className="subscription-form-container">
        <div className="subscription-header">
          <h2 className="subscription-title">Monthly Pass Registration Form</h2>
          <img className="subscription-logo" src={washZoneDesignLogo} alt="The Wash Zone logo" />
        </div>
        <div className="subscription-business-info">
          <span>📍 1907 E Isaacs Ave, Walla Walla, WA 99362</span>
          <span>📞 (509) 876-2455</span>
        </div>

        <Form className="subscription-form" onSubmit={handleSubmit} noValidate>
          {/* Date + Vehicle */}
          <Row className="mb-3">
            <Col md={3}>
              <Form.Group controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={9}>
              <Form.Label>Vehicle (make, model, color)</Form.Label>
              <Row className="g-2">
                <Col xs={4}>
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
                <Col xs={4}>
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
                <Col xs={4}>
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

          {/* Plan Selection + Pass Number */}
          <Row className="mb-4 subscription-plan-row">
            <Col lg={8} className="subscription-plans-col">
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
            <Col lg={4} className="subscription-pass-col">
              <Form.Group controlId="passNumber" className="pass-number-group">
                <Form.Label>Pass Number Assigned</Form.Label>
                <Form.Control
                  type="text"
                  name="passNumber"
                  placeholder="Staff fills in"
                  value={formData.passNumber}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Credit Card Info */}
          <div className="subscription-section-label">Credit Card Information</div>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="cardType">
                <Form.Label>Card Type</Form.Label>
                <div
                  className="card-type-dropdown"
                  ref={cardTypeRef}
                  onBlur={handleCardTypeBlur}
                >
                  <button
                    type="button"
                    className={`card-type-trigger ${cardTypeOpen ? 'open' : ''}`}
                    onClick={() => setCardTypeOpen(o => !o)}
                  >
                    {formData.cardType
                      ? CARD_TYPES.find(c => c.value === formData.cardType)?.label
                      : 'Choose card type'}
                    <span className="card-type-arrow">{cardTypeOpen ? '▲' : '▼'}</span>
                  </button>
                  {cardTypeOpen && (
                    <ul className="card-type-options">
                      {CARD_TYPES.map(ct => (
                        <li
                          key={ct.value}
                          className={`card-type-option ${formData.cardType === ct.value ? 'selected' : ''}`}
                          onClick={() => handleCardTypeSelect(ct.value)}
                          tabIndex={0}
                          onKeyDown={e => e.key === 'Enter' && handleCardTypeSelect(ct.value)}
                        >
                          {ct.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Form.Group>
            </Col>
            <Col md={8}>
              <Form.Group controlId="cardNumber">
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                  type="text"
                  name="cardNumber"
                  placeholder="XXXX XXXX XXXX XXXX"
                  maxLength={19}
                  value={formData.cardNumber}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={6}>
              <Form.Group controlId="cardExpiry">
                <Form.Label>Expiration Date</Form.Label>
                <Form.Control
                  type="text"
                  name="cardExpiry"
                  placeholder="MM/YY"
                  maxLength={5}
                  value={formData.cardExpiry}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="cardCVV">
                <Form.Label>CVV</Form.Label>
                <Form.Control
                  type="text"
                  name="cardCVV"
                  placeholder="CVV"
                  maxLength={4}
                  value={formData.cardCVV}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Terms */}
          <div className="subscription-terms mb-4">
            <ul>
              <li>Winter months our hours are weather dependent. If it gets too cold, for the safety of your vehicle, we cannot wash your car (ice tends to dent, not wash).</li>
              <li>If your credit card on account has expired, your monthly pass will not be honored until a payment has been received.</li>
              <li>NOT for commercial users without prior okay.</li>
              <li>Prices subject to change yearly.</li>
              <li>Credit cards will be charged on the <strong>last day of the month</strong> for the following month.</li>
              <li>This monthly pass is good for one vehicle only, the sticker needs to be stuck to your window.</li>
            </ul>
          </div>

          {/* Authorization */}
          <Form.Group className="mb-4" controlId="authorized">
            <Form.Check
              type="checkbox"
              name="authorized"
              label={<span>I authorize The Wash Zone to charge the above credit card monthly <span className="text-danger">(required)</span>.</span>}
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
        </Form>
      </div>
    </div>
  );
}

export default MonthlySubscriptionPage;