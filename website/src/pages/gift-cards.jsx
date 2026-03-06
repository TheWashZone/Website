import { useState } from 'react';
import '../css/gift-cards.css';

function GiftCardsPage() {
  // ===== EDIT YOUR CONTENT BELOW =====
  
  const pageTitle = "Gift Cards & Prepaid Washes";
  const pageSubtitle = "The perfect gift for car lovers - buy multiple washes and save!";
  
  // Prepaid book options based on your notes
  const prepaidBooks = [
    {
      category: "Prepaid Wash Books",
      description: "Buy multiple washes at once and get a little discount on the total price. Each book is a booklet of prepurchased washes - great for regular customers or as gifts!",
      books: [
        {
          code: "BB",
          name: "Basic Book",
          description: "Perfect for regular maintenance washes",
          price: "$XX.XX",
          washCount: "X washes",
          discount: "Save $X"
        },
        {
          code: "DB",
          name: "Deluxe Book",
          description: "Our most popular option with extra cleaning features",
          price: "$XX.XX",
          washCount: "X washes",
          discount: "Save $X"
        },
        {
          code: "UB",
          name: "Ultimate Book",
          description: "The complete package for the ultimate shine",
          price: "$XX.XX",
          washCount: "X washes",
          discount: "Save $X"
        }
      ]
    },
    {
      category: "Specialty Services",
      description: "We also offer specialty services for larger vehicles",
      books: [
        {
          code: "RV",
          name: "RV Hand Wash",
          description: "Hand wash service for recreational vehicles",
          price: "By the foot",
          washCount: "Priced per foot",
          discount: "Call for quote"
        }
      ]
    }
  ];
  
  /* Frequently asked questions about gift cards
  const faqData = [
    {
      category: "Gift Card Questions",
      questions: [
        {
          question: "What are BB, DB, and UB?",
          answer: "These are our prepaid book codes! BB stands for Basic Book, DB for Deluxe Book, and UB for Ultimate Book. Each is a booklet of prepurchased washes that you can use over time."
        },
        {
          question: "Do I save money buying a prepaid book?",
          answer: "Yes! We offer a little discount when you buy multiple washes at once. The more washes you buy, the more you save!"
        },
        {
          question: "How do I use my prepaid book?",
          answer: "Simply present your book at the time of your wash. Our staff will track your remaining washes to ensure you get every wash you've paid for."
        },
        {
          question: "Can employees use these?",
          answer: "Employees receive 1 free wash per week as part of their benefits. This is separate from the prepaid books available to customers."
        },
        {
          question: "Do you wash RVs?",
          answer: "Yes! We offer RV hand washes priced by the foot. Please check with an attendant for pricing and availability."
        }
      ]
    },
    {
      category: "Terms & Policies",
      questions: [
        {
          question: "Do prepaid books expire?",
          answer: "Our prepaid books are valid for [X] months from the date of purchase. Please check your book for the specific expiration date."
        },
        {
          question: "Can I get a refund on unused washes?",
          answer: "Prepaid books are non-refundable, but they make great gifts if you can't use them! Please see an attendant if you have concerns about your book."
        },
        {
          question: "Can I share my prepaid book with friends?",
          answer: "Absolutely! Prepaid books make wonderful gifts and can be used by anyone you share them with."
        }
      ]
    }
  ]; */
  
  // Important note about audit trail - this will be displayed as an admin note
  const adminNote = "Note to staff: All prepaid book transactions require an audit trail. Please ensure accurate entry of BB, DB, and UB codes to prevent errors.";
  
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
      <div className="giftcards-page">
        {/* Hero Section */}
        <div className="giftcards-hero">
          <h1>{pageTitle}</h1>
          <p className="subtitle">{pageSubtitle}</p>
        </div>

        {/* Prepaid Books Section */}
        <div className="giftcards-content">
          {prepaidBooks.map((category, categoryIndex) => (
            <div key={categoryIndex} className="giftcards-category">
              <h2 className="category-title">{category.category}</h2>
              <p className="category-description">{category.description}</p>
              
              <div className="books-grid">
                {category.books.map((book, bookIndex) => (
                  <div key={bookIndex} className="book-card">
                    <div className="book-code">{book.code}</div>
                    <h3 className="book-name">{book.name}</h3>
                    <p className="book-description">{book.description}</p>
                    
                    <div className="book-details">
                      <div className="book-price">{book.price}</div>
                      <div className="book-count">{book.washCount}</div>
                      {book.discount && (
                        <div className="book-discount">{book.discount}</div>
                      )}
                    </div>
                    
                    <button className="buy-button">Purchase Book</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* FAQ Section */}
        <div className="giftcards-faq">
          <h2>Frequently Asked Questions</h2>
          
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="faq-category">
              <h3 className="faq-category-title">{category.category}</h3>
              <div className="questions-list">
                {category.questions.map((item, questionIndex) => {
                  const key = `faq-${categoryIndex}-${questionIndex}`;
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
        
        {/* Employee Info Section */}
        <div className="giftcards-employee">
          <h3>Employee Benefits</h3>
          <p>Team members receive 1 free wash per week. Please see management for details.</p>
        </div>
        
        {/* Admin Note (only visible to staff) - you can conditionally render this based on user role */}
        <div className="admin-note">
          <p><strong>⚠️ Admin Note:</strong> {adminNote}</p>
        </div>
        
        {/* Contact Section */}
        <div className="giftcards-contact">
          <h3>Questions about our gift cards?</h3>
          <p>Stop by or give us a call - we're happy to help you choose the perfect prepaid book!</p>
          <button className="contact-button">Contact Us</button>
        </div>
      </div>
    </>
  );
}

export default GiftCardsPage;