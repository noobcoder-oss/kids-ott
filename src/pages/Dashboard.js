"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { History, HistoryIcon } from "lucide-react";

// Dummy data
const children = [
  {
    id: 1,
    name: "Alina",
    image: "/child1.png",
    screenTime: 200,
  },
  {
    id: 2,
    name: "Mike",
    image: "/child2.png",
    screenTime: 200,
  },
];

const screenTimeData = [
  { day: "Monday", hours: 2.5 },
  { day: "Tuesday", hours: 1.8 },
  { day: "Wednesday", hours: 2.2 },
  { day: "Thursday", hours: 1.5 },
  { day: "Friday", hours: 2.7 },
  { day: "Saturday", hours: 1.2 },
];

const watchHistory = [
  {
    id: 1,
    title: "Tom & Jerry (2021)",
    description:
      "Tom and Jerry take their cat-and-mouse game to the big screen.",
    image: "/tj.png",
  },
  {
    id: 2,
    title: "The Incredibles",
    description:
      "The Parr family struggles to maintain normal lives while Helen fights crime.",
    image: "/i.png",
  },
  {
    id: 3,
    title: "Batman",
    description:
      "Bruce Wayne must deal with the criminals of Gotham and his own past.",
    image: "/b.png",
  },
  {
    id: 4,
    title: "Harry Potter",
    description:
      "A young wizard's journey at Hogwarts School of Witchcraft and Wizardry.",
    image: "/hp.png",
  },
];

const categories = ["Animation", "Action", "Comedy", "Drama", "Fantasy"];

function ChildProfile({ name, image, screenTime }) {
  return React.createElement(
    "div",
    { className: "flex flex-col items-center" },

    // Profile image container - Fixed by removing padding
    React.createElement(
      "div",
      { className: "relative w-30 h-25 overflow-hidden rounded-full" },
      React.createElement("img", {
        src: image,
        alt: name,
        className: "w-full h-full object-cover",
      })
    ),

    // Name text
    React.createElement("h3", { className: "font-bold text-gray-800" }, name),

    // Supercoins display
    React.createElement(
      "div",
      {
        className:
          "bg-yellow-300/70 text-gray-800 text-xs font-medium px-3 py-1 rounded-full mt-1 flex items-center",
      },
      // Coin icon
      React.createElement("img", {
        src: "/games/Coins.png",
        alt: "Supercoins",
        className: "w-10 h-10 mr-1",
      }),
      // Coin count
      React.createElement("span", { className: "font-bold mr-1" }, screenTime),
      // Text label
      React.createElement("span", null, "Supercoins")
    )
  );
}

function BarChart({ data }) {
  const maxHours = Math.max(...data.map((item) => item.hours));

  return React.createElement(
    "div",
    { className: "h-48 flex items-end justify-between px-2" },
    data.map((item, index) =>
      React.createElement(
        "div",
        { key: index, className: "flex flex-col items-center w-full" },
        React.createElement(
          "div",
          { className: "relative w-full flex justify-center mb-1" },
          React.createElement(
            "div",
            {
              className:
                "w-6 bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-t-sm",
              style: { height: `${(item.hours / maxHours) * 120}px` },
            },
            React.createElement(
              "div",
              {
                className:
                  "absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600",
              },
              `${item.hours}h`
            )
          )
        ),
        React.createElement(
          "div",
          { className: "text-xs text-gray-500" },
          item.day.substring(0, 3)
        )
      )
    )
  );
}

