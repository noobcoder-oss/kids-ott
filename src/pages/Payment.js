import React, { useState } from "react";
import Navbar from "../components/Navbar";

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState(1);
  const [isApproved, setIsApproved] = useState(false);

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
            "max-w-xl w-full bg-white rounded-xl shadow-lg p-6 md:p-8 relative transform transition-all duration-300 hover:shadow-xl",
        },
        [
          React.createElement(
            "h1",
            {
              className:
                "text-2xl md:text-3xl font-bold text-[#e31b53] text-center mb-4",
            },
            "Choose your payment method"
          ),
          React.createElement(
            "p",
            {
              className:
                "text-center mb-6 flex items-center justify-center gap-2 text-gray-700",
            },
            [
              React.createElement("span", { className: "text-lg" }, "🔒"),
              "Secure Checkout – Complete Your Subscription in Just a Few Steps!",
            ]
          ),
          React.createElement(
            "p",
            {
              className: "text-center mb-6 text-lg text-[#e31b53] font-medium",
            },
            "Select a Payment Method"
          ),
          React.createElement(
            "div",
            { className: "flex justify-center gap-4 mb-8" },
            [
              React.createElement(
                "div",
                {
                  className: `border-2 ${
                    selectedMethod === 1 ? "border-blue-500" : "border-gray-200"
                  } rounded p-3 cursor-pointer w-20 h-16 flex items-center justify-center transform transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:shadow-md`,
                  onClick: () => setSelectedMethod(1),
                },
                React.createElement(
                  "div",
                  { className: "text-blue-500 font-bold text-3xl" },
                  React.createElement("img", {
                    src: "https://avatars.githubusercontent.com/u/476675?s=280&v=4",
                    width: "30px",
                  })
                )
              ),
              React.createElement(
                "div",
                {
                  className: `border-2 ${
                    selectedMethod === 2 ? "border-blue-500" : "border-gray-200"
                  } rounded p-3 cursor-pointer w-20 h-16 flex items-center justify-center transform transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:shadow-md`,
                  onClick: () => setSelectedMethod(2),
                },
                React.createElement(
                  "div",
                  { className: "text-blue-800" },
                  React.createElement("img", {
                    src: "https://media.licdn.com/dms/image/v2/C560BAQHggYLcXxs78w/company-logo_200_200/company-logo_200_200/0/1630638664845/razorpay_logo?e=2147483647&v=beta&t=6QV9K9jZitPNz5dcZx-buB-sHzOkyynJY_a6hRN5hQM",
                  })
                )
              ),
              React.createElement(
                "div",
                {
                  className: `border-2 ${
                    selectedMethod === 3 ? "border-blue-500" : "border-gray-200"
                  } rounded p-3 cursor-pointer w-20 h-16 flex items-center justify-center transform transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:shadow-md`,
                  onClick: () => setSelectedMethod(3),
                },
                React.createElement(
                  "div",
                  { className: "text-indigo-600" },
                  React.createElement("img", {
                    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS42uI2JPTWjq_uNG9UFt98jnpHODVQrQHysg&s",
                    width: "30px",
                    className: "rounded-lg",
                  })
                )
              ),
            ]
          ),
          React.createElement("div", { className: "mb-6" }, [
            React.createElement(
              "p",
              { className: "font-medium text-gray-800 mb-2" },
              "Parental Approval Confirmation"
            ),
            React.createElement(
              "label",
              { className: "flex items-start gap-2 cursor-pointer group" },
              [
                React.createElement("input", {
                  type: "checkbox",
                  className: "mt-1 cursor-pointer",
                  checked: isApproved,
                  onChange: () => setIsApproved(!isApproved),
                }),
                React.createElement(
                  "span",
                  {
                    className:
                      "italic text-gray-700 text-sm group-hover:text-gray-900 transition-colors duration-200",
                  },
                  "I confirm that this subscription is made with parental approval."
                ),
              ]
            ),
          ]),
          React.createElement(
            "div",
            { className: "mb-8 text-sm text-gray-700" },
            [
              React.createElement(
                "p",
                { className: "font-medium mb-1" },
                "Subscription Terms"
              ),
              React.createElement("ul", { className: "space-y-1" }, [
                React.createElement("li", { className: "flex items-start" }, [
                  React.createElement("span", { className: "mr-2" }, "•"),
                  "Your plan renews automatically every month.",
                ]),
                React.createElement("li", { className: "flex items-start" }, [
                  React.createElement("span", { className: "mr-2" }, "•"),
                  "Cancel anytime before the next billing cycle to avoid charges.",
                ]),
                React.createElement("li", { className: "flex items-start" }, [
                  React.createElement("span", { className: "mr-2" }, "•"),
                  "100% secure payment with end-to-end encryption.",
                ]),
              ]),
            ]
          ),
          React.createElement(
            "div",
            { className: "flex justify-center" },
            React.createElement(
              "button",
              {
                className: `bg-[#e31b53] text-white py-3 px-6 rounded-full font-medium transition-all duration-300 w-full max-w-xs transform ${
                  isApproved && selectedMethod
                    ? "hover:bg-pink-600 hover:scale-105 hover:shadow-lg opacity-100"
                    : "opacity-50 cursor-not-allowed"
                }`,
                onClick: () => {
                  if (isApproved && selectedMethod) {
                    console.log(
                      `Proceeding to pay with method ${selectedMethod}`
                    );
                  }
                },
                disabled: !isApproved || !selectedMethod,
              },
              "Proceed to Pay"
            )
          ),
        ]
      )
    )
  );
};

export default Payment;
