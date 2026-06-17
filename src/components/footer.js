import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="w-full bg-slate-100 p-5 text-center text-gray-400">
      <div className="flex justify-center space-x-2 md:flex">
        <div>Created by Vedant Daigavane</div>
        <div>
          <a
            href="https://github.com/daigavane70/react-porfolio"
            target={'_blank'}
            rel="noreferrer"
            className="text-cyan-500"
          >
            ( Repo Link )
          </a>
        </div>
      </div>
      <div className="mt-3 text-xs text-gray-300">
        <span className="mr-2">— Lab —</span>
        <Link to="/qr" className="hover:text-gray-400 transition-colors">QR Tool</Link>
        <span className="mx-2">·</span>
        <Link to="/vishnu" className="hover:text-gray-400 transition-colors">Vishnu</Link>
      </div>
    </div>
  );
}
