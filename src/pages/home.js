import React from "react";
import "./home.css";

export default function Home() {
  return (
    <div className="home shadow-2xl" id="home">
      <div className="overlay flex justify-center items-center flex-col p-5">
        {/* <div className=" text-xl md:text-3xl text-cyan-500 font-light">Hii, I am</div> */}
        <div className=" max-w-6xl w-full space-y-4 text-center">
          <div className="text-4xl md:text-7xl text-gray-300 pb-2 text-center border-b border-gray-600 w-full">
            <span className=" font-semibold">Vedant</span> <span className="font-thin">DAIGAVANE</span>
          </div>
          <div className=" flex flex-col md:flex-row space-x-4 text-lg md:text-2xl justify-center items-center">
            <div className=" text-cyan-400 font-bold">Full-Stack Developer</div>
            <div className="flex space-x-4 items-center">
              <div className=" text-gray-300 font-extralight">from</div>
              <div className="h-8 md:h-10 w-10 relative">
                <img
                  className="h-full"
                  src={"https://cdn-icons-png.flaticon.com/512/256/256672.png"}
                  alt=""
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
