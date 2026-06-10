import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/faq.css';

function FrequentlyAskedPage() {
  // ===== EDIT YOUR CONTENT BELOW =====
  
  const navigate = useNavigate();
  
  const pageTitle = "Frequently Asked Questions";
  const pageSubtitle = "Everything you need to know about our car wash services";
  
  const faqData = [
    {
      category: "Services & Pricing",
      questions: [
        {
          question: "What types of car wash services do you offer?",
          answer: "We offer a variety of exterior services including Basic Wash, Deluxe Wash and Ultimate Wash. Each package is designed to meet different needs and budgets."
        },
        {
          question: "How much does a car wash cost?",
          answer: "Our prices begin at $10 for a Basic one-time wash. We offer monthly membership packages with unlimited washes. Check our home page for detailed pricing."
        },
        {
          question: "How long does a car wash take?",
          answer: "A car wash can take as little as 3 minutes, the variability is how many cars are in line in front of you."
        }
      ]
    },
    {
      category: "Scheduling & Availability",
      questions: [
        {
          question: "Do I need an appointment?",
          answer: "No appointment is necessary unless you want your RV hand-washed."
        },
        {
          question: "What are your hours of operation?",
          answer: "We're open Monday through Friday from 7:30 AM to 5:30 PM, Saturday from 8:00 AM to 5:00 PM, and Sunday from 9:00 AM to 5:00 PM. Holiday hours may vary."
        },
        {
          question: "Are you open during bad weather?",
          answer: "Yes, we're open rain or shine! In fact, washing your car after rain is important to remove contaminants. We may close during severe weather conditions for safety or for necessary maintenance."
        }
      ]
    },
    {
      category: "Safety & Quality",
      questions: [
        {
          question: "Is your car wash safe for all vehicles?",
          answer: "Our equipment uses soft-touch materials that are safe for almost all vehicle types, including luxury cars, SUVs, and most trucks. However, some vehicles may not be compatible due to size or equipment restrictions. Large trucks, vehicles with ladder racks, roof-mounted accessories, or vehicles that exceed our height clearance may not be able to use the wash safely. If you're unsure whether your vehicle qualifies, please ask a team member before entering the wash."
        },
        {
          question: "What products do you use?",
          answer: "We use premium, biodegradable, and eco-friendly cleaning products that are tough on dirt but gentle on your vehicle's paint and the environment."
        },
        {
          question: "Will the car wash damage my antenna or accessories?",
          answer: "Our brushes are designed to be gentle on antennas and accessories. For the safety of your vehicle, please remove or retract antennas and secure or remove any loose exterior accessories before entering the wash. We are not responsible for damage to antennas, aftermarket accessories, roof-mounted equipment, or other loose or improperly secured items."
        },
        {
          question: "Do you wash cars with aftermarket modifications?",
          answer: "Yes, but we are not responsible for damage done to aftermarket accessories, roof-mounted equipment, or other loose or improperly secured items."
        }
      ]
    },
    {
      category: "Payment & Policies",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "Cash, Visa, Mastercard and Discover (debit or credit). We do not accept American Express."
        },
        {
          question: "What is your refund policy?",
          answer: "Customer satisfaction is our priority. If you're not completely satisfied with your wash, let us know the same day and we will re-wash your vehicle free of charge."
        },
        {
          question: "Do you offer gift cards?",
          answer: "Yes, in a sense. We offer pre-paid books, which is five (5) passes"
        }
      ]
    },
    {
      category: "Additional Information",
      questions: [
        {
          question: "Can I wait while my car is being washed?",
          answer: "Yes! You're welcome to relax inside of your car while we take care of your vehicle."
        },
        {
          question: "Do you wash motorcycles or RVs?",
          answer: "We cannot wash motorcycles but we can wash RVs. Please call ahead to reserve a time for RVs as we hand-wash them."
        },
        {
          question: "How often should I wash my car?",
          answer: "We recommend washing your car every 2 weeks to maintain its appearance and protect the paint. In winter or if you park outside, weekly washes are ideal."
        },
        {
          question: "Do you have any environmental initiatives?",
          answer: "Yes! We use biodegradable soaps, and energy-efficient equipment. We're committed to minimizing our environmental impact."
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
              <h2 className="category-faq-title">{category.category}</h2>
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
          <button className="contact-faq-button" onClick={() => navigate('/contact-us')}>Contact Us</button>
        </div>
      </div>
    </>
  );
}

export default FrequentlyAskedPage;