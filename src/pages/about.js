import React from 'react';

export default function About() {
  return (
    <div className=" max-w-6xl mx-auto p-5 py-20" id="about">
      <div className="text-6xl md:text-7xl text-center md:text-left font-medium text-gray-300 pb-4 mb-16">
        About Me
      </div>

      <div className="md:flex items-center space-y-8 md:space-y-0">
        <div className="md:order-last basis-1/3 h-full">
          <img
            src={
              'https://lh6.googleusercontent.com/2Bug3yrRpYCbr0yp4hQ6BwWAvAziYC7PV_FRxpi5vup0OD1vWOl9gWaUSd6Q59Gl2wI=w2400'
            }
            className="rounded-full h-52 w-52 mx-auto"
            alt=""
          ></img>
        </div>
        <div className="basis-2/3 space-y-4">
          <span className="text-gray-500 text-xl">Hi, I am </span>
          <div className="text-cyan-500 text-4xl font-bold">Vedant Daigavane</div>
          <div className="text-xl text-gray-500 font-semibold">Passionate Coder & Trader</div>
          <div className="font-light text-gray-400">
            I am a highly enthusiastic and competitive person who enjoys being around individuals who challenge my limits, and I, in turn, strive to push them as well. I have a passion for acquiring new skills and sharing my knowledge. Taking on complex challenges is a personal passion of mine. I prefer not to adhere to a single technique for an extended period and instead proactively seek alternative approaches to tasks. I strongly believe that being a jack of all trades and master of none is often better than being a master of one.
          </div>
        </div>
      </div>
      <div className="md:flex justify-between">
        <div className="py-10 flex items-center space-x-4 justify-center">
          {social.map((link) => {
            return (
              <a
                href={link.link}
                target={'_blank'}
                rel="noreferrer"
                className="relative rounded-full"
              >
                <img src={link.icon} className="h-10 w-10" alt=""></img>
              </a>
            );
          })}
        </div>
        <a
          className="p-2 cursor-pointer rounded-lg relative px-10 w-max flex items-center m-auto space-x-4 border bg-slate-200"
          href={'https://drive.google.com/file/d/1y07DZdv7oPGucnDmmwLa_DWzNCjbxTyY/view'}
          target={'_blanck'}
          rel="noreferrer"
        >
          <div>Resume</div>
          <img
            className="h-6 w-6"
            src="https://img.icons8.com/material-outlined/48/000000/link--v1.png"
            alt=""
          ></img>
        </a>
      </div>
    </div>
  );
}

const social = [
  {
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg',
    link: 'https://www.linkedin.com/in/vedant-daigavane-25785315a/',
  },
  {
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    link: 'https://github.com/daigavane70',
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/1384/1384063.png',
    link: 'https://www.instagram.com/vedant_daigavane/',
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/732/732200.png',
    link: 'mailto: daigavane70@gmail.com',
  },
];
