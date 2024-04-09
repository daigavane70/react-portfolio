import React, { ReactNode } from 'react';
import { tv } from 'tailwind-variants';

type TextProps = {
  className?: string;
  variant?: 'heading1' | 'heading2' | 'heading3' | 'metaText';
  children: ReactNode;
};

export default function Text({
  variant = 'heading1',
  className = '',
  ...props
}: TextProps) {
  const classNames = tv({
    base: 'md:text-left font-medium text-gray-600 ' + className,
    variants: {
      variant: {
        heading1: 'text-4xl md:text-7xl mb-xlarge md:mb-16 md:pb-4',
        heading2: 'text-md font-bold md:text-xl',
        heading3: 'text-sm md:text-base',
        metaText: 'text-sm font-light',
      },
      align: {
        center: 'text-center',
        left: 'text-left',
      },
    },
    defaultVariants: {
      variant: variant,
    },
  });
  return <div className={classNames()}>{props.children}</div>;
}
