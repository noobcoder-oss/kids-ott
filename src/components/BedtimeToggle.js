import React, { useState } from "react";

const BedtimeToggle = ({ onToggle }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    onToggle && onToggle(!isActive);
  };

  return React.createElement(
    "div",
    {
      className: "flex flex-col items-center gap-1",
    },
    [
      React.createElement(
        "button",
        {
          key: "toggle-button",
          onClick: handleClick,
          className: `relative flex top-3 items-center h-6 w-12 rounded-full ${
            isActive ? "bg-gray-800" : "bg-gray-800"
          }`,
          "aria-label": "Toggle bedtime mode",
        },
        React.createElement("div", {
          className: `absolute h-5 w-5 rounded-full transition-all duration-200 ${
            isActive ? "right-0.5 bg-green-500" : "left-0.5 bg-[#e31b53]"
          }`,
        })
      ),
      React.createElement(
        "span",
        {
          key: "label",
          className: "text-black text-[10px] font-medium mt-2",
        },
        "Bed time"
      ),
    ]
  );
};

export default BedtimeToggle;