// Screen Time Setter component
function ScreenTimeSetter({ onSetTime, screenTimeLimit, selectedTimeOption }) {
  const [customTime, setCustomTime] = useState(screenTimeLimit.toString());

  const handleTimeOptionClick = (time) => {
    setCustomTime(time.toString());
    onSetTime(time);
  };

  const handleCustomTimeChange = (e) => {
    setCustomTime(e.target.value);
  };

  const handleSubmit = () => {
    const time = parseInt(customTime, 10);
    if (!isNaN(time) && time > 0) {
      onSetTime(time);
    }
  };

  return React.createElement(
    "div",
    { className: "text-center" },
    React.createElement(
      "div",
      { className: "flex items-center justify-center mb-4" },
      React.createElement(HistoryIcon, {
        className: "pr-1 w-6 h-6 text-gray-500",
      }),
      React.createElement(
        "span",
        { className: "text-[#e31b53] font-medium" },
        "Set Screen Timer"
      )
    ),

    React.createElement(
      "div",
      { className: "flex justify-center gap-3 mb-4" },
      React.createElement(
        "button",
        {
          onClick: () => handleTimeOptionClick(15),
          className: `px-4 py-2 rounded-lg transition-all ${
            selectedTimeOption === 15
              ? "border-2 border-[#e31b53] text-[#e31b53] font-medium"
              : "border border-gray-200 text-gray-600 hover:border-pink-300"
          }`,
        },
        "15 min"
      ),
      React.createElement(
        "button",
        {
          onClick: () => handleTimeOptionClick(30),
          className: `px-4 py-2 rounded-lg transition-all ${
            selectedTimeOption === 30
              ? "border-2 border-[#e31b53] text-[#e31b53] font-medium"
              : "border border-gray-200 text-gray-600 hover:border-pink-300"
          }`,
        },
        "30 min"
      ),
      React.createElement(
        "button",
        {
          onClick: () => handleTimeOptionClick(45),
          className: `px-4 py-2 rounded-lg transition-all ${
            selectedTimeOption === 45
              ? "border-2 border-[#e31b53] text-[#e31b53] font-medium"
              : "border border-gray-200 text-gray-600 hover:border-pink-300"
          }`,
        },
        "45 min"
      )
    ),

    React.createElement(
      "div",
      { className: "flex justify-center items-center gap-2 mb-4" },
      React.createElement("input", {
        type: "number",
        value: customTime,
        onChange: handleCustomTimeChange,
        className:
          "w-20 px-2 py-1 border border-gray-300 rounded-lg text-center",
        min: "1",
        max: "300",
      }),
      React.createElement("span", { className: "text-gray-500" }, "minutes")
    ),

    React.createElement(
      "button",
      {
        onClick: handleSubmit,
        className:
          "bg-[#e31b53] text-white font-medium px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors",
      },
      "Set Time"
    )
  );
}

