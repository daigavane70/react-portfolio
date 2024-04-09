import React from 'react';
import { getDriveUrlById } from '../utils';

export default function Experience() {
  return (
    <div className=" mx-auto max-w-6xl p-5 py-8 md:py-20" id="experience">
      <div className="mb-8 md:mb-16 pb-4 text-6xl font-medium text-gray-300 md:text-left md:text-7xl">
        Experience
      </div>
      {experiences.map((exp) => {
        return (
          <div className=" mb-10" key={`experience${exp.company}`}>
            <div className="mb-2 flex flex-row items-center border-b-[1px] border-b-gray-200 pb-2">
              <div className="mr-4 flex h-[32px] w-[32px] items-center justify-center">
                <img
                  className="max-h-full max-w-full transform cursor-pointer rounded-md transition ease-in hover:scale-105"
                  src={
                    exp.img ||
                    'https://icons.veryicon.com/png/o/miscellaneous/zr_icon/company-23.png'
                  }
                  alt=""
                  onClick={() => window.open(exp.companyUrl || window.location, '_blank')}
                />
              </div>

              <div className="flex-1">
                <div className="text-lg font-bold text-gray-700 md:text-lg">{exp.company}</div>
                <div className="flex flex-col justify-between md:flex-row">
                  <div className="text-md font-semibold text-slate-500 md:text-lg">
                    {exp.position}
                  </div>
                  <div className="text-sm text-slate-500 md:text-base">{exp.date}</div>
                </div>
              </div>
            </div>

            <div className=" pl-4 text-sm text-gray-600">
              <ul className="list-disc">
                {exp.details.map((detail, index) => (
                  <li key={`exp-details${index + exp.company}`}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const experiences = [
  {
    position: 'Software Development Engineer 1 Full-Stack',
    company: 'Upstox',
    details: [
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
    img: 'https://media.licdn.com/dms/image/C4E0BAQHqu3S3cd_R-g/company-logo_200_200/0/1631600709019/upstox_logo?e=1720656000&v=beta&t=sIlL9hdqYlnj0_rKh6CMDz7r-5E781VALgnJnc7IQlk',
    companyUrl: 'https://upstox.com/',
  },
  {
    position: 'SDE Intern',
    company: 'Upstox',
    details: [
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
    company: 'Finlegal Business Solutions Pvt. Ltd.',
    details: [
      'Worked on an application facilitating patients to book appointments with doctors across multiple organizations.',
      'Leveraged Next.js for frontend development and Storybook for efficient frontend component creation.',
      'Employed Express.js, GraphQL, PostgreSQL, and AWS S3 for API development.',
    ],
    date: 'Nov 21 - Jan 22',
    img: 'https://quoppo.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F1257ac6f-9946-42db-b9e2-f3cc144c8f6f%2Flogo-quoppo.svg?table=block&id=4cb5c073-3ad4-4778-917f-36d5fbf14a96&spaceId=011a789e-d422-42dc-b920-56a90df1c604&userId=&cache=v2',
    companyUrl: 'https://quoppo.notion.site/',
  },
  {
    position: 'Full Stack Developer Intern',
    company: 'Sorceo Technologies Pvt. Ltd.',
    details: [
      'Developed a Vendor Management System and Auction Platform, incorporating secure authentication with Auth0. Utilized Express.js, React.js, and Redux for efficient implementation.',
      'Built a globally-serving platform catering to top multinational corporations.',
    ],
    date: 'Aug 21 - Oct 21',
    img: getDriveUrlById('1KZ58TeoC6spgG2HIJUwE8OTCyqR8bw-Q'),
    companyUrl: 'http://www.sorceotech.com/',
  },
];
