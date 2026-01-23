import banner from '../images/ChatGPT-Soapy-Pavement.png';
import '../css/contact-us.css';

function ContactPage() {
      return (
    <>
      <div className="container-fluid p-0 w-100 header-container">
        <img src={banner} className="header-img" alt="Responsive image" />
      </div>
      <div className="contact-us-format">
        <div className="colored">
          PHONE
        </div>
        <div className="colored2">
          EMAIL
        </div>
        <div className="colored">
          FACEBOOK
        </div>
        <div className="colored2">
          TEMP
        </div>
      </div>
    </>
  )
}

export default ContactPage