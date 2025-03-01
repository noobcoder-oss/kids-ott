import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Navbar from "../components/Navbar";

const ScreenTime = () => {
  // State management
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(30);
  const [dailyAverage, setDailyAverage] = useState({ hours: 2, minutes: 40 });
  const [weeklyData, setWeeklyData] = useState([
    { day: "Monday", screenTime: 5.5 },
    { day: "Tuesday", screenTime: 4.2 },
    { day: "Wednesday", screenTime: 4.8 },
    { day: "Thursday", screenTime: 3.0 },
    { day: "Friday", screenTime: 5.5 },
    { day: "Saturday", screenTime: 1.5 },
  ]);

  // Calculate the difference from average
  const calculateDifference = () => {
    const totalMinutes = weeklyData.reduce(
      (acc, day) => acc + day.screenTime * 60,
      0
    );
    const avgMinutes = totalMinutes / weeklyData.length;
    const difference = Math.round(
      avgMinutes - (dailyAverage.hours * 60 + dailyAverage.minutes)
    );
    return difference;
  };

  // Handle time adjustments
  const adjustTime = (type, operation) => {
    if (type === "hours") {
      setHours((prev) => {
        const newValue = operation === "increment" ? prev + 1 : prev - 1;
        return Math.min(Math.max(0, newValue), 12);
      });
    } else {
      setMinutes((prev) => {
        const newValue = operation === "increment" ? prev + 30 : prev - 30;
        if (newValue >= 60) {
          setHours((h) => Math.min(h + 1, 12));
          return 0;
        }
        if (newValue < 0 && hours > 0) {
          setHours((h) => h - 1);
          return 30;
        }
        return Math.min(Math.max(0, newValue), 59);
      });
    }
  };

  // Handle timer setting
  const handleSetTimer = () => {
    const totalMinutes = hours * 60 + minutes;
    alert(
      `Screen time limit set to ${hours}hr ${minutes}min (${totalMinutes} minutes)`
    );
    // Here you would typically make an API call to save the timer
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return React.createElement(
        "div",
        {
          className: "bg-white p-2 rounded shadow",
        },
        [
          React.createElement(
            "p",
            { key: "label", className: "text-gray-600" },
            label
          ),
          React.createElement(
            "p",
            { key: "value", className: "text-gray-900 font-bold" },
            `${payload[0].value} hours`
          ),
        ]
      );
    }
    return null;
  };

  return React.createElement(
    "div",
    {
      className: "min-h-screen bg-gradient-to-b from-blue-100 to-blue-500",
    },
    [
      React.createElement(Navbar, { key: "navbar" }),

      React.createElement(
        "div",
        {
          key: "content",
          className: "max-w-3xl mx-auto pt-8 px-4 sm:px-6 lg:px-8",
        },
        [
          React.createElement(
            "h1",
            {
              key: "title",
              className: "text-2xl md:text-3xl font-bold text-center mb-8",
            },
            "Screen Time"
          ),

          // Daily Average Card
          React.createElement(
            "div",
            {
              key: "average-card",
              className:
                "bg-[#e31b53] rounded-lg p-4 md:p-6 mb-8 text-white text-center transform hover:scale-105 transition-transform duration-200",
            },
            [
              React.createElement(
                "h2",
                {
                  key: "average-title",
                  className: "text-2xl md:text-3xl font-bold mb-2",
                },
                `${dailyAverage.hours} hr ${dailyAverage.minutes} min`
              ),
              React.createElement(
                "p",
                {
                  key: "average-subtitle",
                  className: "text-sm md:text-base opacity-90",
                },
                `${Math.abs(calculateDifference())} min ${
                  calculateDifference() > 0 ? "more" : "less"
                } than daily average`
              ),
            ]
          ),

          // Activities Section
          React.createElement(
            "div",
            {
              key: "activities-section",
              className: "mb-8",
            },
            [
              React.createElement(
                "h2",
                {
                  key: "activities-title",
                  className:
                    "text-lg md:text-xl font-semibold text-center text-white mb-4",
                },
                "Activities of last week"
              ),
              React.createElement(
                "div",
                {
                  key: "chart",
                  className: "h-64 md:h-80 w-[90%] sm:w-full",
                },
                [
                  React.createElement(
                    ResponsiveContainer,
                    {
                      key: "chart-container",
                      width: "100%",
                      height: "100%",
                    },
                    [
                      React.createElement(
                        BarChart,
                        {
                          key: "bar-chart",
                          data: weeklyData,
                          margin: { top: 20, right: 30, left: 20, bottom: 5 },
                        },
                        [
                          React.createElement(CartesianGrid, {
                            key: "grid",
                            strokeDasharray: "3 3",
                            vertical: false,
                          }),
                          React.createElement(XAxis, {
                            key: "x-axis",
                            dataKey: "day",
                            tick: { fill: "white" },
                          }),
                          React.createElement(YAxis, {
                            key: "y-axis",
                            tick: { fill: "white" },
                          }),
                          React.createElement(Tooltip, {
                            key: "tooltip",
                            content: CustomTooltip,
                          }),
                          React.createElement(Bar, {
                            key: "bar",
                            dataKey: "screenTime",
                            fill: "#FFD700",
                            radius: [4, 4, 0, 0],
                          }),
                        ]
                      ),
                    ]
                  ),
                ]
              ),
            ]
          ),

          // Timer Section
          React.createElement(
            "div",
            {
              key: "timer-section",
              className: "text-center",
            },
            [
              React.createElement(
                "button",
                {
                  key: "timer-button",
                  className:
                    "bg-white text-[#e31b53] rounded-full py-2 px-6 mb-6 inline-flex items-center gap-2 hover:bg-gray-100 transition-colors duration-200",
                  onClick: () =>
                    document
                      .getElementById("timeControls")
                      .scrollIntoView({ behavior: "smooth" }),
                },
                [
                  React.createElement(
                    "span",
                    {
                      key: "timer-icon",
                      className: "w-5 h-5",
                    },
                    "⏰"
                  ),
                  "Set Screen Timer",
                ]
              ),

              React.createElement(
                "div",
                {
                  key: "time-inputs",
                  id: "timeControls",
                  className:
                    "flex flex-col sm:flex-row justify-center items-center gap-4 mb-6",
                },
                [
                  // Hours control
                  React.createElement(
                    "div",
                    {
                      key: "hours-control",
                      className: "flex items-center gap-2",
                    },
                    [
                      React.createElement(
                        "button",
                        {
                          key: "hours-decrement",
                          className:
                            "bg-[#e31b53] text-white w-8 h-8 rounded-full hover:bg-red-700 flex items-center justify-center",
                          onClick: () => adjustTime("hours", "decrement"),
                        },
                        React.createElement(
                          "span",
                          { className: "inline-block" },
                          "-"
                        )
                      ),
                      React.createElement(
                        "div",
                        {
                          key: "hours",
                          className:
                            "bg-[#e31b53] text-white py-2 px-6 rounded-lg min-w-[100px]",
                        },
                        `${hours} hr`
                      ),
                      React.createElement(
                        "button",
                        {
                          key: "hours-increment",
                          className:
                            "bg-[#e31b53] text-white w-8 h-8 rounded-full hover:bg-red-700 flex items-center justify-center",
                          onClick: () => adjustTime("hours", "increment"),
                        },
                        React.createElement(
                          "span",
                          { className: "inline-block" },
                          "+"
                        )
                      ),
                    ]
                  ),

                  // Minutes control
                  React.createElement(
                    "div",
                    {
                      key: "minutes-control",
                      className: "flex items-center gap-2",
                    },
                    [
                      React.createElement(
                        "button",
                        {
                          key: "minutes-decrement",
                          className:
                            "bg-[#e31b53] text-white w-8 h-8 rounded-full hover:bg-red-700 flex items-center justify-center",
                          onClick: () => adjustTime("minutes", "decrement"),
                        },
                        React.createElement(
                          "span",
                          { className: "inline-block" },
                          "-"
                        )
                      ),
                      React.createElement(
                        "div",
                        {
                          key: "minutes",
                          className:
                            "bg-[#e31b53] text-white py-2 px-6 rounded-lg min-w-[100px]",
                        },
                        `${minutes} min`
                      ),
                      React.createElement(
                        "button",
                        {
                          key: "minutes-increment",
                          className:
                            "bg-[#e31b53] text-white w-8 h-8 rounded-full hover:bg-red-700 flex items-center justify-center",
                          onClick: () => adjustTime("minutes", "increment"),
                        },
                        React.createElement(
                          "span",
                          { className: "inline-block" },
                          "+"
                        )
                      ),
                    ]
                  ),
                ]
              ),

              React.createElement(
                "button",
                {
                  key: "set-time-button",
                  className:
                    "bg-white text-[#e31b53] rounded-lg py-2 px-12 font-semibold hover:bg-gray-100 transition-colors duration-200",
                  onClick: handleSetTimer,
                },
                "Set Time"
              ),
            ]
          ),
        ]
      ),
    ]
  );
};

export default ScreenTime;
