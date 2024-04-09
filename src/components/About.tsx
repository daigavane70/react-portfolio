'use client';

import React from 'react';
import { getDriveUrlById } from '../utils/common';
import Image from 'next/image';
import Link from 'next/link';
import Heading from './common/Text';

export default function About() {
  return (
    <div className=' mx-auto max-w-6xl p-5 py-20' id='about'>
      <Heading>About Me</Heading>

      <div className='items-center space-y-8 md:flex md:space-y-0'>
        <div className='h-full basis-1/3 md:order-last'>
          <Image
            height={52}
            width={52}
            src={getDriveUrlById('1-xBANAobBeQV1aK5WlUmj4zh1haGu2HD')}
            className='mx-auto h-52 w-52 rounded-full'
            alt=''
          />
        </div>
        <div className='basis-2/3 space-y-4'>
          <span className='text-xl text-gray-500'>Hi, I am </span>
          <div className='text-4xl font-bold text-cyan-500'>
            Vedant Daigavane
          </div>
          <div className='text-xl font-semibold text-gray-500'>
            Passionate Coder & Trader
          </div>
          <div className='text-justify font-light text-gray-400'>
            I am a highly enthusiastic and competitive person who enjoys being
            around individuals who challenge my limits, and I, in turn, strive
            to push them as well. I have a passion for acquiring new skills and
            sharing my knowledge. Taking on complex challenges is a personal
            passion of mine. I prefer not to adhere to a single technique for an
            extended period and instead proactively seek alternative approaches
            to tasks. I strongly believe that being a jack of all trades and
            master of none is often better than being a master of one.
          </div>
        </div>
      </div>
      <div className='justify-between md:flex'>
        <div className='flex items-center justify-center space-x-4 py-10'>
          {social.map((link) => {
            return (
              <Link
                href={link.link}
                target={'_blank'}
                rel='noreferrer'
                className='relative rounded-full'
                key={`linkToSocialMediaId${link.icon}`}
              >
                <Image src={link.icon} alt='' height={40} width={40}></Image>
              </Link>
            );
          })}
        </div>
        <a
          className='relative m-auto flex w-max cursor-pointer items-center space-x-4 rounded-lg border bg-slate-200 p-2 px-10'
          href={
            'https://drive.google.com/file/d/1y07DZdv7oPGucnDmmwLa_DWzNCjbxTyY/view'
          }
          target={'_blanck'}
          rel='noreferrer'
        >
          <div>Resume</div>
          <Image
            height={24}
            width={24}
            src='https://img.icons8.com/material-outlined/48/000000/link--v1.png'
            alt=''
          />
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
