import React, { useState } from 'react';
import './FAQs.css';

const faqs = [
  {
    question: "What is KisaanSaathi?",
    answer: "KisaanSaathi is an online platform dedicated to helping farmers with real-time information on weather forecasts, commodity prices, farming guidelines, and answers to frequently asked questions to improve agricultural productivity and efficiency."
  },
  {
    question: "How can KisaanSaathi help me with commodity prices?",
    answer: "KisaanSaathi provides up-to-date information on the prices of various agricultural commodities like grains, vegetables, and fruits. You can check market trends, price predictions, and compare prices from different regions to make informed selling decisions."
  },
  {
    question: "How accurate are the weather forecasts provided on KisaanSaathi?",
    answer: "The weather forecasts provided on KisaanSaathi are sourced from reliable meteorological services and updated regularly. We provide information on temperature, rainfall, humidity, and other essential weather parameters relevant to farming."
  },
  {
    question: "What farming guidelines can I access on KisaanSaathi?",
    answer: "KisaanSaathi offers a wide range of farming guidelines, including crop care, pest management, irrigation tips, soil health practices, and advice on selecting the right seeds for your region."
  },
];

function FAQs() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);  // Close the answer if it's already open
    } else {
      setActiveIndex(index);  // Open the clicked answer
    }
  };

  return (
    <div className="faqs">
      <h1>FAQs</h1>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div 
              className="faq-question" 
              onClick={() => toggleAnswer(index)}
            >
              <h3>{faq.question}</h3>
              <span className={activeIndex === index ? 'arrow up' : 'arrow down'}></span>
            </div>
            {activeIndex === index && <p className="faq-answer">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQs;
