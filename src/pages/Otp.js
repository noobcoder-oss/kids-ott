import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { QrCode, ArrowLeft } from "lucide-react";

const Otp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [showQR, setShowQR] = useState(false);
  const [error, setError] = useState("");

  // Reference for OTP input fields
  const inputRefs = Array(4)
    .fill(0)
    .map(() => React.createRef());

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple digits in one input

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const validateOtp = () => {
    const otpString = otp.join("");
    if (otpString.length !== 4) {
      setError("Please enter a complete 4-digit OTP");
      return false;
    }
    if (!/^\d+$/.test(otpString)) {
      setError("OTP must contain only numbers");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateOtp()) {
      console.log("Verifying OTP:", otp.join(""));
      // Add your OTP verification logic here
      navigate("/profileSetup");
    }
  };

  const toggleQRCode = () => {
    setShowQR(!showQR);
  };

  return React.createElement(
    "div",
    {
      className:
        "bg-cover bg-center bg-[#88c824] rounded-lg shadow-lg min-h-screen flex flex-col relative",
    },

    // Header
    React.createElement(
      "div",
      {
        className:
          "flex items-center justify-between px-4 py-2 sm:px-6 lg:px-10",
      },
      React.createElement("img", {
        src: "/authLogo.png",
        alt: "logo",
        className: "h-8 sm:h-10 lg:h-12 w-auto transition-all duration-300",
      }),
      React.createElement(
        Link,
        { to: "/signup" },
        React.createElement(
          "button",
          {
            className:
              "bg-[#e31b53] text-white px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2 text-sm sm:text-base rounded-md hover:bg-[#c11641] transition-transform hover:scale-105 active:scale-95 shadow-md duration-200 ease-in-out",
          },
          "Sign Up"
        )
      )
    ),

    // Back Button
    React.createElement(
      Link,
      {
        to: "/signin",
        className: "absolute top-20 left-4 sm:left-6 lg:left-10",
      },
      React.createElement(
        "button",
        {
          className:
            "text-white flex items-center gap-2 hover:text-[#e31b53] transition-colors duration-300",
        },
        React.createElement(ArrowLeft, { size: 20 }),
        React.createElement(
          "span",
          { className: "text-sm sm:text-base" },
          "Back to Sign In"
        )
      )
    ),

    // Welcome Section
    React.createElement(
      "div",
      { className: "text-center px-4 py-4 sm:py-6 mt-8 sm:mt-12 lg:mt-16" },
      React.createElement(
        "h1",
        {
          className:
            "text-xl sm:text-2xl lg:text-4xl font-bold mb-2 text-[#85231d] mt-6",
        },
        "Almost There!"
      ),
      React.createElement(
        "p",
        { className: "text-[#e31b53] text-xs sm:text-sm lg:text-base" },
        "Log in to pick up your story where you left off."
      )
    ),

    // Main Content
    React.createElement(
      "div",
      {
        className:
          "flex-grow flex items-start justify-center px-4 py-4 sm:py-6",
      },
      React.createElement("img", {
        src: "/shrek1.png",
        alt: "side image",
        className: "w-54 h-auto hidden lg:block absolute bottom-0 left-0 w-1/3",
      }),
      React.createElement(
        "div",
        { className: "w-full max-w-md space-y-6" },
        !showQR
          ? // OTP Input Form
            React.createElement(
              "form",
              { onSubmit: handleSubmit, className: "space-y-6" },
              React.createElement(
                "p",
                {
                  className:
                    "text-white text-center text-xs sm:text-sm lg:text-base",
                },
                "Enter Your 4-digit OTP"
              ),
              React.createElement(
                "div",
                { className: "space-y-4" },
                React.createElement(
                  "div",
                  { className: "flex justify-center gap-3 space-x-4" },
                  otp.map((digit, index) =>
                    React.createElement("input", {
                      key: index,
                      ref: inputRefs[index],
                      type: "text",
                      maxLength: "1",
                      value: digit,
                      onChange: (e) => handleOtpChange(index, e.target.value),
                      onKeyDown: (e) => handleKeyDown(index, e),
                      className:
                        "w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-center text-xl sm:text-2xl bg-gray-50 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#e31b53] hover:ring-1 hover:ring-[#e31b53]/50 transition duration-300",
                    })
                  )
                ),
                error &&
                  React.createElement(
                    "p",
                    { className: "text-red-500 text-center text-sm" },
                    error
                  )
              ),
              React.createElement(
                "button",
                {
                  type: "submit",
                  className:
                    "w-full bg-[#e31b53] text-white py-2 sm:py-3 rounded-md hover:bg-[#c4164a] active:bg-[#a01238] transform hover:scale-[1.02] active:scale-95 transition duration-300 ease-in-out shadow-md hover:shadow-lg text-sm sm:text-base",
                },
                "Let's Watch"
              )
            )
          : // QR Code Section
            React.createElement(
              "div",
              { className: "text-center space-y-4" },
              React.createElement(
                "div",
                { className: "bg-white p-4 rounded-lg inline-block" },
                React.createElement("img", {
                  src: "https://play-lh.googleusercontent.com/lomBq_jOClZ5skh0ELcMx4HMHAMW802kp9Z02_A84JevajkqD87P48--is1rEVPfzGVf",
                  alt: "QR Code",
                  className: "mx-auto",
                })
              ),
              React.createElement(
                "p",
                { className: "text-white text-sm sm:text-base" },
                "Scan this QR code with your authenticator app"
              )
            ),

        // Toggle Option
        React.createElement(
          "button",
          {
            onClick: toggleQRCode,
            className:
              "w-full flex items-center justify-center gap-2 text-white hover:text-[#e31b53] transition-colors duration-300",
          },
          React.createElement(QrCode, { size: 20 }),
          React.createElement(
            "span",
            { className: "text-sm sm:text-base" },
            showQR ? "Enter OTP manually" : "Use QR Code instead"
          )
        ),

        // Sign Up Link
        React.createElement(
          "p",
          { className: "text-center text-[#e31b53] text-xs sm:text-sm mt-4" },
          "New Here? ",
          React.createElement(
            Link,
            {
              to: "/signup",
              className: "font-bold hover:underline  transition duration-300",
            },
            "Signup now"
          ),
          " to unlock endless entertainment"
        )
      )
    ),
    React.createElement("img", {
      src: "/shrek2.png",
      alt: "side image",
      className: "w-60 h-auto hidden lg:block absolute bottom-0 right-0 w-1/3",
    })
  );
};

export default Otp;
