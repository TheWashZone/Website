import { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import '../css/monthly-subscription.css';
import { Link } from 'react-router-dom';

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

function MonthlySubscriptionPage() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const isTwoWordName = (value) => value.trim().split(/\s+/).filter(Boolean).length >= 2;
  const isNumericOnly = (value) => /^\d+$/.test(value.replace(/\s/g, ''));
  const isAlphanumeric = (value) => /^[a-zA-Z0-9\s,.\-#]+$/.test(value.trim());
  const hasNoNumbers = (value) => !/\d/.test(value);

  const VALID_STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

  const validate = () => {
    const nextErrors = {};
    const currentYear = new Date().getFullYear();

    // Vehicle year — required, numeric, logical range
    if (!formData.vehicleYear.trim()) {
      nextErrors.vehicleYear = 'Year is required.';
    } else if (!isNumericOnly(formData.vehicleYear)) {
      nextErrors.vehicleYear = 'Year must be numeric.';
    } else if (Number(formData.vehicleYear) < 1900 || Number(formData.vehicleYear) > currentYear + 1) {
      nextErrors.vehicleYear = `Year must be between 1900 and ${currentYear + 1}.`;
    }

    if (!formData.vehicleMake.trim()) nextErrors.vehicleMake = 'Make is required.';
    if (!formData.vehicleModel.trim()) nextErrors.vehicleModel = 'Model is required.';
    if (!formData.vehicleColor.trim()) nextErrors.vehicleColor = 'Color is required.';

    // Name — required, at least two words, no numbers
    if (!formData.name.trim()) {
      nextErrors.name = 'Name is required.';
    } else if (!hasNoNumbers(formData.name)) {
      nextErrors.name = 'Name cannot contain numbers.';
    } else if (!isTwoWordName(formData.name)) {
      nextErrors.name = 'Please enter your first and last name.';
    }

    // Contact person — only required if different from name, no numbers if filled
    const contactIsSameAsName =
      formData.contactPerson.trim().toLowerCase() === formData.name.trim().toLowerCase() ||
      formData.contactPerson.trim() === '';
    if (!contactIsSameAsName && formData.contactPerson.trim()) {
      if (!hasNoNumbers(formData.contactPerson)) {
        nextErrors.contactPerson = 'Contact person name cannot contain numbers.';
      }
    }

    // Street address — required, alphanumeric
    if (!formData.streetAddress.trim()) {
      nextErrors.streetAddress = 'Street address is required.';
    } else if (!isAlphanumeric(formData.streetAddress)) {
      nextErrors.streetAddress = 'Street address contains invalid characters.';
    }

    // City — required, no numbers
    if (!formData.city.trim()) {
      nextErrors.city = 'City is required.';
    } else if (!hasNoNumbers(formData.city)) {
      nextErrors.city = 'City cannot contain numbers.';
    }

    // State — required, valid 2-letter US abbreviation
    if (!formData.state.trim()) {
      nextErrors.state = 'State is required.';
    } else if (!VALID_STATES.includes(formData.state.trim().toUpperCase())) {
      nextErrors.state = 'Enter a valid 2-letter state (e.g. WA).';
    }

    // Zip code — required, numeric, exactly 5 digits
    if (!formData.zipCode.trim()) {
      nextErrors.zipCode = 'Zip code is required.';
    } else if (!isNumericOnly(formData.zipCode)) {
      nextErrors.zipCode = 'Zip code must be numeric.';
    } else if (formData.zipCode.replace(/\D/g, '').length !== 5) {
      nextErrors.zipCode = 'Zip code must be 5 digits.';
    }

    // Phone — required, 10 digits, not obviously fake
    if (!formData.phone.trim()) {
      nextErrors.phone = 'Phone is required.';
    } else {
      const digits = formData.phone.replace(/\D/g, '');
      if (digits.length !== 10) {
        nextErrors.phone = 'Enter a valid 10-digit phone number.';
      } else if (digits === '0000000000' || digits === '1234567890') {
        nextErrors.phone = 'Enter a valid phone number.';
      }
    }

    // Email — required, valid format
    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!formData.plan) nextErrors.plan = 'Please select a plan.';
    if (!formData.authorized) nextErrors.authorized = 'Authorization is required.';

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
    setStatusMessage('');

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitStatus('error');
      setStatusMessage('Some fields are missing.');
      return;
    }

    setSubmitStatus('success');
    setStatusMessage('Form is ready to print.');

    window.print();
  };

  return (
    <div className="subscription-wrapper">

      {/* Hero */}
      <section className="subscription-hero">
        <h1>Monthly Pass Registration</h1>
        <p className="subtitle">Sign up for unlimited washes — pick your plan and get started today.</p>
      </section>

      <div className="subscription-header">
        <h2 className="subscription-title">Registration Form</h2>
      </div>

      <div className="subscription-form-container">
        <Form className="subscription-form" onSubmit={handleSubmit} noValidate>

          {/* Vehicle */}
          <Row className="mb-3 g-2">
            <Col xs={3}>
              <Form.Label>Year</Form.Label>
              <Form.Control type="text" name="vehicleYear" placeholder="Year" value={formData.vehicleYear} onChange={handleChange} isInvalid={!!errors.vehicleYear} />
              <Form.Control.Feedback type="invalid">{errors.vehicleYear}</Form.Control.Feedback>
            </Col>
            <Col xs={3}>
              <Form.Label>Make</Form.Label>
              <Form.Control type="text" name="vehicleMake" placeholder="Make" value={formData.vehicleMake} onChange={handleChange} isInvalid={!!errors.vehicleMake} />
              <Form.Control.Feedback type="invalid">{errors.vehicleMake}</Form.Control.Feedback>
            </Col>
            <Col xs={3}>
              <Form.Label>Model</Form.Label>
              <Form.Control type="text" name="vehicleModel" placeholder="Model" value={formData.vehicleModel} onChange={handleChange} isInvalid={!!errors.vehicleModel} />
              <Form.Control.Feedback type="invalid">{errors.vehicleModel}</Form.Control.Feedback>
            </Col>
            <Col xs={3}>
              <Form.Label>Color</Form.Label>
              <Form.Control type="text" name="vehicleColor" placeholder="Color" value={formData.vehicleColor} onChange={handleChange} isInvalid={!!errors.vehicleColor} />
              <Form.Control.Feedback type="invalid">{errors.vehicleColor}</Form.Control.Feedback>
            </Col>
          </Row>

          {/* Name + Contact Person */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" placeholder="Full name" value={formData.name} onChange={handleChange} isInvalid={!!errors.name} />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="contactPerson">
                <Form.Label>Contact Person <span className="text-muted">(if different)</span></Form.Label>
                <Form.Control type="text" name="contactPerson" placeholder="Contact person" value={formData.contactPerson} onChange={handleChange} isInvalid={!!errors.contactPerson} />
                <Form.Control.Feedback type="invalid">{errors.contactPerson}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Street Address */}
          <Form.Group className="mb-3" controlId="streetAddress">
            <Form.Label>Street Address</Form.Label>
            <Form.Control type="text" name="streetAddress" placeholder="Street address" value={formData.streetAddress} onChange={handleChange} isInvalid={!!errors.streetAddress} />
            <Form.Control.Feedback type="invalid">{errors.streetAddress}</Form.Control.Feedback>
          </Form.Group>

          {/* City, State, Zip */}
          <Row className="mb-3">
            <Col md={5}>
              <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} isInvalid={!!errors.city} />
                <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Control type="text" name="state" placeholder="WA" value={formData.state} onChange={handleChange} isInvalid={!!errors.state} />
                <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="zipCode">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control type="text" name="zipCode" placeholder="Zip code" value={formData.zipCode} onChange={handleChange} isInvalid={!!errors.zipCode} />
                <Form.Control.Feedback type="invalid">{errors.zipCode}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Phone + Email */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="tel" name="phone" placeholder="(509) 555-5555" value={formData.phone} onChange={handleChange} isInvalid={!!errors.phone} />
                <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="email">
                <Form.Label>Email <span className="text-muted">(for monthly receipt)</span></Form.Label>
                <Form.Control type="email" name="email" placeholder="email@example.com" value={formData.email} onChange={handleChange} isInvalid={!!errors.email} />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Plan Selection */}
          <Row className="mb-4 subscription-plan-row">
            <Col lg={12} className="subscription-plans-col">
              <Form.Label className="d-block fw-bold mb-3" style={{ fontSize: '1.1rem' }}>Select Your Plan</Form.Label>
              <Row className="g-3 subscription-plan-grid">
                <Col md={6}>
                  <div className={`plan-card ${formData.plan === 'deluxe' ? 'active' : ''}`} onClick={() => setFormData({ ...formData, plan: 'deluxe' })} role="button" tabIndex="0">
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
                    <Form.Check type="radio" id="plan-deluxe" name="plan" value="deluxe" checked={formData.plan === 'deluxe'} onChange={handleChange} className="plan-card-radio" />
                  </div>
                </Col>
                <Col md={6}>
                  <div className={`plan-card ${formData.plan === 'ultimate' ? 'active' : ''}`} onClick={() => setFormData({ ...formData, plan: 'ultimate' })} role="button" tabIndex="0">
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
                    <Form.Check type="radio" id="plan-ultimate" name="plan" value="ultimate" checked={formData.plan === 'ultimate'} onChange={handleChange} className="plan-card-radio" />
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
            <div className="subscription-check-row">
              <input
                className="subscription-check-input"
                type="checkbox"
                name="authorized"
                id="authorized"
                checked={formData.authorized}
                onChange={handleChange}
              />
              <label className="subscription-check-label" htmlFor="authorized">
                I authorize The Wash Zone to process this monthly pass request <span className="text-danger">(required)</span>.
              </label>
            </div>
            {errors.authorized && <div className="text-danger small mt-2">{errors.authorized}</div>}
          </Form.Group>

          <button className="subscription-submit-btn" type="submit">
            Print Form
          </button>

          {submitStatus !== 'idle' && (
            <p className={`status-text mt-3 ${submitStatus}`}>{statusMessage}</p>
          )}
        </Form>
      </div>

      {/* Contact footer */}
      <footer className="subscription-contact-cta">
        <div className="subscription-contact-inner">
          <p>Still have questions? Stop by or give us a call.</p>
          <Link to="/contact-us" className="subscription-contact-btn">Contact Us</Link>
        </div>
      </footer>

    </div>
  );
}

export default MonthlySubscriptionPage;
