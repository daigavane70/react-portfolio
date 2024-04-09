'use client';

import React from 'react';
import { getDriveUrlById } from '../utils/common';
import Text from './common/Text';
import CompanyExperience from './common/CompanyExperience';
import Section from './common/Section';

export default function Experience() {
  return (
    <Section id='experience'>
      <Text>Experience</Text>
      {experiences.map((exp, index) => {
        return (
          <CompanyExperience
            companyLogoUrl={exp.img}
            companyName={exp.companyName}
            companyWebsite={exp.companyUrl}
            position={exp.position}
            tasksPerformed={exp.tasks}
            tenure={exp.date}
            key={`Experiences${exp.companyName}`}
          />
        );
      })}
    </Section>
  );
}

const experiences = [
  {
    position: 'Software Development Engineer 1 Full-Stack',
    companyName: 'Upstox',
    tasks: [
      'Architected a comprehensive and portable notification service capable of delivering Email, SMS, and push notifications to 10M+ users on both mobile apps and the web with the help of Java Spring Boot and Apache Kafka.',
      'Spearheaded implementation of data retrieval jobs from services like Morningstar, leveraging Thread Pools for async data handling; streamlined processes, reducing data retrieval time by 50% and achieving 99.9% job success rate.',
      'Utilized advanced monitoring and bug resolution tools such as Prometheus, Athena, Sumo Logic, and Datadog to ensure proactive monitoring and efficient bug resolution within the software ecosystem.',
      'Worked on a Rundeck Job to fetch active IPO details at a specific interval from NSE and update on Upstox’s platform.',
      'HolidayMaster processor to update trading holidays from a CSV file into MySQL using java.nio.',
      'Service to generate portfolio statement of the user in the form of PDF file using Thymeleaf template engine.',
      'Spearheaded the development of Personal Loans and Peer-to-Peer investing platforms, crafting intricate UI components for user-friendly loan configuration and optimal selection.',
      'Engineered Government Bonds securities and Sovereign gold bonds applications with Next.js, significantly enhancing performance by reducing bundle size from 5.13MB to 735KB, thereby minimizing loading times.',
      'Created Personal Loans and Peer-to-peer investing web applications using Next.js, this platform is used by 50k people on an average monthly.',
    ],
    date: 'Jan 2022 - Present',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHiwLODfSkJb0pWA7g_GUM-lZ80WNm5fbz0c-kVD7ShQ&s',
    companyUrl: 'https://upstox.com/',
  },
  {
    position: 'SDE Intern',
    companyName: 'Upstox',
    tasks: [
      'Designed and implemented a file processor service utilizing java.nio to facilitate the seamless update of trading holiday, order details, and fund information from CSV files into a MySQL database.',
      'Contributed to migrating the IPO backend service from Node.js to Spring Boot, enhancing concurrency and strengthening platform reliability within the Java ecosystem, resulting in improved performance and scalability.',
      'Contributed to enhancing the user interface of mutual funds and IPO applications, leveraging React.JS for development.',
    ],
    date: 'Jan 2022 - Jul 2023',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHiwLODfSkJb0pWA7g_GUM-lZ80WNm5fbz0c-kVD7ShQ&s',
    companyUrl: 'https://upstox.com/',
  },
  {
    position: 'Software Developer Intern',
    companyName: 'Finlegal Business Solutions Pvt. Ltd.',
    tasks: [
      'Developed an application that allows patients to book appointments with doctors across multiple organizations.',
      'Leveraged Next.js for frontend development and Storybook for efficient frontend component creation.',
      'Employed Express.js, GraphQL, PostgreSQL, and AWS S3 for API development.',
    ],
    date: 'Nov 21 - Jan 22',
    img: 'https://media.licdn.com/dms/image/D4E0BAQGrMR8ssMaTmg/company-logo_200_200/0/1705420033577/quoppo_logo?e=2147483647&v=beta&t=peE5O-rF6PiJB0VQVVxQ-NRv_vB15xQNm2gioLfwPbg',
    companyUrl: 'https://quoppo.notion.site/',
  },
  {
    position: 'Full Stack Developer Intern',
    companyName: 'Sorceo Technologies Pvt. Ltd.',
    tasks: [
      'Developed a Vendor Management System and Auction Platform, incorporating secure authentication with Auth0. Utilized Express.js, React.js, and Redux for efficient implementation.',
      'Built a globally-serving platform catering to top multinational corporations.',
    ],
    date: 'Aug 21 - Oct 21',
    img: getDriveUrlById('1KZ58TeoC6spgG2HIJUwE8OTCyqR8bw-Q'),
    companyUrl: 'http://www.sorceotech.com/',
  },
];
