// src/components/SpecialOffer.jsx
import React, { useEffect, useState } from 'react';
import "../style/specialOffer.css";

const SpecialOffer = () => {
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    // هنا في المستقبل تقدر تحط API call
    // مثلا: fetch('/api/special-offer') أو axios.get()

    // دلوقتي داتا تجريبية
    const dummyOffer = {
      id: 1,
      title: "Exclusive Game Deal!",
      description: "Get 50% off on the new Super Racer game. Limited time offer!",
      image: "https://cdn.wccftech.com/wp-content/uploads/2024/01/gray-zone-warfare-HD-scaled.jpg",
      price: "$29.99",
      discountPrice: "$14.99"
    };

    setOffer(dummyOffer);
  }, []);

  if (!offer) {
    return <div>Loading...</div>; // لودينج بسيط لحد ما الداتا تيجي
  }

  return (
    <div className="special-offer-container">
      <img src={offer.image} alt={offer.title} className="offer-image" />
      <div className="offer-details">
        <h2>{offer.title}</h2>
        <p>{offer.description}</p>
        <div className="price-section">
          <span className="original-price">{offer.price}</span>
          <span className="discounted-price">{offer.discountPrice}</span>
        </div>
        <button className="buy-now-button">Buy Now</button>
      </div>
    </div>
  );
};

export default SpecialOffer;
