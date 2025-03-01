"use client";

import React, { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { Link } from "react-router-dom";

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return React.createElement(
    "div",
    {
      className:
        "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",
      onClick: onClose,
    },
    React.createElement(
      "div",
      {
        className:
          "bg-white rounded-2xl p-6 w-full max-w-md transform transition-all",
        onClick: (e) => e.stopPropagation(),
      },
      children
    )
  );
};

const WhoLogging = () => {
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: "Mayank",
      type: "Parent Profile",
      color: "bg-amber-400",
      emoji: "👨",
    },
    {
      id: 2,
      name: "Aarush",
      type: "Kids Profile",
      color: "bg-pink-400",
      emoji: "👶",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "Kids Profile",
    color: "bg-sky-400",
    emoji: "😊",
  });

  const colorOptions = [
    { label: "Sky", value: "bg-sky-400", emoji: "😊" },
    { label: "Amber", value: "bg-amber-400", emoji: "👨" },
    { label: "Pink", value: "bg-pink-400", emoji: "👶" },
    { label: "Purple", value: "bg-purple-400", emoji: "👧" },
    { label: "Green", value: "bg-green-400", emoji: "🧑" },
    { label: "Red", value: "bg-red-400", emoji: "👦" },
    { label: "Indigo", value: "bg-indigo-400", emoji: "🧒" },
  ];

  const handleAddProfile = () => {
    if (profiles.length >= 5) {
      alert("Maximum 5 profiles allowed");
      return;
    }

    if (!formData.name.trim()) {
      alert("Please enter a profile name");
      return;
    }

    setProfiles([
      ...profiles,
      {
        id: Date.now(),
        name: formData.name,
        type: formData.type,
        color: formData.color,
        emoji: formData.emoji,
      },
    ]);

    setFormData({
      name: "",
      type: "Kids Profile",
      color: "bg-sky-400",
      emoji: "😊",
    });
    setIsOpen(false);
  };

  const modalContent = React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "div",
      { className: "flex justify-between items-center mb-6" },
      React.createElement(
        "h2",
        { className: "text-2xl font-bold text-gray-800" },
        "Create New Profile"
      ),
      React.createElement(
        "button",
        {
          onClick: () => setIsOpen(false),
          className: "text-gray-500 hover:text-gray-700 transition-colors",
        },
        React.createElement(X, { size: 24 })
      )
    ),
    React.createElement(
      "div",
      { className: "space-y-6" },
      React.createElement(
        "div",
        { className: "space-y-2" },
        React.createElement(
          "label",
          { className: "block text-sm font-medium text-gray-700" },
          "Profile Name"
        ),
        React.createElement("input", {
          type: "text",
          value: formData.name,
          onChange: (e) => setFormData({ ...formData, name: e.target.value }),
          className:
            "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          placeholder: "Enter name",
        })
      ),
      React.createElement(
        "div",
        { className: "space-y-2" },
        React.createElement(
          "label",
          { className: "block text-sm font-medium text-gray-700" },
          "Profile Type"
        ),
        React.createElement(
          "select",
          {
            value: formData.type,
            onChange: (e) => setFormData({ ...formData, type: e.target.value }),
            className:
              "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          },
          React.createElement(
            "option",
            { value: "Kids Profile" },
            "Kids Profile"
          ),
          React.createElement(
            "option",
            { value: "Parent Profile" },
            "Parent Profile"
          )
        )
      ),
      React.createElement(
        "div",
        { className: "space-y-2" },
        React.createElement(
          "label",
          { className: "block text-sm font-medium text-gray-700" },
          "Profile Color"
        ),
        React.createElement(
          "div",
          { className: "flex flex-wrap gap-3" },
          colorOptions.map((color) =>
            React.createElement(
              "button",
              {
                key: color.value,
                onClick: () =>
                  setFormData({
                    ...formData,
                    color: color.value,
                    emoji: color.emoji,
                  }),
                className: `w-12 h-12 rounded-lg ${
                  color.value
                } flex items-center justify-center text-2xl ${
                  formData.color === color.value ? "ring-4 ring-blue-500" : ""
                }`,
              },
              color.emoji
            )
          )
        )
      ),
      React.createElement(
        "div",
        { className: "mt-6" },
        React.createElement(
          "div",
          {
            className: `${formData.color} w-20 h-20 rounded-xl mx-auto flex items-center justify-center`,
          },
          React.createElement("span", { className: "text-4xl" }, formData.emoji)
        )
      ),
      React.createElement(
        "button",
        {
          onClick: handleAddProfile,
          className:
            "w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium mt-6",
        },
        "Create Profile"
      )
    )
  );

  return React.createElement(
    "div",
    {
      className:
        "min-h-screen bg-[#0A1929] flex flex-col items-center justify-center relative overflow-hidden",
    },
    React.createElement(
      "div",
      { className: "text-center pt-8 md:pt-16 pb-8 md:pb-12" },
      React.createElement(
        "h1",
        { className: "text-4xl font-bold text-white" },
        "Who's Logging In?"
      )
    ),
    React.createElement(
      "div",
      {
        className:
          "grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto px-4 pb-24",
      },
      profiles.map((profile) =>
        React.createElement(
          "div",
          { key: profile.id, className: "text-center" },
          React.createElement(
            "p",
            { className: "text-pink-400 mb-2 text-sm font-medium" },
            profile.type
          ),
          React.createElement(
            Link,
            { to: "/", className: "block group" },
            React.createElement(
              "div",
              {
                className: `${profile.color} w-full aspect-square rounded-2xl flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer`,
              },
              React.createElement(
                "span",
                { className: "text-5xl md:text-6xl" },
                profile.emoji
              )
            ),
            React.createElement(
              "p",
              {
                className: "mt-3 text-white text-lg font-medium truncate px-2",
              },
              profile.name
            )
          )
        )
      ),
      profiles.length < 5 &&
        React.createElement(
          "div",
          { className: "text-center" },
          React.createElement(
            "p",
            { className: "text-pink-400 mb-2 text-sm font-medium" },
            "\u00A0"
          ),
          React.createElement(
            "button",
            {
              onClick: () => setIsOpen(true),
              className:
                "w-full aspect-square bg-green-400 rounded-2xl flex items-center justify-center hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer group",
            },
            React.createElement(Plus, {
              size: 48,
              className:
                "text-white group-hover:scale-110 transition-transform",
            })
          )
        )
    ),
    React.createElement(
      Modal,
      { isOpen: isOpen, onClose: () => setIsOpen(false) },
      modalContent
    ),
    React.createElement(
      "div",
      {
        className:
          "absolute left-0 bottom-0 w-32 md:w-64 hidden lg:block pointer-events-none opacity-75",
      },
      React.createElement("img", {
        src: "/s1.png",
        alt: "Left Characters",
        className: "w-full h-auto",
      })
    ),
    React.createElement(
      "div",
      {
        className:
          "absolute right-0 bottom-0 w-32 md:w-64 hidden lg:block pointer-events-none opacity-75",
      },
      React.createElement("img", {
        src: "/s2.png",
        alt: "Right Characters",
        className: "w-full h-auto",
      })
    )
  );
};

export default WhoLogging;
