import { useNavigate } from 'react-router-dom';
import { addWashes, removeWash, getBasicWashes, getDeluxeWashes, getUltimateWashes } from '../api/firebase-addbasic'; 
import { useEffect, useState } from 'react';
import '../css/gift-cards.css';

function GiftCardsPage() {
  const navigate = useNavigate();
  const pageTitle = "Prepaid Wash Books";
  const pageSubtitle = "Buy multiple washes at once and get a discount";
  const [basicWashes, setBasicWashes] = useState(0);
  const [deluxeWashes, setDeluxeWashes] = useState(0);
  const [ultimateWashes, setUltimateWashes] = useState(0);

async function handleAddWash(washType, amount) {
  await addWashes("B001", washType, amount);

  if (washType === "basicWashes") {
    setBasicWashes((current) => current + amount);
  } else if (washType === "deluxeWashes") {
    setDeluxeWashes((current) => current + amount);
  } else if (washType === "ultimateWashes") {
    setUltimateWashes((current) => current + amount);
  }
}


async function handleRemoveWash(washType) {
  await removeWash("B001", washType);

  if (washType === "basicWashes") {
    setBasicWashes((current) => Math.max(0, current - 1));
  } else if (washType === "deluxeWashes") {
    setDeluxeWashes((current) => Math.max(0, current - 1));
  } else if (washType === "ultimateWashes") {
    setUltimateWashes((current) => Math.max(0, current - 1));
  }
}

  useEffect(() => {
    async function loadBasicWashes() {
      const washes = await getBasicWashes("B001");
      setBasicWashes(washes);
    }

    loadBasicWashes();
  }, []);

  useEffect(() => {
    async function loadDeluxeWashes() {
      const washes = await getDeluxeWashes("B001");
      setDeluxeWashes(washes);
    }

    loadDeluxeWashes();
  }, []);

  useEffect(() => {
    async function loadUltimateWashes() {
      const washes = await getUltimateWashes("B001");
      setUltimateWashes(washes);
    }

    loadUltimateWashes();
  }, []);
  
  const yourBooks = [
    {
      category: "Your Wash Books",
      books: [
        {
          code: "BB",
          name: "Basic Book",
          washCount: `${basicWashes} washes`,
          washType: "basicWashes",
          buttonText: "Use Basic Wash"
        },
        {
          code: "DB",
          name: "Deluxe Book",
          washCount: `${deluxeWashes} washes`,
          washType: "deluxeWashes",
          buttonText: "Use Deluxe Wash"
        },
        {
          code: "UB",
          name: "Ultimate Book",
          washCount: `${ultimateWashes} washes`,
          washType: "ultimateWashes",
          buttonText: "Use Ultimate Wash"
        }
      ]
    },
  ];

  const prepaidBooks = [
    {
      category: "Purchase Wash Books",
      books: [
        {
          code: "BB",
          name: "Basic Book",
          description: "Perfect for regular maintenance washes",
          price: "$47.50",
          washCount: "5 washes",
          discount: "Save $2.50",
          washType: "basicWashes",
          buttonText: "Purchase Basic Wash"
        },
        {
          code: "DB",
          name: "Deluxe Book",
          description: "Our most popular option with extra cleaning features",
          price: "$62.50",
          washCount: "5 washes",
          discount: "Save $5.00",
          washType: "deluxeWashes",
          buttonText: "Purchase Deluxe Wash"
        },
        {
          code: "UB",
          name: "Ultimate Book",
          description: "The complete package for the ultimate shine",
          price: "$77.50",
          washCount: "5 washes",
          discount: "Save $5.00",
          washType: "ultimateWashes",
          buttonText: "Purchase Ultimate Wash"
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
                  
                  <button className="buy-button" onClick={() => handleRemoveWash(book.washType)}>
                    {book.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="giftcards-section">
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
                  
                  <button className="buy-button" onClick={() => handleAddWash(book.washType, 5)}>
                    {book.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="giftcards-contact">
        <h3>Questions about our wash books?</h3>
        <p>Stop by or give us a call - we're happy to help you choose the perfect prepaid book!</p>
        <button className="contact-button" onClick={() => navigate('/contact-us')}>Contact Us</button>
      </div>
    </div>
  );
}

export default GiftCardsPage;