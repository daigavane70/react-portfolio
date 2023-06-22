import React from 'react';
import { Link } from 'react-router-dom';
import BlogsData from '../assets/blogsData.json';

export default function BlogsAndPublications() {
  return (
    <div className=" bg-black/90 relative overflow-hidden text-gray-400" id="blogs">
      <div className=" max-w-6xl mx-auto p-5 py-20">
        <div className="mb-16">
          <div className="text-6xl md:text-7xl text-center md:text-left font-medium text-gray-300 pb-4">
            Blogs & Publications
          </div>
          <div>Check out my informative blog posts and research papers.</div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {BlogsData.map((blog) => (
            <div className="border-l px-2 border-gray-400 transition duration-30 group hover:text-white hover:bg-gray-600/10 ease-in-out text-xs p-2">
              <div className="font-bold text-base text-green-500 group-hover:text-green-600">
                {blog.title}
              </div>
              <div>{blog.shortDescription}</div>
              <div className="font-bold text-gray-200 mt-2">
                <div className="space-x-2">
                  {blog.links.map((link) =>
                    blog.isPublication ? (
                      <a href={link.url} target="_blank" rel="noreferrer">
                        {link.title}
                      </a>
                    ) : (
                      <Link className="" to={'/blogs-info/' + blog.title} target="_blank">
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
