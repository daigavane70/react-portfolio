import React, { useState } from 'react';
import { getDriveUrlById } from '../utils';

function parseDateStr(str) {
  if (str.toLowerCase() === 'present') return new Date();
  const [month, year] = str.trim().split(' ');
  const months = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
  return new Date(parseInt(year), months.indexOf(month.toLowerCase().slice(0, 3)));
}

function getDuration(dateRange) {
  const [startStr, endStr] = dateRange.split(' - ');
  const start = parseDateStr(startStr);
  const end = parseDateStr(endStr);
  const totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  if (totalMonths <= 0) return null;
  const years = Math.floor(totalMonths / 12);
  const rem = totalMonths % 12;
  if (years && rem) return `${years}yr ${rem}m`;
  if (years) return `${years}yr`;
  return `${rem}m`;
}

function getCompanyDuration(roles) {
  const starts = roles.map(r => parseDateStr(r.date.split(' - ')[0]));
  const ends = roles.map(r => parseDateStr(r.date.split(' - ')[1]));
  const earliest = new Date(Math.min(...starts));
  const latest = new Date(Math.max(...ends));
  const totalMonths = (latest.getFullYear() - earliest.getFullYear()) * 12 + (latest.getMonth() - earliest.getMonth());
  if (totalMonths <= 0) return null;
  const years = Math.floor(totalMonths / 12);
  const rem = totalMonths % 12;
  if (years && rem) return `${years}yr ${rem}m`;
  if (years) return `${years}yr`;
  return `${rem}m`;
}

// Group consecutive entries by company, preserving order
function groupByCompany(list) {
  const groups = [];
  list.forEach((exp) => {
    const last = groups[groups.length - 1];
    if (last && last.company === exp.company) {
      last.roles.push(exp);
    } else {
      groups.push({ company: exp.company, img: exp.img, companyUrl: exp.companyUrl, roles: [exp] });
    }
  });
  return groups;
}

