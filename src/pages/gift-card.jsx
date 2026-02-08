import banner from '../images/ChatGPT-Soapy-Pavement.png';
import giftCardImage from '../images/gift-card.png';
import { useState } from 'react';
import '../css/gift-card.css';

function GiftCardPage() {
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  
  const giftCardAmounts = [25, 50, 75, 100];
  
  const handlePurchase = () => {
    alert(`Purchase initiated: $${selectedAmount} gift card for ${recipientName}`);
  };
  
  return (
    <>
      <div className="container-fluid p-0 w-100 header-container">
        <img src={banner} className="header-img" alt="banner image" />
      </div>
      
      <div className="gift-card-format">
        <div className="gift-card-colored">
          <div className="gift-card-title">Gift Cards</div>
          <div className="gift-card-subtitle">The Perfect Gift for Any Car</div>
          
          <div className="gift-card-section-title">Select Amount</div>
          <div className="amount-container">
            {giftCardAmounts.map((amount) => (
              <div 
                key={amount}
                className={`gift-card-boxed amount-item ${selectedAmount === amount ? 'selected' : ''}`}
                onClick={() => setSelectedAmount(amount)}
              >
                <div className="amount-title">Gift Card</div>
                <div className="amount-price">${amount}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="gift-card-colored2">
          <img src={giftCardImage} className="gift-card-img" alt="Gift Card" />
          
          <div className="gift-card-form">
            <div className="form-group">
              <label className="form-label">Recipient Name</label>
              <input
                type="text"
                className="form-input"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Recipient's name"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Recipient Email</label>
              <input
                type="email"
                className="form-input"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                placeholder="Recipient's email"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input
                type="text"
                className="form-input"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Your name"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Personal Message (Optional)</label>
              <textarea
                className="form-input"
                rows="3"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Add a message..."
              />
            </div>
            
            <div className="gift-card-boxed" style={{marginBottom: '10px'}}>
              <div style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '5px'}}>Order Summary</div>
              <div style={{fontSize: '20px'}}>Gift Card: <strong>${selectedAmount}</strong></div>
              <div style={{fontSize: '20px'}}>Fee: <strong>$0.00</strong></div>
              <div style={{fontSize: '28px', fontWeight: 'bold', marginTop: '10px', borderTop: '2px solid #000', paddingTop: '5px'}}>
                Total: <strong>${selectedAmount}.00</strong>
              </div>
            </div>
            
            <button 
              className="purchase-button"
              onClick={handlePurchase}
              disabled={!recipientName || !recipientEmail || !senderName}
            >
              Purchase Gift Card - ${selectedAmount}.00
            </button>
          </div>
        </div>
        
        <div className="gift-card-colored">
          <div className="gift-card-section-title">Benefits</div>
          <div className="benefits-list">
            <ul style={{paddingLeft: '20px', margin: '0'}}>
              <li className="left-align"><strong>Flexible:</strong> Use for any service or membership</li>
              <li className="left-align"><strong>No Expiration:</strong> Gift cards never expire</li>
              <li className="left-align"><strong>Easy to Use:</strong> Redeem in person or online</li>
              <li className="left-align"><strong>Check Balance:</strong> Anytime online or at location</li>
              <li className="left-align"><strong>Perfect Gift:</strong> Birthdays, holidays, thank yous</li>
              <li className="left-align"><strong>Instant Email Delivery</strong></li>
            </ul>
          </div>
          
          <div className="gift-card-section-title">How to Redeem</div>
          <div className="gift-card-details">
            <ul style={{paddingLeft: '20px', margin: '0'}}>
              <li className="left-align"><strong>In Person:</strong> Bring gift card to our location</li>
              <li className="left-align"><strong>Online:</strong> Enter code at checkout</li>
              <li className="left-align"><strong>Phone:</strong> Call (555) 123-4567</li>
            </ul>
          </div>
          
          <div className="gift-card-disclaimer">
            *Gift cards are non-refundable. Cannot be redeemed for cash.
          </div>
        </div>
      </div>
    </>
  )
}

export default GiftCardPage;