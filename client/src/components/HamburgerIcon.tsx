import React from "react";

interface HamburgerIconProps {
  isOpen: boolean;
}

const HamburgerIcon: React.FC<HamburgerIconProps> = ({ isOpen }) => (
  <div className="w-6 h-6 flex flex-col justify-between items-center cursor-pointer transform translate-y-[-5px]">
    {" "}
    {/* Adjusted using transform */}
    <span
      className={`block h-0.5 w-full bg-[#6F8FAF] transform transition-transform duration-300 ${
        isOpen ? "rotate-45 translate-y-2" : ""
      }`}
    />
    <span
      className={`block h-0.5 w-full bg-[#6F8FAF] transition-opacity duration-300 ${
        isOpen ? "opacity-0" : "opacity-100"
      }`}
    />
    <span
      className={`block h-0.5 w-full bg-[#6F8FAF] transform transition-transform duration-300 ${
        isOpen ? "-rotate-45 -translate-y-2" : ""
      }`}
    />
  </div>
);

export default HamburgerIcon;
