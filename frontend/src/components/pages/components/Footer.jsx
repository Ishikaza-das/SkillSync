import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-purple-600 text-white py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-5 px-4">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">SkillSync</h2>
          <p className="text-sm mt-2">
            Empowering your job search. Find opportunities that match your
            skills.
          </p>
        </div>

        {/* Middle - Social Icons */}
        <div className="flex gap-4">
          <a
            href="https://github.com/Ishikaza-das"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="mailto:contact@skillsync.com"
            className="hover:text-gray-300"
          >
            <Mail className="h-6 w-6" />
          </a>
        </div>

        {/* Right Section */}
        <div className="text-sm text-center md:text-right">
          &copy; {new Date().getFullYear()} SkillSync. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
