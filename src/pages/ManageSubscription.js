import React from "react";
import Navbar from "../components/Navbar";

const ManageSubscription = () => {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Navbar, null),
    React.createElement(
      "div",
      {
        className:
          "min-h-screen bg-gradient-to-b from-blue-200 via-blue-300 to-blue-500 flex justify-center items-center p-4",
      },
      React.createElement(
        "div",
        {
          className:
            "max-w-xl w-full bg-white rounded-xl shadow-lg p-6 md:p-8 relative border-2 border-pink-500",
        },
        [
          React.createElement(
            "h1",
            {
              className:
                "text-2xl md:text-3xl font-bold text-black text-center mb-8",
            },
            "Manage Your Subscription"
          ),
          React.createElement(
            "h2",
            {
              className: "text-xl font-semibold text-[#e31b53] mb-6",
            },
            "Subscription Overview"
          ),
          React.createElement(
            "div",
            {
              className: "space-y-4 mb-8",
            },
            [
              React.createElement(
                "div",
                { className: "flex items-center gap-3" },
                [
                  React.createElement("span", { className: "text-xl" }, "📱"),
                  React.createElement(
                    "p",
                    { className: "text-lg" },
                    "Current Plan: Premium"
                  ),
                ]
              ),
              React.createElement(
                "div",
                { className: "flex items-center gap-3" },
                [
                  React.createElement("span", { className: "text-xl" }, "📅"),
                  React.createElement(
                    "p",
                    { className: "text-lg" },
                    "Next Billing Date: (MM/DD/YYYY)"
                  ),
                ]
              ),
              React.createElement(
                "div",
                { className: "flex items-center gap-3" },
                [
                  React.createElement("span", { className: "text-xl" }, "💳"),
                  React.createElement(
                    "p",
                    { className: "text-lg" },
                    "Payment Method: Paypal"
                  ),
                ]
              ),
              React.createElement(
                "div",
                { className: "flex items-center gap-3" },
                [
                  React.createElement("span", { className: "text-xl" }, "💰"),
                  React.createElement(
                    "p",
                    { className: "text-lg" },
                    "Amount Charged: (Subscription Cost)"
                  ),
                ]
              ),
            ]
          ),
          React.createElement(
            "div",
            {
              className: "flex gap-4 justify-between mt-8",
            },
            [
              React.createElement(
                "button",
                {
                  className:
                    "px-6 py-3 rounded-lg border-2 border-[#e31b53] text-[#e31b53] font-medium hover:bg-pink-50 transition-colors duration-300 w-1/2",
                  onClick: () => console.log("Cancel subscription clicked"),
                },
                "Cancel Subscription"
              ),
              React.createElement(
                "button",
                {
                  className:
                    "px-6 py-3 rounded-lg bg-[#e31b53] text-white font-medium hover:bg-pink-600 transition-colors duration-300 w-1/2",
                  onClick: () => console.log("Upgrade plan clicked"),
                },
                "Upgrade Plan"
              ),
            ]
          ),
        ]
      )
    )
  );
};

export default ManageSubscription;
