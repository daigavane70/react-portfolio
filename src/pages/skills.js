import React from 'react';

export default function Skills() {
  return (
    <div className=" max-w-6xl mx-auto p-5 py-20" id="skills">
      <div className="text-6xl md:text-7xl text-center md:text-left font-medium text-gray-300 pb-4 mb-16">
        Skills
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {skills.map((skill) => {
          return (
            <div className="flex space-x-2 items-center">
              {skill.icon && <div className="text-2xl">{skill.icon}</div>}
              {skill.img && <img src={skill.img} className="h-6 w-6" alt=""></img>}
              <div className=" text-gray-500">{skill.skill}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const skills = [
  {
    icon: <i class="devicon-react-original colored"></i>,
    skill: 'React',
  },
  {
    icon: <i class="devicon-redux-original colored"></i>,
    skill: 'Redux',
  },
  {
    icon: <i class="devicon-storybook-plain colored"></i>,
    skill: 'Storybook',
  },
  {
    icon: <i class="devicon-bootstrap-plain colored"></i>,
    skill: 'Bootstrap',
  },
  {
    icon: <i class="devicon-materialui-plain colored"></i>,
    skill: 'Material UI',
  },
  {
    icon: <i class="devicon-tailwindcss-plain colored"></i>,
    skill: 'Tailwind CSS',
  },
  {
    icon: <i class="devicon-css3-plain colored"></i>,
    skill: 'CSS',
  },
  {
    icon: <i class="devicon-nodejs-plain colored"></i>,
    skill: 'Node JS',
  },
  {
    icon: <i class="devicon-express-original colored"></i>,
    skill: 'Express JS',
  },
  // {
  //   icon: '',
  //   skill: 'JWT',
  // },
  {
    img: 'https://symbols.getvecta.com/stencil_92/21_postman-icon.c79f00c910.svg',
    skill: 'Postman',
  },
  {
    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    skill: 'C++',
  },
  {
    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    skill: 'Java',
  },
  {
    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    skill: 'Python',
  },
  {
    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
    skill: 'C',
  },
  {
    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    skill: 'JavaScript',
  },
  {
    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    skill: 'Typescript',
  },
  {
    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    skill: 'MongoDB',
  },
  {
    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    skill: 'MySQL',
  },
  {
    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain.svg',
    skill: 'PostgreSQL',
  },
  {
    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
    skill: 'Redis',
  },
  {
    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    skill: 'Docker',
  },
];
