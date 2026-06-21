import React from 'react';
import { Link } from 'react-router-dom';
import BlogsData from '../assets/blogsData.json';

export default function BlogsAndPublications() {
  return (
    <div className="relative overflow-hidden bg-slate-50" id="blogs">
      <div className=" mx-auto max-w-6xl p-5 py-8 md:py-20">
        <div className="mb-16">
          <div className="pb-4 text-6xl font-medium text-gray-300 md:text-left md:text-7xl">
            Blogs &amp; Publications
          </div>
          <div className="text-gray-500">Check out my informative blog posts and research papers.</div>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {BlogsData.map((blog, index) => (
            <div
              className="group border-l border-gray-300 p-2 px-2 text-xs transition ease-in-out hover:bg-gray-100"
              key={`blogs${index}`}
            >
              <div className="text-lg font-bold text-green-600 group-hover:text-green-700">
                {blog.title}
              </div>
              <div className="text-gray-500">{blog.shortDescription}</div>
              <div className="mt-2 font-bold text-gray-700">
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
