import { Stack } from 'react-bootstrap';
//import '../css/loyalty-page.css';
// import loyaltyBanner from '../images/loyalty-banner.jpg'; // You'll add this

function LoyaltyPage() {
  // Mock user data - replace with actual user data from context/props
  const userPoints = 1250;
  const userTier = userPoints >= 2000 ? 'Platinum' : userPoints >= 1000 ? 'Gold' : 'Silver';
  
  // Calculate next tier progress
  const nextTierPoints = userTier === 'Silver' ? 1000 : userTier === 'Gold' ? 2000 : null;
  const pointsToNextTier = nextTierPoints ? nextTierPoints - userPoints : null;
  const progressPercentage = userTier === 'Silver' ? (userPoints / 1000) * 100 : 
                           userTier === 'Gold' ? ((userPoints - 1000) / 1000) * 100 : 100;
  
  return (
    <>
      {/* Header Banner - Matches HomePage style */}
      <div className="container-fluid p-0 w-100 header-container">
        {/* Replace with your orange-themed loyalty banner */}
        <div style={{ 
          height: '300px', 
          background: 'linear-gradient(135deg, #b85e1e, #9a4a18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '48px',
          fontWeight: 'bold',
          textShadow: '0 4px 8px rgba(0,0,0,0.3)',
          borderBottom: '4px solid #ff9f4b'
        }}>
          🚗 Wash Zone Rewards
        </div>
      </div>
      
      <div className="loyalty-format">
        {/* Loyalty Hero Section */}
        <div className="colored">
          <div className="title" style={{ color: '#ff9f4b' }}>
            The Wash Zone Rewards
          </div>
          <div className="subtitle" style={{ color: '#fbe1ce' }}>
            Earn points on every wash • Redeem for free services
          </div>
        </div>

        {/* User Points Dashboard */}
        <div className="colored2">
          <div className="points-dashboard">
            <div className="points-circle">
              <span className="points-number">{userPoints}</span>
              <span className="points-label">Points</span>
            </div>
            <div className="tier-info">
              <div className="tier-badge">
                {userTier} Member {userTier === 'Gold' ? '⭐' : userTier === 'Platinum' ? '👑' : '✨'}
              </div>
              {pointsToNextTier && (
                <div className="next-tier">
                  {pointsToNextTier} points to {userTier === 'Silver' ? 'Gold' : 'Platinum'}
                </div>
              )}
            </div>
            <button className="cta-button">Redeem Your Points</button>
          </div>
        </div>

        {/* How to Earn Points */}
        <div className="colored">
          <div className="membership-section-title">Earn Points</div>
          <div className="earn-grid">
            <div className="earn-item boxed">
              <div className="earn-icon">🚘</div>
              <div className="earn-title">Basic Wash</div>
              <div className="earn-points">50 pts</div>
              <p className="earn-description">Per single wash</p>
            </div>
            <div className="earn-item boxed">
              <div className="earn-icon">✨</div>
              <div className="earn-title">Deluxe Wash</div>
              <div className="earn-points">100 pts</div>
              <p className="earn-description">Per single wash</p>
            </div>
            <div className="earn-item boxed">
              <div className="earn-icon">⭐</div>
              <div className="earn-title">Ultimate Wash</div>
              <div className="earn-points">150 pts</div>
              <p className="earn-description">Per single wash</p>
            </div>
            <div className="earn-item boxed">
              <div className="earn-icon">💳</div>
              <div className="earn-title">Monthly Membership</div>
              <div className="earn-points">200 pts</div>
              <p className="earn-description">Monthly bonus</p>
            </div>
            <div className="earn-item boxed">
              <div className="earn-icon">📱</div>
              <div className="earn-title">Check-in</div>
              <div className="earn-points">10 pts</div>
              <p className="earn-description">Daily app check-in</p>
            </div>
            <div className="earn-item boxed">
              <div className="earn-icon">🎂</div>
              <div className="earn-title">Birthday Bonus</div>
              <div className="earn-points">250 pts</div>
              <p className="earn-description">Annual reward</p>
            </div>
          </div>
        </div>

        {/* Rewards Catalog */}
        <div className="colored2">
          <div className="membership-section-title">Redeem Rewards</div>
          <div className="rewards-container">
            <div className="boxed reward-item" data-testid="reward1">
              <div className="reward-title">Free Basic Wash</div>
              <div className="reward-points">500 points</div>
              <ul>
                <li className="left-align">✓ Exterior wash</li>
                <li className="left-align">✓ Wheel cleaning</li>
                <li className="left-align">✓ Air dry</li>
              </ul>
              <button className="reward-button">Redeem Now</button>
            </div>
            
            <div className="boxed reward-item" data-testid="reward2">
              <div className="reward-title">Free Deluxe Wash</div>
              <div className="reward-points">1,000 points</div>
              <ul>
                <li className="left-align">✓ Everything in Basic</li>
                <li className="left-align">✓ Wax application</li>
                <li className="left-align">✓ Wheel Brite</li>
                <li className="left-align">✓ Floor mat cleaning</li>
              </ul>
              <button className="reward-button">Redeem Now</button>
            </div>
            
            <div className="boxed reward-item" data-testid="reward3">
              <div className="reward-title">Free Ultimate Wash</div>
              <div className="reward-points">1,500 points</div>
              <ul>
                <li className="left-align">✓ Everything in Deluxe</li>
                <li className="left-align">✓ Premium wax</li>
                <li className="left-align">✓ Undercarriage wash</li>
                <li className="left-align">✓ Tire shine</li>
                <li className="left-align">✓ Hand dry</li>
              </ul>
              <button className="reward-button">Redeem Now</button>
            </div>
            
            <div className="boxed reward-item" data-testid="reward4">
              <div className="reward-title">$5 Off Membership</div>
              <div className="reward-points">2,000 points</div>
              <ul>
                <li className="left-align">✓ Save on monthly membership</li>
                <li className="left-align">✓ Valid for 1 month</li>
                <li className="left-align">✓ Can be combined</li>
              </ul>
              <button className="reward-button">Redeem Now</button>
            </div>
            
            <div className="boxed reward-item" data-testid="reward5">
              <div className="reward-title">Free Add-Ons</div>
              <div className="reward-points">300 points</div>
              <ul>
                <li className="left-align">✓ Choose any add-on</li>
                <li className="left-align">✓ Tire shine</li>
                <li className="left-align">✓ Rain repellent</li>
              </ul>
              <button className="reward-button">Redeem Now</button>
            </div>
            
            <div className="boxed reward-item" data-testid="reward6">
              <div className="reward-title">VIP Express Lane</div>
              <div className="reward-points">2,500 points</div>
              <ul>
                <li className="left-align">✓ Skip the line</li>
                <li className="left-align">✓ Priority service</li>
                <li className="left-align">✓ 3 months access</li>
              </ul>
              <button className="reward-button">Redeem Now</button>
            </div>
          </div>
        </div>

        {/* Membership Tiers */}
        <div className="colored">
          <div className="membership-section-title">Membership Tiers</div>
          <div className="membership-bonus">
            <div className="boxed bonus-item">
              <div className="bonus-title">Silver</div>
              <div className="bonus-points">0-999 points</div>
              <ul>
                <li className="left-align">✦ 1 point per $1 spent</li>
                <li className="left-align">✦ Birthday reward</li>
                <li className="left-align">✦ Monthly newsletter</li>
              </ul>
            </div>
            <div className="boxed bonus-item">
              <div className="bonus-title">Gold</div>
              <div className="bonus-points">1,000-1,999 points</div>
              <ul>
                <li className="left-align">✦ 1.5x points multiplier</li>
                <li className="left-align">✦ Birthday bonus (+50 pts)</li>
                <li className="left-align">✦ Early access to sales</li>
                <li className="left-align">✦ Free tire shine monthly</li>
              </ul>
            </div>
            <div className="boxed bonus-item">
              <div className="bonus-title">Platinum</div>
              <div className="bonus-points">2,000+ points</div>
              <ul>
                <li className="left-align">✦ 2x points multiplier</li>
                <li className="left-align">✦ Free add-ons every wash</li>
                <li className="left-align">✦ VIP customer support</li>
                <li className="left-align">✦ Exclusive events</li>
                <li className="left-align">✦ Annual detailing discount</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="colored2">
          <span className="hours-parent" style={{ color: '#ff9f4b', fontSize: '28px' }}>
            Recent Activity
          </span>
          <Stack gap={2} className="activity-stack" data-testid="activity-box">
            <div className="activity-item">
              <span className="activity-date">Today</span>
              <span className="activity-desc">Ultimate Wash + Membership Bonus</span>
              <span className="activity-points" style={{ color: '#4caf50' }}>+350 pts</span>
            </div>
            <div className="activity-item">
              <span className="activity-date">Yesterday</span>
              <span className="activity-desc">Deluxe Wash</span>
              <span className="activity-points" style={{ color: '#4caf50' }}>+100 pts</span>
            </div>
            <div className="activity-item">
              <span className="activity-date">3 days ago</span>
              <span className="activity-desc">Redeemed Free Wash</span>
              <span className="activity-points" style={{ color: '#ff6b6b' }}>-500 pts</span>
            </div>
            <div className="activity-item">
              <span className="activity-date">1 week ago</span>
              <span className="activity-desc">Gold Tier Achievement</span>
              <span className="activity-points" style={{ color: '#4caf50' }}>+100 pts</span>
            </div>
            <div className="activity-item">
              <span className="activity-date">2 weeks ago</span>
              <span className="activity-desc">App Check-in Bonus</span>
              <span className="activity-points" style={{ color: '#4caf50' }}>+10 pts</span>
            </div>
          </Stack>
        </div>
      </div>
    </>
  );
}

export default LoyaltyPage;