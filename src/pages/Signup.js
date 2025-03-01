import React, { useState } from "react";
import { Eye, EyeOff, Facebook } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleTogglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = (e) => {
    e.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      password: "",
      confirmPassword: "",
    };

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!formData.email) {
      newErrors.email = "Email or phone number is required";
      isValid = false;
    } else if (
      !emailRegex.test(formData.email) &&
      !phoneRegex.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email or phone number";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      navigate("/whologged");
    }
  };

  const handleSocialLogin = (platform) => {
    console.log(`Logging in with ${platform}`);
  };

  const GoogleIcon = () =>
    React.createElement(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "white",
      },
      [
        React.createElement("path", {
          d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
        }),
        React.createElement("path", {
          d: "M12 23c2.97 0 5.46-1 7.28-2.69l-3.57-2.77c-.99.67-2.26 1.07-3.71 1.07-2.87 0-5.3-1.94-6.16-4.53H2.18v2.84C4 20.2 7.77 23 12 23z",
        }),
        React.createElement("path", {
          d: "M5.84 14.08c-.22-.67-.35-1.39-.35-2.08s.13-1.41.35-2.08V7.08H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.92l3.66-2.84z",
        }),
        React.createElement("path", {
          d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.77 1 4 3.8 2.18 7.08l3.66 2.84c.86-2.59 3.29-4.54 6.16-4.54z",
        }),
      ]
    );

  const XIcon = () =>
    React.createElement(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "currentColor",
      },
      React.createElement("path", {
        d: "M18.36 2H21L14.18 9.84L22 22H15.74L10.84 14.82L5.2 22H2.4L9.72 13.44L2 2H8.42L12.84 8.44L18.36 2ZM17.22 20H18.86L7.14 4H5.34L17.22 20Z",
      })
    );

  return React.createElement(
    "div",
    {
      className:
        "bg-cover bg-center bg-[#ffd315] rounded-lg shadow-lg min-h-screen flex flex-col relative",
    },
    [
      // Header
      React.createElement(
        "div",
        {
          className:
            "flex items-center justify-between px-4 py-2 sm:px-6 lg:px-10",
        },
        [
          React.createElement("img", {
            src: "/authLogo.png",
            alt: "GigglePlay",
            className: "h-8 sm:h-10 lg:h-12 w-auto transition-all duration-300",
          }),
          React.createElement(
            Link,
            { to: "/signin" },
            React.createElement(
              "button",
              {
                className:
                  "bg-[#e31b53] text-white px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2 text-sm sm:text-base rounded-md hover:bg-[#c11641] transition-transform hover:scale-105 active:scale-95 shadow-md duration-200 ease-in-out",
              },
              "Sign In"
            )
          ),
        ]
      ),

      // Welcome Section
      React.createElement(
        "div",
        { className: "text-center px-4 py-4 sm:py-6 mt-8 sm:mt-12 lg:mt-16" },
        [
          React.createElement(
            "h1",
            {
              className:
                "text-xl sm:text-2xl lg:text-4xl font-bold mb-2 text-[#85231d]",
            },
            "Join the Ultimate Streaming Adventure!"
          ),
          React.createElement(
            "p",
            { className: "text-[#e31b53] text-xs sm:text-sm lg:text-base" },
            "Create a Safe & Fun Streaming Experience!"
          ),
        ]
      ),
      React.createElement("img", {
        src: "/minion1.png",
        alt: "minion",
        className:
          "w-auto h-1/2 hidden lg:block absolute bottom-0 left-0 w-1/3",
      }),

      // Form Section
      React.createElement(
        "div",
        {
          className:
            "flex-grow flex items-start justify-center px-4 py-4 sm:py-6",
        },
        React.createElement(
          "form",
          {
            onSubmit: handleSubmit,
            className: "w-full max-w-md space-y-4 sm:space-y-6",
          },
          [
            // Email Input
            React.createElement(
              "div",
              { className: "space-y-1 sm:space-y-2" },
              [
                React.createElement(
                  "label",
                  {
                    className:
                      "block text-xs sm:text-sm font-medium text-white",
                  },
                  "Email or phone number"
                ),
                React.createElement("input", {
                  type: "text",
                  name: "email",
                  value: formData.email,
                  onChange: handleChange,
                  placeholder: "Enter your email or phone number",
                  className: `w-full px-3 py-2 bg-gray-50 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#e31b53] hover:ring-1 hover:ring-[#e31b53]/50 transition duration-300 text-sm sm:text-base ${
                    errors.email ? "ring-2 ring-red-500" : ""
                  }`,
                  required: true,
                }),
                errors.email &&
                  React.createElement(
                    "p",
                    { className: "text-red-500 text-xs sm:text-sm mt-1" },
                    errors.email
                  ),
              ]
            ),

            // Password Input
            React.createElement(
              "div",
              { className: "space-y-1 sm:space-y-2" },
              [
                React.createElement(
                  "label",
                  {
                    className:
                      "block text-xs sm:text-sm font-medium text-white",
                  },
                  "Password"
                ),
                React.createElement("div", { className: "relative" }, [
                  React.createElement("input", {
                    type: showPassword ? "text" : "password",
                    name: "password",
                    value: formData.password,
                    onChange: handleChange,
                    placeholder: "Create a secure password",
                    className: `w-full px-3 py-2 bg-gray-50 text-black rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-[#e31b53] hover:ring-1 hover:ring-[#e31b53]/50 transition duration-300 text-sm sm:text-base ${
                      errors.password ? "ring-2 ring-red-500" : ""
                    }`,
                    required: true,
                  }),
                  React.createElement(
                    "button",
                    {
                      type: "button",
                      onClick: handleTogglePassword,
                      className:
                        "absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#e31b53] transition duration-300",
                    },
                    showPassword
                      ? React.createElement(EyeOff, { size: 18 })
                      : React.createElement(Eye, { size: 18 })
                  ),
                ]),
                errors.password &&
                  React.createElement(
                    "p",
                    { className: "text-red-500 text-xs sm:text-sm mt-1" },
                    errors.password
                  ),
              ]
            ),

            // Confirm Password Input
            React.createElement(
              "div",
              { className: "space-y-1 sm:space-y-2" },
              [
                React.createElement(
                  "label",
                  {
                    className:
                      "block text-xs sm:text-sm font-medium text-white",
                  },
                  "Confirm Password"
                ),
                React.createElement("div", { className: "relative" }, [
                  React.createElement("input", {
                    type: showConfirmPassword ? "text" : "password",
                    name: "confirmPassword",
                    value: formData.confirmPassword,
                    onChange: handleChange,
                    placeholder: "Re-enter your password for safety",
                    className: `w-full px-3 py-2 bg-gray-50 text-black rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-[#e31b53] hover:ring-1 hover:ring-[#e31b53]/50 transition duration-300 text-sm sm:text-base ${
                      errors.confirmPassword ? "ring-2 ring-red-500" : ""
                    }`,
                    required: true,
                  }),
                  React.createElement(
                    "button",
                    {
                      type: "button",
                      onClick: handleToggleConfirmPassword,
                      className:
                        "absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#e31b53] transition duration-300",
                    },
                    showConfirmPassword
                      ? React.createElement(EyeOff, { size: 18 })
                      : React.createElement(Eye, { size: 18 })
                  ),
                ]),
                errors.confirmPassword &&
                  React.createElement(
                    "p",
                    { className: "text-red-500 text-xs sm:text-sm mt-1" },
                    errors.confirmPassword
                  ),
              ]
            ),

            // Submit Button
            React.createElement(
              "button",
              {
                type: "submit",
                className:
                  "w-full bg-[#e31b53] text-white py-2 sm:py-3 rounded-md hover:bg-[#c4164a] active:bg-[#a01238] transform hover:scale-[1.02] active:scale-95 transition duration-300 ease-in-out shadow-md hover:shadow-lg text-sm sm:text-base",
              },
              "Start Streaming"
            ),

            // Social Login Section
            React.createElement(
              "div",
              { className: "flex items-center my-3 sm:my-4" },
              [
                React.createElement("div", {
                  className: "flex-grow border-t border-white",
                }),
                React.createElement(
                  "span",
                  { className: "mx-4 text-[#e31b53] text-xs sm:text-sm" },
                  "or Sign Up with"
                ),
                React.createElement("div", {
                  className: "flex-grow border-t border-white",
                }),
              ]
            ),

            React.createElement(
              "div",
              { className: "flex justify-between space-x-4" },
              [
                React.createElement(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleSocialLogin("Google"),
                    className:
                      "text-white p-2 sm:p-3 rounded-full hover:bg-white/20 active:bg-white/30 transform hover:scale-110 active:scale-90 transition duration-300 ease-in-out",
                  },
                  React.createElement(GoogleIcon)
                ),
                React.createElement(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleSocialLogin("Facebook"),
                    className:
                      "text-white p-2 sm:p-3 rounded-full hover:bg-white/20 active:bg-white/30 transform hover:scale-110 active:scale-90 transition duration-300 ease-in-out",
                  },
                  React.createElement(Facebook, { size: 24 })
                ),
                React.createElement(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleSocialLogin("X"),
                    className:
                      "text-white p-2 sm:p-3 rounded-full hover:bg-white/20 active:bg-white/30 transform hover:scale-110 active:scale-90 transition duration-300 ease-in-out",
                  },
                  React.createElement(XIcon)
                ),
              ]
            ),

            // Terms and Login Links
            React.createElement(
              "p",
              { className: "text-center text-white text-xs sm:text-sm mt-4" },
              [
                "By signing up, you agree to our Terms of Service and Privacy Policy",
              ]
            ),
            React.createElement("hr", { className: "border-t border-white" }),
            React.createElement(
              "p",
              {
                className: "text-center text-[#e31b53] text-xs sm:text-sm mt-4",
              },
              [
                "Already have an account? ",
                React.createElement(
                  Link,
                  {
                    to: "/signin",
                    className:
                      "font-bold hover:underline  transition duration-300",
                  },
                  "Log in"
                ),
                " and dive back in!",
              ]
            ),
          ]
        )
      ),

      React.createElement("img", {
        src: "/minion2.png",
        alt: "minion",
        className:
          "w-auto h-1/2 hidden lg:block absolute bottom-0 right-0 w-1/3",
      }),
    ]
  );
};

export default Signup;
