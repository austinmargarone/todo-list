import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="h-[4.25rem] bg-black border-b flex justify-between items-center px-6 md:px-10">
      <div className="navbar-title text-white text-2xl font-bold">
        To Do App
      </div>
      <div>
        <Link
          href={"https://github.com/austinmargarone/todo-list"}
          target="_blank"
        >
          <button className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300 px-4 py-2 rounded-md shadow-md text-white">
            Github Repo
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
