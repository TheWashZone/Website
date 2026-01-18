import location from '../images/temp-washzone-picture.jpg';
import banner from '../images/ChatGPT-Soapy-Pavement.png';
// import logo from '../images/TheWashZoneLogo.jpg';
import { Stack } from 'react-bootstrap';



import '../css/home-page.css';
// THIS PICTURE SHOULD BE REPLACED WHEN WE HAVE ANOTHER ONE


function HomePage() {
  return (
    <>
      <div className="container-fluid p-0 w-100 header-container">
        <img src={banner} className="header-img" alt="Responsive image" />
      </div>
      <div className="home-format">
        <div className="colored">
          <div className="title">
            The Wash Zone
          </div>
          <div className="subtitle">
            1907 E Isaacs Ave, Walla Walla, WA 99362
          </div>
        </div>
        <div className="colored2">
          <img src={location} alt="The Wash Zone Image" />
        </div>
        <div className="colored">
          <span className="subtitle">Memberships</span>
          <div className="memberships-container">
            <div className="boxed">
              <span className="membership-item">Deluxe</span>
              <p>askdlfasjdfkasjdflasdfklasdjk fldasfjaskdlfkajsdlfaksdflasjdklajsdflajfsaasd fasfdasfdasdfasdfasdfasdfasdfasdf asdfadsfasdfasdfasfasfd</p>
            </div>
            <div className="boxed">
              <span className="membership-item">Ultimate</span>
              <p>adkslfasjkfalksfljakdfalsfdjkalsfjasdfjkalfjklsfsdkjalfjkdalskfadjsjakfsdkjlf</p>
            </div>
            <div className="boxed">
              <span className="membership-item">Basic</span>
              <p>akldsfjkaslkfajsflksafksdljfklasfdjkasfdkjaslfksajklfdasjkflasfjdkalsfkads;a</p>
            </div>
          </div>
        </div>
        <div className="colored2">
          <span className="hours-parent">Hours of Operation</span>
          <Stack gap={3} className="hours-stack">
            <div className="hours">Sunday: 9:00 AM - 5:00 PM</div>
            <div className="hours">Monday: 7:30 AM - 7:00 PM</div>
            <div className="hours">Tuesday: 7:30 AM - 7:00 PM</div>
            <div className="hours">Wednesday: 7:30 AM - 7:00 PM</div>
            <div className="hours">Thursday: 7:30 AM - 7:00 PM</div>
            <div className="hours">Friday: 7:30 AM - 7:00 PM</div>
            <div className="hours">Saturday: 8:00 AM - 7:00 PM</div>
          </Stack>
        </div>
      </div>
    </>
  )
}

export default HomePage