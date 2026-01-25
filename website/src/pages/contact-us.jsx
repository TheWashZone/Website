import banner from '../images/ChatGPT-Soapy-Pavement.png';
import '../css/contact-us.css';

function ContactPage() {
  return (
    <>
      <div className="container-fluid p-0 w-100 header-container">
        <img src={banner} className="header-img" alt="Responsive image" />
      </div>
      <div className="contact-us-format">
        <div className="contact-us-info">
          <div className="contact-us-title">
            Contact Us
          </div>
          <div className="contact-us-item">
            Call us at: 509 876-2455
          </div>
          <div className="contact-us-item">
            Check us out on Facebook at: 
            <a href="https://www.facebook.com/profile.php?id=100054247250715"> The Wash Zone</a>
          </div>
          <div className="contact-us-item">
            Come visit us at: 1907 E Isaacs Ave, Walla Walla, WA, United States
          </div>
        </div>
        <div className="contact-us-map">
            <iframe
              className="map-iframe"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2767.7819724094707!2d-118.31014722336138!3d46.075388392451764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54a26abd646555c9%3A0x54c1a9e47be221e6!2s1907%20E%20Isaacs%20Ave%2C%20Walla%20Walla%2C%20WA%2099362!5e0!3m2!1sen!2sus!4v1769306670559!5m2!1sen!2sus" 
              style={{border: 0}} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
        </div>
      </div>
    </>
  )
}

export default ContactPage