export default function Experience() {
  const [openKey, setOpenKey] = useState(null); // "companyIdx-roleIdx"

  function toggle(key) {
    setOpenKey(openKey === key ? null : key);
  }

  const groups = groupByCompany(experiences);

  return (
    <div className="mx-auto max-w-6xl p-5 py-8 md:py-20" id="experience">
      <div className="mb-8 md:mb-16 pb-4 text-6xl font-medium text-gray-300 md:text-left md:text-7xl">
        Experience
      </div>

      {groups.map((group, gi) => {
        const isMultiRole = group.roles.length > 1;
        const companyDuration = isMultiRole ? getCompanyDuration(group.roles) : null;
        const companyDateRange = isMultiRole
          ? `${group.roles[group.roles.length - 1].date.split(' - ')[0]} - ${group.roles[0].date.split(' - ')[1]}`
          : null;

        return (
          <div key={group.company} className="mb-8">
            {/* Company header */}
            <div className="flex items-center gap-4 mb-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                <img
                  className="max-h-full max-w-full rounded-md cursor-pointer transition ease-in hover:scale-105"
                  src={group.img || 'https://icons.veryicon.com/png/o/miscellaneous/zr_icon/company-23.png'}
                  alt=""
                  onClick={() => window.open(group.companyUrl || window.location, '_blank')}
                />
              </div>
              <div>
                <div className="text-lg font-bold">{group.company}</div>
                {isMultiRole && (
                  <div className="text-xs text-gray-500 mt-0.5">
                    {companyDateRange} · {companyDuration}
                  </div>
                )}
              </div>
            </div>

            {/* Roles */}
            <div className="ml-7 border-l-2 border-gray-700 pl-5">
              {group.roles.map((role, ri) => {
                const key = `${gi}-${ri}`;
                const isOpen = openKey === key;
                const hasDetails = role.details.length > 0;

                return (
                  <div key={role.position + role.date} className="mb-4">
                    <div
                      className={`relative flex items-center gap-3 pb-2 border-b border-gray-800 ${hasDetails ? 'cursor-pointer select-none' : ''}`}
                      onClick={() => hasDetails && toggle(key)}
                    >
                      <div className="absolute top-1/2 -translate-y-1/2 -left-[27px] w-3 h-3 rounded-full bg-gray-600 border-2 border-gray-900" />
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-300">{role.position}</div>
                        <div className="flex flex-col md:flex-row md:items-center md:gap-2 mt-0.5">
                          <span className="text-xs text-gray-500">{role.date}</span>
                          {getDuration(role.date) && (
                            <span className="text-xs text-gray-600">· {getDuration(role.date)}</span>
                          )}
                        </div>
                      </div>

                      {hasDetails && (
                        <div className="shrink-0 self-center transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {isOpen && (
                      <ul className="list-disc pl-4 mt-3 tracking-wide text-sm text-gray-500 space-y-1">
                        {role.details.map((detail, i) => (
                          <li key={i}>{detail}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const experiences = [
  {
    position: 'Backend Engineer · SDE 2',
    company: 'Fampay',
    details: [],
    date: 'July 2025 - Present',
    img: 'https://www.famapp.in/assets/localImages/fampayLogo.png',
    companyUrl: 'https://www.famapp.in/',
  },
  {
    position: 'Backend Engineer · SDE 1',
    company: 'Fampay',
    details: [
      "Architected a real-time chat-based transaction system using Golang and DynamoDB, designed to handle 15M daily transactions with optimized performance: 20ms latency for transaction/mandate event ingestion, 10ms for chat screen loading, and 5ms for text message storage; implemented Valkey caching layer to reduce DynamoDB WCU/RCU costs for high-frequency conversations",
      "Engineered a 5-microservice architecture with specialized pods for consumer events, REST APIs, task scheduling, background workers, and OpenSearch ingestion; implemented 8-node Valkey cluster with 4 masters/shards and 4 replicas for high availability",
      "Built cost-optimized search infrastructure using OpenSearch with monthly rollover index strategy, enabling ultra-fast search across transactions and messages while reducing Amazon Search OCU costs by 60% through read-only historical indexes and active current-month ingestion",
      "Developed comprehensive data pipeline: DynamoDB Streams → Lambda → Kafka → OpenSearch-ingestion-consumer → AWS OpenSearch, ensuring real-time search capabilities with change data capture for seamless data flow",
      "Implemented UPI TPAP features including bank-to-bank self-transfer and UPI Delegate functionality, enabling 7M daily transacting users to utilize secondary payment accounts without bank requirements, significantly expanding platform accessibility",
      "Led technical mentorship of 2 interns while building automated rewards expiry system using PostgreSQL, achieving ₹5–7 lakhs monthly cost savings through optimized database operations and compliance automation",
      "Established comprehensive monitoring infrastructure using Grafana dashboards tracking CPU utilization, Valkey performance, p99 latencies, and background job processing, with automated DynamoDB provisioning based on real-time metrics"
    ],
    date: 'July 2024 - July 2025',
    img: 'https://www.famapp.in/assets/localImages/fampayLogo.png',
    companyUrl: 'https://www.famapp.in/',
  },
  {
    position: 'SDE 1 Full-Stack',
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
    date: 'Aug 2023 - July 2024',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHiwLODfSkJb0pWA7g_GUM-lZ80WNm5fbz0c-kVD7ShQ&s',
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
    position: 'SDE Intern',
    company: 'Finlegal Business Solutions Pvt. Ltd.',
    details: [
      'Worked on an application facilitating patients to book appointments with doctors across multiple organizations.',
      'Leveraged Next.js for frontend development and Storybook for efficient frontend component creation.',
      'Employed Express.js, GraphQL, PostgreSQL, and AWS S3 for API development.',
    ],
    date: 'Nov 2021 - Jan 2022',
    img: 'https://quoppo.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F1257ac6f-9946-42db-b9e2-f3cc144c8f6f%2Flogo-quoppo.svg?table=block&id=4cb5c073-3ad4-4778-917f-36d5fbf14a96&spaceId=011a789e-d422-42dc-b920-56a90df1c604&userId=&cache=v2',
    companyUrl: 'https://quoppo.notion.site/',
  },
  {
    position: 'Full-Stack Developer Intern',
    company: 'Sorceo Technologies Pvt. Ltd.',
    details: [
      'Developed a Vendor Management System and Auction Platform, incorporating secure authentication with Auth0. Utilized Express.js, React.js, and Redux for efficient implementation.',
      'Built a globally-serving platform catering to top multinational corporations.',
    ],
    date: 'Aug 2021 - Oct 2021',
    img: getDriveUrlById('1KZ58TeoC6spgG2HIJUwE8OTCyqR8bw-Q'),
    companyUrl: 'http://www.sorceotech.com/',
  },
];