function Dashboard() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [screenTimeLimit, setScreenTimeLimit] = useState(40);
  const [selectedTimeOption, setSelectedTimeOption] = useState(null);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [recentlyWatchedDropdownOpen, setRecentlyWatchedDropdownOpen] =
    useState(false);
  const [childrenData, setChildrenData] = useState(children);
  const [isScreenTimeUpdated, setIsScreenTimeUpdated] = useState(false);

  const toggleMenu = (id) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  const handleSetScreenTime = (time) => {
    setSelectedTimeOption(time);
    setScreenTimeLimit(time);
    setIsScreenTimeUpdated(true);
  };

  // Apply screen time limit to children
  useEffect(() => {
    if (isScreenTimeUpdated) {
      // Here we would normally update the database or make an API call
      // For demonstration, we'll just update the local state
      const updatedChildren = childrenData.map((child) => ({
        ...child,
        screenTime: screenTimeLimit,
      }));

      setChildrenData(updatedChildren);
      setIsScreenTimeUpdated(false);
    }
  }, [isScreenTimeUpdated, screenTimeLimit]);

  return React.createElement(
    "div",
    { className: "min-h-screen bg-gradient-to-b from-blue-100 to-blue-300" },
    React.createElement(Navbar, null),

    React.createElement(
      "main",
      { className: "container mx-auto px-4 py-6 max-w-6xl" },
      // Parent Dashboard Title - Fixed parent image
      React.createElement(
        "div",
        { className: "flex flex-col items-center justify-center mb-8" },

        React.createElement(
          "div",
          { className: "relative w-30 h-20 overflow-hidden rounded-full" },
          React.createElement("img", {
            src: "/parent.png",
            alt: "parent image",
            className: "w-full h-full object-cover",
          })
        ),
        React.createElement(
          "h1",
          { className: "text-2xl font-bold text-gray-800" },
          "Parent Dashboard"
        )
      ),

      // Children Profiles
      React.createElement(
        "div",
        { className: "flex justify-center gap-6 mb-8 flex-wrap" },
        childrenData.map((child) =>
          React.createElement(ChildProfile, {
            key: child.id,
            name: child.name,
            image: child.image,
            screenTime: child.screenTime,
          })
        )
      ),

      // Dashboard Content
      React.createElement(
        "div",
        { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8" },
        // Screen Time Section
        React.createElement(
          "div",
          { className: "bg-white rounded-xl shadow-md overflow-hidden" },
          React.createElement(
            "div",
            { className: "p-6" },
            React.createElement(
              "h2",
              { className: "text-xl font-bold text-center mb-1" },
              "Screen Time"
            ),
            React.createElement(
              "p",
              { className: "text-[#e31b53] text-sm text-center mb-6" },
              "Activities of last week"
            ),

            React.createElement(BarChart, { data: screenTimeData }),

            React.createElement(
              "div",
              {
                className:
                  "bg-gradient-to-r from-[#e31b53] to-pink-400 text-white p-4 rounded-lg my-6",
              },
              React.createElement(
                "p",
                { className: "text-sm mb-1" },
                "Daily average screen time"
              ),
              React.createElement(
                "h3",
                { className: "text-2xl font-bold mb-1" },
                `${screenTimeLimit} min`
              ),
              React.createElement(
                "p",
                { className: "text-xs opacity-80" },
                "(Limit more than daily average)"
              )
            ),

            // Using the new ScreenTimeSetter component
            React.createElement(ScreenTimeSetter, {
              onSetTime: handleSetScreenTime,
              screenTimeLimit: screenTimeLimit,
              selectedTimeOption: selectedTimeOption,
            })
          )
        ),

        // Right Section
        React.createElement(
          "div",
          { className: "flex flex-col gap-6" },
          // Most Watched Category
          React.createElement(
            "div",
            { className: "bg-white rounded-xl shadow-md overflow-hidden" },
            React.createElement(
              "div",
              { className: "p-4" },
              React.createElement(
                "div",
                {
                  className: "flex items-center justify-between cursor-pointer",
                  onClick: () => setCategoryDropdownOpen(!categoryDropdownOpen),
                },
                React.createElement(
                  "div",
                  { className: "flex items-center gap-3" },
                  React.createElement(
                    "div",
                    { className: "bg-yellow-100 p-2 rounded-lg" },
                    React.createElement("img", {
                      src: "/watchTime.png",
                      alt: "Category",
                      className: "w-5 h-5",
                    })
                  ),
                  React.createElement(
                    "span",
                    { className: "font-medium" },
                    "Most Watched Category"
                  )
                ),
                React.createElement(
                  "svg",
                  {
                    className: `w-5 h-5 text-gray-500 transition-transform ${
                      categoryDropdownOpen ? "rotate-180" : ""
                    }`,
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    xmlns: "http://www.w3.org/2000/svg",
                  },
                  React.createElement("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2",
                    d: "M19 9l-7 7-7-7",
                  })
                )
              ),

              categoryDropdownOpen &&
                React.createElement(
                  "div",
                  {
                    className:
                      "mt-3 border border-gray-100 rounded-lg overflow-hidden",
                  },
                  categories.map((category, index) =>
                    React.createElement(
                      "div",
                      {
                        key: index,
                        className: `p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                          index < categories.length - 1
                            ? "border-b border-gray-100"
                            : ""
                        }`,
                      },
                      category
                    )
                  )
                )
            )
          ),

          // Recently Watched Show
          React.createElement(
            "div",
            { className: "bg-white rounded-xl shadow-md overflow-hidden" },
            React.createElement(
              "div",
              { className: "p-4" },
              React.createElement(
                "div",
                {
                  className: "flex items-center justify-between cursor-pointer",
                  onClick: () =>
                    setRecentlyWatchedDropdownOpen(
                      !recentlyWatchedDropdownOpen
                    ),
                },
                React.createElement(
                  "div",
                  { className: "flex items-center gap-3" },
                  React.createElement(
                    "div",
                    { className: "bg-blue-100 p-2 rounded-lg" },
                    React.createElement("img", {
                      src: "/tv.png",
                      alt: "TV",
                      className: "w-5 h-5",
                    })
                  ),
                  React.createElement(
                    "span",
                    { className: "font-medium" },
                    "Recently Watched Show"
                  )
                ),
                React.createElement(
                  "svg",
                  {
                    className: `w-5 h-5 text-gray-500 transition-transform ${
                      recentlyWatchedDropdownOpen ? "rotate-180" : ""
                    }`,
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    xmlns: "http://www.w3.org/2000/svg",
                  },
                  React.createElement("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2",
                    d: "M19 9l-7 7-7-7",
                  })
                )
              ),

              recentlyWatchedDropdownOpen &&
                React.createElement(
                  "div",
                  {
                    className:
                      "mt-3 border border-gray-100 rounded-lg overflow-hidden",
                  },
                  watchHistory.slice(0, 2).map((show) =>
                    React.createElement(
                      "div",
                      {
                        key: show.id,
                        className:
                          "p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100",
                      },
                      React.createElement("img", {
                        src: show.image,
                        alt: show.title,
                        className: "w-10 h-10 rounded object-cover",
                      }),
                      React.createElement(
                        "div",
                        null,
                        React.createElement(
                          "div",
                          { className: "font-medium text-sm" },
                          show.title
                        ),
                        React.createElement(
                          "div",
                          { className: "text-xs text-gray-500" },
                          `${show.description.substring(0, 30)}...`
                        )
                      )
                    )
                  )
                )
            )
          ),

          // History Section
          React.createElement(
            "div",
            {
              className: "bg-white rounded-xl shadow-md overflow-hidden flex-1",
            },
            React.createElement(
              "div",
              { className: "p-4 flex flex-col h-full" },
              React.createElement(
                "div",
                { className: "flex items-center gap-3 mb-4" },
                React.createElement(
                  "div",
                  { className: "bg-purple-100 p-2 rounded-lg" },
                  React.createElement(History)
                ),
                React.createElement(
                  "span",
                  { className: "font-medium" },
                  "Watch History"
                )
              ),

              React.createElement(
                "div",
                { className: "flex-1 overflow-y-auto" },
                watchHistory.map((show) =>
                  React.createElement(
                    "div",
                    {
                      key: show.id,
                      className:
                        "py-3 flex items-center justify-between border-b border-gray-100 last:border-b-0",
                    },
                    React.createElement(
                      "div",
                      { className: "flex items-center gap-3" },
                      React.createElement("img", {
                        src: show.image,
                        alt: show.title,
                        className: "w-10 h-10 rounded object-cover",
                      }),
                      React.createElement(
                        "div",
                        null,
                        React.createElement(
                          "div",
                          { className: "font-medium text-sm" },
                          show.title
                        ),
                        React.createElement(
                          "div",
                          { className: "text-xs text-gray-500" },
                          `${show.description.substring(0, 30)}...`
                        )
                      )
                    ),

                    React.createElement(
                      "div",
                      { className: "relative" },
                      React.createElement(
                        "button",
                        {
                          onClick: () => toggleMenu(show.id),
                          className:
                            "p-1 rounded-full hover:bg-gray-100 transition-colors",
                        },
                        React.createElement(
                          "svg",
                          {
                            className: "w-5 h-5 text-gray-500",
                            fill: "currentColor",
                            viewBox: "0 0 24 24",
                            xmlns: "http://www.w3.org/2000/svg",
                          },
                          React.createElement("path", {
                            d: "M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z",
                          })
                        )
                      ),

                      activeMenu === show.id &&
                        React.createElement(
                          "div",
                          {
                            className:
                              "absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-gray-100 w-40 z-10",
                          },
                          React.createElement(
                            "div",
                            {
                              className:
                                "py-2 px-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100",
                            },
                            "View Details"
                          ),
                          React.createElement(
                            "div",
                            {
                              className:
                                "py-2 px-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100",
                            },
                            "Add to Favorites"
                          ),
                          React.createElement(
                            "div",
                            {
                              className:
                                "py-2 px-3 hover:bg-gray-50 cursor-pointer transition-colors text-[#e31b53]",
                            },
                            "Remove from History"
                          )
                        )
                    )
                  )
                )
              )
            )
          )
        )
      ),

      // View Report Button
      React.createElement(
        "div",
        { className: "text-center" },
        React.createElement(
          "button",
          {
            className:
              "bg-gradient-to-r from-[#e31b53] to-pink-400 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-0.5",
          },
          "View Report"
        )
      )
    )
  );
}

export default Dashboard;
