import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="h-[3.5rem] bg-black border-b flex justify-between items-center px-[2.5rem]">
      <div>To Do App</div>
      <div>
        <Link
          href={"https://github.com/austinmargarone/todo-list"}
          target="_blank"
        >
          <button className="bg-blue-500 px-3 py-1.5 rounded-sm shadow-lg">
            Github Repo
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
