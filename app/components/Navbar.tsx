import Link from "next/link";
import React from "react";
import NavbarButton from "./NavbarButton";

function Navbar() {
  return (
    <div className="navbar bg-gray-200">
      <div className="flex-1">
        <Link href="./">
          <svg
            className="h-8 w-8 text-red-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            {" "}
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </Link>

        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <NavbarButton
              content="Heart Beat Tracker"
              url="./heart-beat-tracker"
            />
            <NavbarButton content="Upcoming Work" url="./upcoming-feature" />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
