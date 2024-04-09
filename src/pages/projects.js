import React from 'react';
import Xenia from '../assets/xenia.webp';
import Editorial from '../assets/editorial.webp';
import RebuildHub from '../assets/rebuild-hub.webp';
import Tradenza from '../assets/tradenza.webp';
import OJ from '../assets/oj.webp';

export default function Projects() {
  return (
    <div className=" relative overflow-hidden bg-slate-50" id="projects">
      <div className=" mx-auto max-w-6xl p-5 py-8 md:py-20" id="experience">
        <div className="mb-8 md:mb-16 pb-4 text-6xl font-medium text-gray-300 md:text-left md:text-7xl">
          Projects
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {projects.map((proj, index) => {
            return (
              <div className="space-y-4 bg-white p-4 shadow-md" key={`project${index}`}>
                <div className="relative h-32 overflow-hidden border-b">
                  <img alt="" src={proj.img} className="absolute left-0 my-auto w-full "></img>
                </div>
                <div className="text-2xl text-cyan-500">{proj.title}</div>
                <div className="h-20 overflow-y-auto text-xs font-light text-gray-400">
                  {proj.details}
                </div>
                <div className="flex items-center justify-end space-x-4 opacity-40">
                  {proj.links.map((link, index) => {
                    return (
                      <a
                        href={link.link}
                        target={'_blank'}
                        rel="noreferrer"
                        className="flex h-5 cursor-pointer items-center text-2xl text-gray-500"
                        key={`project-link${index + proj.title}`}
                      >
                        {link.icon}
                      </a>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const projects = [
  {
    title: 'Online Judge',
    details:
      'An Online Judge platform whose primary goal was to host a coding contest and calculate real-time rankings on the basis of submissions made by the contestants. We have used ReactJS, and Redux to develop the client project. For the client-side we have used NodeJS, ExpressJS for API development, MongoDB as a database, Redis-Bull to maintain queue, docker for containerization of project, and Judge0 as code execution engine.',
    img: OJ,
    links: [
      {
        icon: (
          <img
            alt=""
            src="https://img.icons8.com/ios-filled/50/000000/link--v1.png"
            className="h-full"
          ></img>
        ),
        link: 'https://oj-client.vercel.app/',
      },
      {
        icon: <i className="devicon-github-original"></i>,
        link: 'https://github.com/PCSB-Web-Team/online-judge-server',
      },
    ],
  },
  {
    title: 'Xenia Website',
    details: "Built a website from scratch for PCSB's annual event Xenia.",
    img: Xenia,
    links: [
      {
        icon: (
          <img
            alt=""
            src="https://img.icons8.com/ios-filled/50/000000/link--v1.png"
            className="h-full"
          ></img>
        ),
        link: 'https://pcsbxenia.com/',
      },
    ],
  },
  {
    title: 'Rebuild Hub',
    details:
      'A web app that will bridge the gap between waste donors and waste collectors and will have a huge positive impact on collection of recyclable waste.',
    img: RebuildHub,
    links: [
      {
        icon: (
          <img
            alt=""
            src="https://img.icons8.com/ios-filled/50/000000/link--v1.png"
            className="h-full"
          ></img>
        ),
        link: 'https://rebuild-hub.netlify.app/',
      },
      {
        icon: <i className="devicon-github-original"></i>,
        link: 'https://github.com/Rebuild-Hub/Rebuild-Hub-Client',
      },
    ],
  },
  {
    title: 'The Editorial',
    img: Editorial,
    details: "PICT Debsoc's Editorial website.",
    links: [
      {
        icon: (
          <img
            alt=""
            src="https://img.icons8.com/ios-filled/50/000000/link--v1.png"
            className="h-full"
          ></img>
        ),
        link: 'https://pictdebsoc.github.io/the_editorial/issue.html',
      },
      {
        icon: <i className="devicon-github-original"></i>,
        link: 'https://github.com/pictdebsoc/the_editorial',
      },
    ],
  },
  {
    title: 'Tradenza',
    details: 'An Attempt to create a platform that will host a trading contest. Still in progress.',
    img: Tradenza,
    links: [
      {
        icon: (
          <img
            alt=""
            src="https://img.icons8.com/ios-filled/50/000000/link--v1.png"
            className="h-full"
          ></img>
        ),
        link: 'https://60f5901158dfc928b3aef62c--tradenza.netlify.app/',
      },
    ],
  },
];
