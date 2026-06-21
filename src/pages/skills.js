import React from 'react';

export default function Skills() {
  return (
    <div className="mx-auto max-w-6xl p-5 py-8 md:py-20" id="skills">
      <div className="mb-8 md:mb-16 pb-4 text-6xl font-medium text-gray-300 md:text-left md:text-7xl">
        Skills
      </div>

      <div className="space-y-10">
        {skillGroups.map((group) => (
          <div key={group.category}>
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400 border-b border-gray-200 pb-2">
              {group.category}
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {group.skills.map((skill, index) => (
                <div className="flex items-center space-x-2" key={`skill-${group.category}-${index}`}>
                  {skill.icon && <div className="text-2xl flex shrink-0">{skill.icon}</div>}
                  {skill.img && <img src={skill.img} className="h-6 w-6 shrink-0" alt="" />}
                  <div className="text-gray-500 text-sm">{skill.skill}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const skillGroups = [
  {
    category: 'Backend',
    skills: [
      { icon: <i className="devicon-go-original-wordmark colored" />, skill: 'Go' },
      { icon: <i className="devicon-spring-plain colored" />, skill: 'Spring Boot' },
      { icon: <i className="devicon-apachekafka-original colored" />, skill: 'Apache Kafka' },
      { icon: <i className="devicon-nodejs-plain colored" />, skill: 'Node JS' },
      { icon: <i className="devicon-express-original colored" />, skill: 'Express JS' },
      { icon: <i className="devicon-graphql-plain colored" />, skill: 'GraphQL' },
      { icon: <i className="devicon-nginx-original colored" />, skill: 'Nginx' },
    ],
  },
  {
    category: 'Databases & Storage',
    skills: [
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain.svg', skill: 'PostgreSQL' },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', skill: 'MySQL' },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', skill: 'MongoDB' },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', skill: 'Redis' },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', skill: 'Valkey' },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dynamodb/dynamodb-original.svg', skill: 'DynamoDB' },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opensearch/opensearch-original.svg', skill: 'OpenSearch' },
    ],
  },
  {
    category: 'Frontend',
    skills: [
      { icon: <i className="devicon-react-original colored" />, skill: 'React' },
      { icon: <i className="devicon-nextjs-plain colored" />, skill: 'Next.js' },
      { icon: <i className="devicon-redux-original colored" />, skill: 'Redux' },
      { icon: <i className="devicon-tailwindcss-plain colored" />, skill: 'Tailwind CSS' },
      { icon: <i className="devicon-materialui-plain colored" />, skill: 'Material UI' },
      { icon: <i className="devicon-bootstrap-plain colored" />, skill: 'Bootstrap' },
    ],
  },
  {
    category: 'Languages',
    skills: [
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', skill: 'Java' },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', skill: 'JavaScript' },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', skill: 'TypeScript' },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', skill: 'Python' },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', skill: 'C++' },
    ],
  },
  {
    category: 'Cloud & DevOps',
    skills: [
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', skill: 'Docker' },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', skill: 'AWS Lambda' },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', skill: 'AWS S3' },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg', skill: 'Postman' },
    ],
  },
  {
    category: 'Observability',
    skills: [
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg', skill: 'Grafana' },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prometheus/prometheus-original.svg', skill: 'Prometheus' },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/datadog/datadog-original.svg', skill: 'Datadog' },
    ],
  },
];
