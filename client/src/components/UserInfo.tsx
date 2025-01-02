import React, { useState, useEffect, useRef } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

interface UserInfoProps {
  username: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  memberSince: string | null;
}

const UserInfo: React.FC<UserInfoProps> = ({
  username,
  email,
  firstName,
  lastName,
  memberSince,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  // Close the tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setShowTooltip(false);
      }
    };

    if (showTooltip) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTooltip]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-primaryText mb-4">
        Review Your Details
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Username */}
        <div className="relative">
          <label className="block mb-1 text-primaryText flex items-center font-bold">
            Username:
            <AiOutlineInfoCircle
              className="ml-2 text-href cursor-pointer"
              onClick={toggleTooltip}
            />
          </label>
          {showTooltip && (
            <div
              ref={tooltipRef}
              className="absolute mt-1 p-2 bg-gray-800 text-white text-xs rounded shadow-lg"
            >
              Username can't be changed
            </div>
          )}
          <p className="text-secondaryText">{username || "N/A"}</p>
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 text-primaryText font-bold">
            Email:
          </label>
          <p className="text-secondaryText">{email || "N/A"}</p>
        </div>

        {/* First Name */}
        <div>
          <label className="block mb-1 text-primaryText 0 font-bold">
            First Name:
          </label>
          <p className="text-secondaryText">{firstName || "N/A"}</p>
        </div>

        {/* Last Name */}
        <div>
          <label className="block mb-1 text-primaryText font-bold">
            Last Name:
          </label>
          <p className="text-secondaryText">{lastName || "N/A"}</p>
        </div>

        {/* Member Since */}
        <div className="sm:col-span-2">
          <label className="block mb-1 text-primaryText font-bold">
            Member Since:
          </label>
          <p className="text-secondaryText">{memberSince || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
