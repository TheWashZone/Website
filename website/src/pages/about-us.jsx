import '../css/about-us.css';

function AboutPage() {
  // ===== EDIT YOUR CONTENT BELOW =====
  
  // Hero Section
  const heroTitle = "About Our Car Wash";
  const heroSubtitle = "Quality Service Since 2020";
  
  // Our Story Section
  const ourStoryTitle = "Our Story";
  const ourStoryText = "We started with a simple mission: to provide the best car wash experience in town. What began as a small family business has grown into a trusted name in automotive care. Our commitment to quality and customer satisfaction drives everything we do.";
  
  // Our Mission Section
  const ourMissionTitle = "Our Mission";
  const ourMissionText = "To deliver exceptional car wash services using eco-friendly products and state-of-the-art equipment, while treating every vehicle with the care it deserves.";
  
  // Why Choose Us Section
  const whyChooseUsTitle = "Why Choose Us?";
  const whyChooseUsItems = [
    {
      title: "Eco-Friendly Products",
      description: "We use biodegradable, environmentally safe cleaning solutions that are tough on dirt but gentle on your car and the planet."
    },
    {
      title: "Experienced Team",
      description: "Our trained professionals have years of experience and treat every vehicle with meticulous attention to detail."
    },
    {
      title: "Modern Equipment",
      description: "State-of-the-art washing systems ensure a thorough, scratch-free clean every time."
    },
    {
      title: "Customer Satisfaction",
      description: "Your satisfaction is our priority. We stand behind our work with a 100% satisfaction guarantee."
    }
  ];
  
  // Team Section (Optional - add team member photos later)
  const teamTitle = "Meet Our Team";
  const teamMembers = [
    { name: "John Doe", role: "Owner & Founder", bio: "Passionate about cars and customer service" },
    { name: "Jane Smith", role: "Operations Manager", bio: "Ensuring quality in every wash" },
    { name: "Mike Johnson", role: "Lead Technician", bio: "Expert in detailing and care" }
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

          {/* Team Section */}
          <section className="about-section team">
            <h2>{teamTitle}</h2>
            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <div key={index} className="team-member">
                  <div className="member-photo">
                    {/* Add team member photo here */}
                    <div className="photo-placeholder">Photo</div>
                  </div>
                  <h3>{member.name}</h3>
                  <p className="role">{member.role}</p>
                  <p className="bio">{member.bio}</p>
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