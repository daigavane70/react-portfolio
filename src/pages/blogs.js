import React from 'react';
import { Link } from 'react-router-dom';
import BlogsData from '../assets/blogsData.json';

export default function BlogsAndPublications() {
  return (
    <div className=" relative overflow-hidden bg-black/90 text-gray-400" id="blogs">
      <div className=" mx-auto max-w-6xl p-5 py-8 md:py-20">
        <div className="mb-16">
          <div className="pb-4 text-6xl font-medium text-gray-300 md:text-left md:text-7xl">
            Blogs &amp; Publications
          </div>
          <div>Check out my informative blog posts and research papers.</div>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {BlogsData.map((blog, index) => (
            <div
              className="duration-30 group border-l border-gray-400 p-2 px-2 text-xs transition ease-in-out hover:bg-gray-600/10 hover:text-white"
              key={`blogs${index}`}
            >
              <div className="text-lg font-bold text-green-500 group-hover:text-green-600">
                {blog.title}
              </div>
              <div>{blog.shortDescription}</div>
              <div className="mt-2 font-bold text-gray-200">
                <div className="space-x-2">
                  {blog.links.map((link, index) =>
                    blog.isPublication ? (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        key={`blogslink$${index}`}
                      >
                        {link.title}
                      </a>
                    ) : (
                      <Link
                        className=""
                        to={'/blogs-info/' + blog.title}
                        target="_blank"
                        key={`blogurl${index}`}
                      >
                        {link.title}
                      </Link>
                    ),
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
