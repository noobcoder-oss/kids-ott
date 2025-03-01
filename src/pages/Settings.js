import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ArrowRight, Camera } from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    photo: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? URL.createObjectURL(files[0]) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    navigate("/profile");
  };

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Navbar),
    React.createElement(
      "div",
      {
        className:
          "min-h-screen flex justify-center items-center p-6 bg-[#62a6ff]",
        style: {
          backgroundImage: "url('/bg-pink.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        },
      },
      React.createElement(
        "div",
        { className: "bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl" },
        // Header with back button
        React.createElement(
          "div",
          { className: "flex items-center gap-4 mb-6" },
          React.createElement(
            "button",
            {
              onClick: () => navigate("/profile"),
              className: "text-black hover:text-gray-600",
            },
            React.createElement(ArrowRight, {
              className: "w-6 h-6 transform rotate-180",
            })
          ),
          React.createElement(
            "h1",
            { className: "text-2xl font-bold text-black text-center" },
            "Edit Profile"
          )
        ),
        // Form
        React.createElement(
          "form",
          {
            onSubmit: handleSubmit,
            className: "space-y-6",
          },
          // Profile Photo
          React.createElement(
            "div",
            { className: "flex flex-col items-center" },
            React.createElement(
              "label",
              { htmlFor: "photo", className: "cursor-pointer" },
              React.createElement(
                "div",
                {
                  className:
                    "w-24 h-24 rounded-full border-2 border-gray-300 overflow-hidden",
                },
                formData.photo
                  ? React.createElement("img", {
                      src: formData.photo,
                      alt: "Profile",
                      className: "w-full h-full object-cover",
                    })
                  : React.createElement(
                      "div",
                      {
                        className:
                          "w-full h-full flex items-center justify-center text-gray-400",
                      },
                      React.createElement(Camera)
                    )
              )
            ),
            React.createElement("input", {
              type: "file",
              id: "photo",
              name: "photo",
              accept: "image/*",
              onChange: handleChange,
              className: "hidden",
            })
          ),
          // Username field
          React.createElement(
            "div",
            null,
            React.createElement(
              "label",
              { className: "block text-black text-sm font-medium mb-2" },
              "Username"
            ),
            React.createElement("input", {
              type: "text",
              name: "username",
              value: formData.username,
              onChange: handleChange,
              className:
                "w-full p-3 rounded-lg border border-gray-300 text-black bg-white",
              placeholder: "Enter your username",
            })
          ),
          // Email field
          React.createElement(
            "div",
            null,
            React.createElement(
              "label",
              { className: "block text-black text-sm font-medium mb-2" },
              "Email"
            ),
            React.createElement("input", {
              type: "email",
              name: "email",
              value: formData.email,
              onChange: handleChange,
              className:
                "w-full p-3 rounded-lg border border-gray-300 text-black bg-white",
              placeholder: "Enter your email",
            })
          ),
          // Phone field
          React.createElement(
            "div",
            null,
            React.createElement(
              "label",
              { className: "block text-black text-sm font-medium mb-2" },
              "Phone"
            ),
            React.createElement("input", {
              type: "tel",
              name: "phone",
              value: formData.phone,
              onChange: handleChange,
              className:
                "w-full p-3 rounded-lg border border-gray-300 text-black bg-white",
              placeholder: "Enter your phone number",
            })
          ),
          // Password field
          React.createElement(
            "div",
            null,
            React.createElement(
              "label",
              { className: "block text-black text-sm font-medium mb-2" },
              "Password"
            ),
            React.createElement("input", {
              type: "password",
              name: "password",
              value: formData.password,
              onChange: handleChange,
              className:
                "w-full p-3 rounded-lg border border-gray-300 text-black bg-white",
              placeholder: "Enter new password",
            })
          ),
          // Confirm Password field
          React.createElement(
            "div",
            null,
            React.createElement(
              "label",
              { className: "block text-black text-sm font-medium mb-2" },
              "Confirm Password"
            ),
            React.createElement("input", {
              type: "password",
              name: "confirmPassword",
              value: formData.confirmPassword,
              onChange: handleChange,
              className:
                "w-full p-3 rounded-lg border border-gray-300 text-black bg-white",
              placeholder: "Confirm new password",
            })
          ),
          // Buttons
          React.createElement(
            "div",
            { className: "flex justify-end space-x-4" },
            React.createElement(
              "button",
              {
                type: "button",
                onClick: () => navigate("/profile"),
                className:
                  "px-6 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors",
              },
              "Cancel"
            ),
            React.createElement(
              "button",
              {
                type: "submit",
                className:
                  "px-6 py-2 rounded-lg bg-[#e31b53] text-white hover:bg-[#d01848] transition-colors",
              },
              "Save Changes"
            )
          )
        )
      )
    )
  );
};

export default Settings;
