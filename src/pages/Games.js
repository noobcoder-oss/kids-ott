import React from "react";
import Navbar from "../components/Navbar";
import AvailableTasks from "../components/AvailableTasks"; // Import the new component

function Games() {
  const categories = [
    {
      title: "🎲 Brain Boosters",
      description:
        "Solve jigsaw puzzles featuring favorite cartoon characters & movie scenes.",
      imgSrc: "/games/Explore1.png",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Memory Match 🧠",
      description: "Flip and match cards featuring animated characters.",
      imgSrc: "/games/Explore2.png",
      bgColor: "bg-blue-100",
    },
    {
      title: "Coloring Fun 🎨",
      description: "Digital coloring book with animated drawings",
      imgSrc: "/games/Explore3.png",
      bgColor: "bg-green-100",
    },
    {
      title: "Word Hunt 🔠",
      description: "Digital coloring book with animated drawings",
      imgSrc: "/games/Explore4.png",
      bgColor: "bg-orange-100",
    },
  ];

  const characters = [
    "/games/Kid1.png",
    "/games/Kid2.png",
    "/games/Kid3.png",
    "/games/Kid4.png",
  ];

  return React.createElement("div", { className: "h-full bg-white" }, [
    React.createElement(Navbar, { key: "navbar" }),

    // Hero Section
    React.createElement(
      "div",
      {
        key: "hero",
        className:
          "bg-[#fff94c] pb-0 relative min-h-[500px] md:min-h-[600px] lg:min-h-[700px]",
      },
      [
        // Content Container
        React.createElement(
          "div",
          {
            className: "max-w-6xl mx-auto relative z-10 pt-8",
          },
          [
            React.createElement(
              "div",
              {
                className: "flex flex-col items-center gap-8",
              },
              [
                // Coins Section
                React.createElement(
                  "div",
                  { className: "flex justify-end w-full px-4" },
                  React.createElement(
                    "div",
                    {
                      className:
                        "flex justify-end items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-[#e31b53]",
                    },
                    [
                      React.createElement("img", {
                        src: "/games/Coins.png",
                        alt: "Coins",
                        className: "w-6 h-6",
                      }),
                      React.createElement(
                        "span",
                        {
                          className: "text-lg font-semibold",
                        },
                        "Your Supercoins"
                      ),
                    ]
                  )
                ),

                // Title
                React.createElement(
                  "h1",
                  {
                    className:
                      "text-3xl md:text-5xl lg:text-6xl font-bold text-[#e31b53] text-center leading-tight max-w-4xl px-4",
                  },
                  "Welcome to Game Zone - Play, Learn & Earn Rewards!"
                ),
              ]
            ),
          ]
        ),

        // Hero Images Container
        React.createElement(
          "div",
          {
            className:
              "absolute bottom-0 left-0 right-0 w-full overflow-hidden",
          },
          React.createElement(
            "div",
            {
              className:
                "max-w-[1440px] mx-auto flex justify-between items-end px-4",
            },
            [
              // Left Image
              React.createElement(
                "div",
                {
                  className: "hidden lg:block w-[320px]",
                },
                React.createElement("img", {
                  src: "/shrek2.png",
                  alt: "Start your journey",
                  className: "w-full h-auto object-contain",
                })
              ),

              // Middle Image - Shown on all screens - INCREASED SIZE
              React.createElement(
                "div",
                {
                  className:
                    "w-[380px] md:w-[450px] lg:w-[400px] mx-auto lg:mx-0",
                },
                React.createElement("img", {
                  src: "/games/heroImage2.png",
                  alt: "Continue playing",
                  className: "w-full h-full object-contain",
                })
              ),

              // Right Image - INCREASED SIZE
              React.createElement(
                "div",
                {
                  className: "hidden lg:block w-[380px]",
                },
                React.createElement("img", {
                  src: "/games/heroImage3.png",
                  alt: "Complete your journey",
                  className: "w-full h-auto object-contain",
                })
              ),
            ]
          )
        ),
      ]
    ),

    // Available Tasks Section - Added after Hero section
    React.createElement(AvailableTasks, { key: "available-tasks" }),

    // Game Categories
    React.createElement(
      "div",
      {
        key: "categories",
        className: "max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12",
      },
      [
        React.createElement(
          "h2",
          { className: "text-2xl font-bold mb-6 md:mb-8" },
          "Explore Game Categories"
        ),
        React.createElement(
          "div",
          {
            className:
              "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6",
          },
          categories.map((category, index) =>
            React.createElement(
              "div",
              {
                key: index,
                className: `${category.bgColor} rounded-xl p-6 flex flex-col h-full transition-transform hover:scale-105 cursor-pointer`,
              },
              [
                React.createElement(
                  "div",
                  { className: "flex flex-col flex-grow" },
                  [
                    React.createElement(
                      "h3",
                      { className: "text-xl font-semibold mb-3" },
                      category.title
                    ),
                    React.createElement(
                      "p",
                      { className: "text-sm text-gray-700 mb-4 flex-grow" },
                      category.description
                    ),
                  ]
                ),
                React.createElement(
                  "div",
                  {
                    className:
                      "relative w-full aspect-square max-w-[200px] mx-auto",
                  },
                  React.createElement("img", {
                    src: category.imgSrc,
                    alt: category.title,
                    className: "w-full h-full object-cover rounded-lg",
                  })
                ),
              ]
            )
          )
        ),
      ]
    ),

    // Characters Section
    React.createElement(
      "div",
      {
        key: "characters",
        className: "max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12",
      },
      [
        React.createElement(
          "h2",
          { className: "text-2xl font-bold mb-6 md:mb-8 text-start" },
          "Meet Your Learning Buddies"
        ),
        React.createElement(
          "div",
          {
            className:
              "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6",
          },
          characters.map((character, index) =>
            React.createElement(
              "div",
              { key: index, className: "relative group" },
              [
                React.createElement(
                  "div",
                  {
                    className:
                      "aspect-square w-full overflow-hidden rounded-xl bg-white shadow-md transition-transform hover:scale-105",
                  },
                  React.createElement("img", {
                    src: character,
                    alt: `Character ${index + 1}`,
                    className: "w-full h-full object-contain p-4",
                  })
                ),
                React.createElement(
                  "div",
                  {
                    className:
                      "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
                  },
                  React.createElement(
                    "button",
                    {
                      className:
                        "bg-white px-4 py-2 rounded-full shadow-lg text-sm font-medium text-purple-600",
                    },
                    "Select Character"
                  )
                ),
              ]
            )
          )
        ),
      ]
    ),
  ]);
}

export default Games;
