import Image from 'next/image';
import React from 'react';
import Divider from './Divider';
import Text from './Text';

type ExperienceData = {
  companyName: string;
  companyLogoUrl?: string;
  companyWebsite: string;
  position: string;
  tenure: string;
  tasksPerformed: string[];
};

export default function CompanyExperience(props: ExperienceData) {
  const {
    companyName,
    companyLogoUrl,
    companyWebsite,
    position,
    tasksPerformed,
    tenure,
  } = props;
  return (
    <div className='mb-xxxlarge'>
      <div className='flex flex-row'>
        <div
          className='mr-medium my-auto transform cursor-pointer items-center justify-center overflow-hidden rounded-md transition ease-in hover:scale-105'
          onClick={() =>
            window.open(companyWebsite || window.location.href, '_blank')
          }
        >
          <Image
            src={
              companyLogoUrl ||
              'https://icons.veryicon.com/png/o/miscellaneous/zr_icon/company-23.png'
            }
            alt='company-logo'
            height={40}
            width={40}
          />
        </div>
        <div className='flex-1'>
          <Text variant='heading2' className='text-primary'>
            {companyName}
          </Text>
          <div className='flex-1 flex-row justify-between'>
            <Text variant='heading3'>{position}</Text>
            <Text variant='heading3'>{tenure}</Text>
          </div>
        </div>
      </div>
      <Divider />
      <div className='pl-xlarge text-sm font-light text-secondary/60'>
        <ul className='list-disc'>
          {tasksPerformed.map((task, index) => (
            <li key={`detail${companyName}${index}`} className='mb-xxsmall'>
              <Text variant='metaText'>{task}</Text>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
