import React, { ReactNode } from 'react';

type SectionProps = {
  id: string;
  className?: string;
  children: ReactNode;
};

export default function Section(props: SectionProps) {
  const { className, id, children = '' } = props;
  return (
    <div
      className={`my-large px-large mx-auto max-w-6xl md:py-20 ${className}`}
      id={id}
    >
      {children}
    </div>
  );
}
