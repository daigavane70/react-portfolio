import React from 'react';

export default function Experience() {
  return (
    <div className=" max-w-6xl mx-auto p-5 py-20" id="experience">
      <div className="text-6xl md:text-7xl text-center md:text-left font-medium text-gray-300 pb-4 mb-16">
        Experience
      </div>
      {experiences.map((exp) => {
        return (
          <div className="w-full shadow-md p-5 rounded-lg mb-10">
            <div className=" grid md:grid-cols-4 gap-4 md:order-2">
              <div
                className="w-full h-40 flex items-center justify-center my-auto hover:scale-105 transform transition ease-in cursor-pointer"
                onClick={() => window.open(exp.companyUrl || window.location, '_blank')}
              >
                <img
                  className="max-h-full max-w-full rounded-md"
                  src={
                    exp.img ||
                    'https://icons.veryicon.com/png/o/miscellaneous/zr_icon/company-23.png'
                  }
                  alt=""
                ></img>
              </div>
              <div className="md:col-span-3 space-y-4 my-auto">
                <div className="text-lg md:text-2xl text-cyan-500">{exp.company}</div>
                <div className="md:flex justify-between">
                  <div className="text-xl text-slate-500 ">{exp.position}</div>
                  <div className=" text-slate-400">{exp.date}</div>
                </div>
                <div className=" text-gray-400 font-extralight text-sm">
                  <ul className="list-disc">
                    {exp.details.map((detail) => (
                      <li>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const experiences = [
  {
    position: 'SDE Intern',
    company: 'Upstox',
    details: [
      'Architected a comprehensive and portable notification service capable of delivering Email, SMS, and push notifications to both mobile app and web users with the help of Apache Kafka and Spring Boot.',
      'Implemented data retrieval jobs from services like Morningstar, employing efficient processing techniques and leveraging Thread Pools for asynchronous data handling, deployed the jobs on Rundeck.',
      'Designed and implemented a file processor service utilizing java.nio to facilitate the seamless update of trading holiday, order details, and fund information from CSV files into a MySQL database.',
      'Service to generate portfolio statement of userin the form of PDF file using Thymeleaf template engine.',
      'Backend service migration of IPO application from Node.js to Spring-Boot.',
      'Utilized advanced monitoring and bug resolution tools such as Prometheus, Athena, Sumo Logic, and Datadog to ensure proactive monitoring and efficient bug resolution within the software ecosystem.',
      'Achieved a significant enhancement in web API performance by reducing average response time by 400ms through meticulous optimization of MySQL queries and fine-tuning code logic.',
      'Contributed to enhancing the user interface of Mutual Funds and IPO applications, leveraging React.JS for development.',
    ],
    date: 'Jan 2022 - Present',
    img: 'https://lever-client-logos.s3.us-west-2.amazonaws.com/eb7738e7-d908-42f5-97da-61b28e53ce73-1631634736627.png',
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
    img: 'https://drive.google.com/uc?export=view&id=1KZ58TeoC6spgG2HIJUwE8OTCyqR8bw-Q',
    companyUrl: 'http://www.sorceotech.com/',
  },
];
