import '../css/about-us.css';

function AboutPage() {
  // ===== EDIT YOUR CONTENT BELOW =====
  
  // Hero Section
  const heroTitle = "About Our Car Wash";
  const heroSubtitle = "Quality Service Since 1970";
  
  // Our Story Section
  const ourStoryTitle = "Our Story";
  const ourStoryText = "We started with a simple mission: to provide the best car wash experience in town. What began as a small local family business has grown into a trusted name in automotive care. Our commitment to quality and customer satisfaction drives everything we do.";
  
  // Our Mission Section
  const ourMissionTitle = "Our Mission";
  const ourMissionText = "To deliver exceptional car wash services to every one of our customers, treating every vehicle with the care it deserves.";
  
  // Why Choose Us Section
  const whyChooseUsTitle = "Why Choose Us?";
  const whyChooseUsItems = [
    {
      title: "Membership plan",
      description: "If you enjoy having a clean car all the time, our flexible and affordable memebership plans are perfect for you."
    },
    {
      title: "Experienced Team",
      description: "Our employees have been trained to treat your vehicle with the utmost care and attention to detail."
    },
    {
      title: "Modern Equipment",
      description: "Our washing systems ensure a thorough, scratch-free clean every time that will help protect your car."
    },
    {
      title: "Customer Satisfaction",
      description: "Your satisfaction is our priority. We stand behind our work with a 100% satisfaction guarantee."
    }
  ];
    
  // ===== END EDITABLE CONTENT =====

  return (
    <>
      <div className="about-page">
        {/* Hero Section */}
        <div className="about-hero">
          <h1>{heroTitle}</h1>
          <p className="subtitle">{heroSubtitle}</p>
        </div>

        {/* Main Content */}
        <div className="about-content">
          {/* Our Story */}
          <section className="about-section">
            <h2>{ourStoryTitle}</h2>
            <p>{ourStoryText}</p>
          </section>

          {/* Our Mission */}
          <section className="about-section mission">
            <h2>{ourMissionTitle}</h2>
            <p className="mission-text">{ourMissionText}</p>
          </section>

          {/* Why Choose Us */}
          <section className="about-section why-choose">
            <h2>{whyChooseUsTitle}</h2>
            <div className="features-grid">
              {whyChooseUsItems.map((item, index) => (
                <div key={index} className="feature-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default AboutPage;