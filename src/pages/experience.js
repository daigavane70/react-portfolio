import React from "react";

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
              <div className="w-full h-40 flex items-center justify-center">
                <img
                  className="max-h-full max-w-full rounded-md"
                  src={
                    exp.img ||
                    "https://icons.veryicon.com/png/o/miscellaneous/zr_icon/company-23.png"
                  }
                  alt=""
                ></img>
              </div>
              <div className="md:col-span-3 space-y-4 my-auto">
                <div className="text-lg md:text-2xl text-cyan-500">
                  {exp.company}
                </div>
                <div className="md:flex justify-between">
                  <div className="text-xl text-slate-500 ">{exp.position}</div>
                  <div className=" text-slate-400">{exp.date}</div>
                </div>
                <div className=" text-gray-400 font-extralight text-sm">
                  {exp.details}
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
    position: "SDE Intern",
    company: "Upstox",
    details: "",
    date: "Jan 2022 - Present",
    img: "https://lever-client-logos.s3.us-west-2.amazonaws.com/eb7738e7-d908-42f5-97da-61b28e53ce73-1631634736627.png",
  },
  {
    position: "Software Developer Intern",
    company: "Finlegal Business Solutions Pvt. Ltd.",
    details:
      "Worked on a Health-Tech application, worked on the onbaording module in which I used Redux Toolkit for managing the data flow of multiple forms. Used NextJs + Tailwind CSS + Storybook for creating and testing frontend components.",
    date: "Nov 21 - Jan 22",
    img: "",
  },
  {
    position: "Full Stack Developer Intern",
    company: "Sorceo Technologies Pvt. Ltd.",
    details:
      "Built a Vendor Management System and Auction Platform.The Platform automated the activities performed between Customers and Vendors. Tackled some real world problems by using advance React JS and Redux concepts. The platform is built to help top MNC's in the world.",
    date: "Aug 21 - Oct 21",
    img: "",
  },
];
