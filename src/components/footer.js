import React from 'react';

export default function Footer() {
  return (
    <div className="w-full flex justify-center bg-slate-100 p-5 text-center text-gray-400 space-x-2">
      <div>Create by Vedant Daigavane</div>
      <a
        href="https://github.com/daigavane70/daigavane70.github.io"
        target={'_blank'}
        rel="noreferrer"
        className="text-cyan-500"
      >
        ( Repo Link )
      </a>
    </div>
  );
}
