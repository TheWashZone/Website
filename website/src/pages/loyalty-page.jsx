import React, { useState } from 'react';
import '../css/loyalty-page.css';

function LoyaltyPage() {

  // Loyalty data
  const [userData, setUserData] = useState({
    membershipType: 'Ultimate',
    memberSince: '2024-01-15',
    totalWashes: 7,
    washesUntilFree: 3,
    washesPerFree: 10
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...userData });

  // User ID protection
  const [enteredUserId, setEnteredUserId] = useState("");
  const correctUserId = "12345"; // later this comes from backend

  // Handle edit button click
  const handleEditClick = () => {
    const id = prompt("Enter your User ID to edit:");

    if (id === correctUserId) {
      setEnteredUserId(id);
      setIsEditing(true);
    } else {
      alert("Invalid User ID. Access denied.");
    }
  };

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Save
  const handleSave = () => {
    setUserData(formData);
    setIsEditing(false);
  };

  // Cancel
  const handleCancel = () => {
    setFormData({ ...userData });
    setIsEditing(false);
  };

  return (
    <div className="loyalty-layout">

      {/* HERO */}
      <section className="loyalty-hero">
        <h1>Loyalty Rewards</h1>
        <p>Track your washes and earn free rewards!</p>
      </section>

      {/* PROGRESS */}
      <section className="loyalty-progress">
        <h2>Your Wash Progress</h2>
        <p>
          {userData.washesUntilFree === 0 
            ? "Congratulations! You've earned a free wash!" 
            : `${userData.washesUntilFree} wash${userData.washesUntilFree !== 1 ? 'es' : ''} until your next free wash!`}
        </p>
      </section>

      {/* MEMBERSHIP */}
      <section className="loyalty-membership">

        <div className="membership-header">
          <h2>Your Membership Info</h2>

          {!isEditing && (
            <button
              className="edit-button"
              onClick={handleEditClick}
            >
              Edit Info
            </button>
          )}
        </div>

        {isEditing ? (

          <div className="edit-form">

            <div className="form-group">
              <label>Membership Type:</label>
              <select
                name="membershipType"
                value={formData.membershipType}
                onChange={handleInputChange}
              >
                <option value="Basic">Basic</option>
                <option value="Premium">Premium</option>
                <option value="Ultimate">Ultimate</option>
              </select>
            </div>

            <div className="form-group">
              <label>Member Since:</label>
              <input
                type="date"
                name="memberSince"
                value={formData.memberSince}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Total Washes:</label>
              <input
                type="number"
                name="totalWashes"
                value={formData.totalWashes}
                onChange={handleInputChange}
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Washes Until Free:</label>
              <input
                type="number"
                name="washesUntilFree"
                value={formData.washesUntilFree}
                onChange={handleInputChange}
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Washes Per Free Reward:</label>
              <input
                type="number"
                name="washesPerFree"
                value={formData.washesPerFree}
                onChange={handleInputChange}
                min="1"
              />
            </div>

            <div className="form-actions">
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
              <button className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
            </div>

          </div>

        ) : (

          <div className="loyalty-cards">

            <div className="loyalty-card">
              <h3>Membership Details</h3>
              <ul>
                <li><strong>Membership Type:</strong> {userData.membershipType}</li>
                <li><strong>Member Since:</strong> {new Date(userData.memberSince).toLocaleDateString()}</li>
                <li><strong>Total Washes:</strong> {userData.totalWashes}</li>
                <li><strong>Next Free Wash:</strong> After {userData.washesUntilFree} more wash{userData.washesUntilFree !== 1 ? 'es' : ''}</li>
              </ul>
            </div>

            <div className="loyalty-card">
              <h3>How It Works</h3>
              <ul>
                <li>Every wash counts toward rewards</li>
                <li>1 free wash for every {userData.washesPerFree} washes</li>
                <li>Show QR code at checkout</li>
                <li>Rewards never expire</li>
              </ul>
            </div>

          </div>

        )}

      </section>

      {/* QR */}
      <section className="loyalty-qr">
        <h2>Your Loyalty QR Code</h2>
        <p>Show this code at checkout to earn rewards</p>

        <div className="qr-box">
          <div className="qr-content">
            <div className="qr-user-info">
              <strong>ID:</strong> MEM-{userData.membershipType}-{userData.totalWashes}
            </div>
            <div className="qr-placeholder">
              [QR Code]
            </div>
          </div>
        </div>

        <p className="qr-note">
          QR code functionality will be implemented later
        </p>
      </section>

    </div>
  );
}

export default LoyaltyPage;