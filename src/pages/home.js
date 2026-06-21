import React from 'react';
import './home.css';

export default function Home() {
  return (
    <div className="home shadow-2xl" id="home">
      <div className="overlay flex flex-col items-center justify-center p-5">
        <div className="w-full max-w-6xl space-y-6 text-center">
          <div className="w-full border-b border-gray-600 pb-4 text-4xl text-gray-300 md:text-7xl">
            <span className="font-semibold">Vedant</span>{' '}
            <span className="font-thin">DAIGAVANE</span>
          </div>

          <div className="flex flex-col items-center justify-center space-x-4 text-lg md:flex-row md:text-2xl">
            <div className="font-bold text-cyan-400">
              Backend Engineer <span className="font-thin text-white">&</span> Day Trader
            </div>
            <div className="flex items-center space-x-4">
              <div className="font-extralight text-gray-300">from</div>
              <div className="relative h-8 w-10 md:h-10">
                <img
                  className="h-full"
                  src={'https://cdn-icons-png.flaticon.com/512/256/256672.png'}
                  alt="India flag"
                />
              </div>
            </div>
          </div>

          <p className="text-sm font-light text-gray-400 md:text-base">
            Building scalable backend systems at{' '}
            <a href="https://www.famapp.in" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">
              Fampay
            </a>{' '}
            — distributed systems, real-time pipelines, fintech at scale.
          </p>

          <div className="flex items-center justify-center gap-4 pt-2">
            <a
              href="https://drive.google.com/file/d/1y07DZdv7oPGucnDmmwLa_DWzNCjbxTyY/view"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-cyan-500 px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-cyan-400"
            >
              Resume
            </a>
            <a
              href="#about"
              className="rounded-lg border border-gray-500 px-6 py-2.5 text-sm font-semibold text-gray-300 transition hover:border-gray-300 hover:text-white"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
