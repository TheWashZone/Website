import React from 'react';
import '../css/loyalty-page.css';

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
  
  // Important note about audit trail - this will be displayed as an admin note
  const adminNote = "Note to staff: All prepaid book transactions require an audit trail. Please ensure accurate entry of BB, DB, and UB codes to prevent errors.";
  
  // ===== END EDITABLE CONTENT =====
  
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