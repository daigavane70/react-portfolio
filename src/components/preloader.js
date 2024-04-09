import React from 'react';
import Goku1 from '../assets/goku1.webp';

export default function Preloader() {
  const quotes = [
    {
      quote:
        "It's unbelievable how much you don't know about the game you've been playing all your life.",
      author: 'Mickey Mantel',
    },
    { quote: 'If you know more than others, you will be the loneliest.', author: 'Vedant' },
    {
      quote: 'You’ll laugh at your fears when you find out who you really are.',
      author: 'Picollo',
    },
  ];
  const random = Math.floor(Math.random() * quotes.length);
  return (
    <div className="preloader space-y-2">
      <div className="goku-bg w-32 text-center">
        <img src={Goku1} alt="Goku_Img" className=" invert"></img>
      </div>
      <div className="max-w-[400px] font-light text-gray-200">“{quotes[random].quote}”</div>
      <div className="max-w-[400px] text-sm font-light text-sky-400">
        {' '}
        - {quotes[random].author}
      </div>
    </div>
  );
}
