import React, { useState } from "react";

function AvailableTasks() {
  const [completedTasks, setCompletedTasks] = useState({
    watchLearn: false,
    characterCollection: false,
    playWin: false,
    streakMaster: false,
  });

  const handleCompleteTask = (taskId) => {
    setCompletedTasks({
      ...completedTasks,
      [taskId]: true,
    });
    // You could add additional logic here like updating user's supercoins
  };

  const tasks = [
    {
      id: "watchLearn",
      title: "Watch & Learn Challenges",
      description: "Watch 5 educational videos in a week",
      progress: "2/5 completed",
      image: "/games/watch-learn.png",
      color: "border-pink-500",
      hoverColor: "hover:border-pink-600",
    },
    {
      id: "characterCollection",
      title: "Character Collection Challenge",
      description:
        "Watch 5 episodes from different shows to unlock character avatars",
      progress: "2/5 completed",
      image: "/games/Kid2.png",
      color: "border-blue-500",
      hoverColor: "hover:border-blue-600",
    },
    {
      id: "playWin",
      title: "Play & Win",
      description:
        "Answer 10 quiz questions correctly after watching an episode",
      progress: "4/10 completed",
      image: "/games/Explore1.png",
      color: "border-green-500",
      hoverColor: "hover:border-green-600",
    },
    {
      id: "streakMaster",
      title: "Streak Master",
      description: "Maintain 7-day watching streak",
      progress: "5/7 completed",
      image: "/games/watch-learn.png",
      color: "border-purple-500",
      hoverColor: "hover:border-purple-600",
    },
  ];

  return React.createElement(
    "div",
    {
      className: "max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 bg-white",
    },
    [
      // Section Header
      React.createElement(
        "div",
        {
          key: "header",
          className: "mb-6",
        },
        [
          React.createElement(
            "h2",
            { className: "text-2xl font-bold text-black" },
            "Available Tasks"
          ),
          React.createElement(
            "p",
            { className: "text-sm text-[#e31b53]" },
            "Complete your daily task and win exciting prizes"
          ),
        ]
      ),

      // Tasks Grid
      React.createElement(
        "div",
        {
          key: "tasks-grid",
          className:
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6",
        },
        tasks.map((task) =>
          React.createElement(
            "div",
            {
              key: task.id,
              className: `border-2 ${task.color} ${task.hoverColor} rounded-xl p-4 flex flex-col h-full bg-white shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1`,
            },
            [
              // Task Image
              React.createElement(
                "div",
                {
                  key: `${task.id}-image`,
                  className: "flex justify-center mb-4",
                },
                React.createElement("img", {
                  src: task.image,
                  alt: task.title,
                  className:
                    "w-32 h-32 object-contain transition-transform duration-300 hover:scale-110",
                })
              ),

              // Task Title
              React.createElement(
                "h3",
                {
                  key: `${task.id}-title`,
                  className: "text-center font-semibold text-md mb-1",
                },
                task.title
              ),

              // Task Description
              React.createElement(
                "p",
                {
                  key: `${task.id}-desc`,
                  className: "text-center text-xs text-gray-700 mb-2",
                },
                task.description
              ),

              // Task Progress
              React.createElement(
                "p",
                {
                  key: `${task.id}-progress`,
                  className: "text-center text-xs text-gray-500 mb-3",
                },
                task.progress
              ),

              // Complete Task Button
              React.createElement(
                "div",
                {
                  key: `${task.id}-button`,
                  className: "mt-auto flex justify-center",
                },
                React.createElement(
                  "button",
                  {
                    onClick: () => handleCompleteTask(task.id),
                    disabled: completedTasks[task.id],
                    className:
                      "bg-[#e31b53] hover:bg-[#c01747] text-white rounded-full px-4 py-2 flex items-center justify-center transition-colors duration-200 hover:shadow-md",
                  },
                  [
                    React.createElement("img", {
                      key: `${task.id}-coin-icon`,
                      src: "/games/Coins.png",
                      alt: "Supercoins",
                      className: "w-5 h-5 mr-1",
                    }),
                    React.createElement(
                      "span",
                      {
                        key: `${task.id}-reward`,
                        className: "text-sm font-medium",
                      },
                      "10 Supercoins"
                    ),
                  ]
                )
              ),
            ]
          )
        )
      ),
    ]
  );
}

export default AvailableTasks;
