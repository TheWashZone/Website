import { useState } from 'react';
import '../css/faq.css';

function FrequentlyAskedPage() {
  // ===== EDIT YOUR CONTENT BELOW =====
  
  const pageTitle = "Frequently Asked Questions";
  const pageSubtitle = "Everything you need to know about our car wash services";
  
  const faqData = [
    {
      category: "Services & Pricing",
      questions: [
        {
          question: "What types of car wash services do you offer?",
          answer: "We offer a variety of services including Basic Wash, Deluxe Wash, Premium Wash, Full Detailing, Interior Cleaning, Waxing, and Express Wash. Each package is designed to meet different needs and budgets."
        },
        {
          question: "How much does a car wash cost?",
          answer: "Our prices range from $15 for a Basic Wash to $150 for Complete Detailing. We also offer monthly membership plans with unlimited washes starting at $29.99/month. Check our services page for detailed pricing."
        },
        {
          question: "Do you offer any discounts or membership plans?",
          answer: "Yes! We offer monthly unlimited wash memberships, multi-wash packages, and special discounts for seniors, students, and military personnel. Ask our team about current promotions."
        },
        {
          question: "How long does a car wash take?",
          answer: "An Express Wash takes about 10-15 minutes, while our Full Detailing service can take 2-4 hours depending on your vehicle's condition. We'll provide an estimated time when you arrive."
        }
      ]
    },
    {
      category: "Scheduling & Availability",
      questions: [
        {
          question: "Do I need an appointment?",
          answer: "No appointment is necessary for our express wash services. However, we recommend booking in advance for detailing services to ensure availability and minimize wait times."
        },
        {
          question: "What are your hours of operation?",
          answer: "We're open Monday through Saturday from 8:00 AM to 7:00 PM, and Sunday from 9:00 AM to 5:00 PM. Holiday hours may vary."
        },
        {
          question: "Are you open during bad weather?",
          answer: "Yes, we're open rain or shine! In fact, washing your car after rain is important to remove contaminants. We may close during severe weather conditions for safety."
        }
      ]
    },
    {
      category: "Safety & Quality",
      questions: [
        {
          question: "Is your car wash safe for all vehicles?",
          answer: "Absolutely! Our state-of-the-art equipment uses soft-touch materials that are safe for all vehicle types, including luxury cars, SUVs, and trucks. We also offer touchless options."
        },
        {
          question: "What products do you use?",
          answer: "We use premium, biodegradable, and eco-friendly cleaning products that are tough on dirt but gentle on your vehicle's paint and the environment."
        },
        {
          question: "Will the car wash damage my antenna or accessories?",
          answer: "Our brushes are designed to be gentle on antennas and accessories. However, we recommend removing or retracting tall antennas and securing loose items before entering the wash."
        },
        {
          question: "Do you wash cars with aftermarket modifications?",
          answer: "Yes, but please inform our staff about any modifications like spoilers, body kits, or lowered suspensions so we can take extra care."
        }
      ]
    },
    {
      category: "Payment & Policies",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept cash, all major credit cards (Visa, Mastercard, American Express, Discover), debit cards, and mobile payments (Apple Pay, Google Pay)."
        },
        {
          question: "What is your refund policy?",
          answer: "Customer satisfaction is our priority. If you're not completely satisfied with your wash, let us know within 24 hours and we'll re-wash your vehicle free of charge or provide a refund."
        },
        {
          question: "Do you offer gift cards?",
          answer: "Yes! Gift cards are available in any denomination and make perfect gifts. They never expire and can be used for any of our services."
        }
      ]
    },
    {
      category: "Additional Information",
      questions: [
        {
          question: "Can I wait while my car is being washed?",
          answer: "Yes! We have a comfortable waiting area with free Wi-Fi, refreshments, and seating. You're welcome to relax while we take care of your vehicle."
        },
        {
          question: "Do you wash motorcycles or RVs?",
          answer: "We can wash motorcycles and smaller RVs. Please call ahead for larger vehicles so we can ensure we can accommodate your vehicle's size."
        },
        {
          question: "How often should I wash my car?",
          answer: "We recommend washing your car every 2 weeks to maintain its appearance and protect the paint. In winter or if you park outside, weekly washes are ideal."
        },
        {
          question: "Do you have any environmental initiatives?",
          answer: "Yes! We use water reclamation systems to recycle water, biodegradable soaps, and energy-efficient equipment. We're committed to minimizing our environmental impact."
        }
      ]
    }
  ];
  
  // ===== END EDITABLE CONTENT =====
  
  const [openItems, setOpenItems] = useState({});
  
  const toggleQuestion = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  return (
    <>
      <div className="faq-page">
        {/* Hero Section */}
        <div className="faq-hero">
          <h1>{pageTitle}</h1>
          <p className="subtitle">{pageSubtitle}</p>
        </div>

        {/* FAQ Content */}
        <div className="faq-content">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="faq-category">
              <h2 className="category-title">{category.category}</h2>
              <div className="questions-list">
                {category.questions.map((item, questionIndex) => {
                  const key = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openItems[key];
                  
                  return (
                    <div key={questionIndex} className={`faq-item ${isOpen ? 'open' : ''}`}>
                      <button
                        className="faq-question"
                        onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                      >
                        <span>{item.question}</span>
                        <span className="faq-icon">{isOpen ? '−' : '+'}</span>
                      </button>
                      <div className="faq-answer">
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        {/* Contact Section */}
        <div className="faq-contact">
          <h3>Still have questions?</h3>
          <p>Feel free to contact us directly. We're here to help!</p>
          <button className="contact-button">Contact Us</button>
        </div>
      </div>
    </>
  );
}

export default FrequentlyAskedPage;