import '../css/gift-cards.css';

function GiftCardsPage() {
  
  const pageTitle = "Prepaid Wash Books";
  const pageSubtitle = "Buy multiple washes at once and get a discount";
  
  const yourBooks = [
    {
      category: "Your Wash Books",
      // description: "Use your washes",
      books: [
        {
          code: "BB",
          name: "Basic Book",
          // price: "$XX.XX",
          washCount: "X washes",
        },
        {
          code: "DB",
          name: "Deluxe Book",
          // description: "Our most popular option with extra cleaning features",
          // price: "$XX.XX",
          washCount: "X washes",
          // discount: "Save $X"
        },
        {
          code: "UB",
          name: "Ultimate Book",
          // description: "The complete package for the ultimate shine",
          // price: "$XX.XX",
          washCount: "X washes",
          // discount: "Save $X"
        }
      ]
    },
  ];

  const prepaidBooks = [
    {
      category: "Purchase Wash Books",
      // description: "Buy multiple washes at once and get a little discount on the total price. Each book is a booklet of prepurchased washes - great for regular customers or as gifts!",
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
  ];
    
  return (
    <div className="giftcards-page">
      
      <div className="giftcards-hero">
        <h1>{pageTitle}</h1>
        <p className="subtitle">{pageSubtitle}</p>
      </div>

      <div className="purchased-section">
        {yourBooks.map((category, categoryIndex) => (
          <div key={categoryIndex} className="giftcards-category">
            <h2 className="giftcards-category-title">{category.category}</h2>
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
                  
                  <button className="buy-button">Use Wash</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="giftcards-section">
        {prepaidBooks.map((category, categoryIndex) => (
          <div key={categoryIndex} className="giftcards-category">
            <h2 className="giftcards-category-title">{category.category}</h2>
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
      
      <div className="giftcards-contact">
        <h3>Questions about our wash books?</h3>
        <p>Stop by or give us a call - we're happy to help you choose the perfect prepaid book!</p>
        <button className="contact-button">Contact Us</button>
      </div>

    </div>
  );
}

export default GiftCardsPage;