import React from "react";
import Logout from "../home/left1/Logout";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { BsPersonWorkspace } from "react-icons/bs";

function About() {
  return (
    <>
      <div className="bg-DarkGray min-h-screen flex flex-col sm:flex-row overflow-auto">
        <Logout />
        <div className="mx-7 my-5">
          <h1 className="text-5xl text-violet-400 flex gap-3 pb-5">
            About{" "}
            <span className="relative top-1">
              <IoMdInformationCircleOutline />
            </span>
          </h1>
          <div className="border border-violet-400 p-4">
            <p className="text-lg text-violet-400 font-Sansation">
              ChatSphere is a real-time, user-friendly messaging platform
              designed for seamless communication. Built with the MERN (MongoDB,
              Express, React, Node.js) stack and powered by Socket.IO for live
              interactions, ChatSphere allows users to:
              <div className="py-3">
                <ul className="list-disc list-inside">
                  <li className="py-2">Real-time messaging with Socket.IO</li>
                  <li className="py-2">
                    Smart user search & contact management
                  </li>
                  <li className="py-2">Emoji board for expressive chatting</li>
                  <li className="py-2">
                    Profile customization: name, gender, and display photo
                  </li>
                  <li className="py-2">
                    {" "}
                    Fully responsive — works great on both
                    mobile and desktop
                  </li>
                  <li className="py-2">
                    Persistent chat history (no data lost on logout)
                  </li>
                </ul>
              </div>
            </p>
          </div>
          <h1 className="text-3xl sm:text-5xl  text-violet-400 flex gap-3 py-7">
            Meet the Developer{" "}
            <span className="relative top-1">
              <BsPersonWorkspace />
            </span>
          </h1>
          <div className="border border-violet-400 p-4 flex flex-col sm:flex-row gap-5">
            <div className="avatar">
              <div className=" w-24 rounded-full">
                <img src="../../public/ME (2).jpg" />
              </div>
            </div>
            <p className="text-lg text-violet-400 font-Sansation">
              Hey, I’m Abhirup Ghosh, a B.Tech student in Computer Science and
              Business Systems. I created ChatSphere to explore full-stack
              development and build something real, fast, and user-friendly.
              This project combines my love for intuitive UI and powerful
              backend logic. Hope you enjoy using it as much as I enjoyed making
              it!
            </p>
          </div>
          <h1 className="text-violet-400 text-right m-5">Thanks and regards</h1>
          
        </div>
      </div>
      <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
            <aside>
              <p>
                Your honest{" "}
                <a
                  className="link link-info"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSewIyOsVh6fEyevzWm8147VyoxEOeJHQ4eyZXm6nuRf8zTAhw/viewform?usp=dialog"
                >
                  Review
                </a>{" "}
                will be very help full to make the user Experience better
              </p>
            </aside>
          </footer>
    </>
  );
}

export default About;
