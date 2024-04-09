'use client';

import React from 'react';
import BlogsData from '../assets/blogsData.json';
import Link from 'next/link';
import Text from './common/Text';
import Section from './common/Section';

export default function BlogsAndPublications() {
  return (
    <Section>
      <div className='mb-16'>
        <Text>Blogs & Publications</Text>
        <div>Check out my informative blog posts and research papers.</div>
      </div>
      <div className='grid gap-8 md:grid-cols-2'>
        {BlogsData.map((blog, index) => (
          <div
            className='duration-30 group border-l border-gray-400 p-2 px-2 text-xs transition ease-in-out hover:bg-gray-600/10 hover:text-white'
            key={`blog${index}`}
          >
            <div className='text-base font-bold text-green-500 group-hover:text-green-600'>
              {blog.title}
            </div>
            <div>{blog.shortDescription}</div>
            <div className='mt-2 font-bold text-gray-200'>
              <div className='space-x-2'>
                {blog.links.map((link) =>
                  blog.isPublication ? (
                    <a
                      href={link.url}
                      target='_blank'
                      rel='noreferrer'
                      key={'external Link to the blog'}
                    >
                      {link.title}
                    </a>
                  ) : (
                    <Link
                      className=''
                      href={'/blogs-info/' + blog.title}
                      target='_blank'
                      key={'internal link'}
                    >
                      {link.title}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
