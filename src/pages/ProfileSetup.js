import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileSetup = () => {
  // Form state
  const [formData, setFormData] = React.useState({
    name: "",
    age: "",
    avatar: null,
    backgroundColor: null,
    interests: [],
    pin: ["", "", "", ""],
  });

  // Error state
  const [errors, setErrors] = React.useState({
    name: "",
    age: "",
    avatar: "",
    backgroundColor: "",
    interests: "",
    pin: "",
  });

  // Loading state
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const navigate = useNavigate();

  const avatars = [
    { id: 1, name: "Pink Character", img: "/Avatar1.png" },
    { id: 2, name: "Garfield", img: "/Avatar2.png" },
    { id: 3, name: "Patrick", img: "/Avatar3.png" },
    { id: 4, name: "Add New", img: "/Avatar4.png" },
    { id: 5, name: "Johnny Bravo", img: "/Avatar5.png" },
    { id: 6, name: "Dennis", img: "/Avatar6.png" },
  ];

  const colors = [
    { id: "yellow", value: "#FFD700" },
    { id: "red", value: "#FF0000" },
    { id: "green", value: "#00FF00" },
    { id: "blue", value: "#0000FF" },
    { id: "pink", value: "#FFC0CB" },
    { id: "darkgreen", value: "#006400" },
    { id: "lightpink", value: "#FFB6C1" },
    { id: "lightblue", value: "#ADD8E6" },
    { id: "orange", value: "#FFA500" },
  ];

  const interests = [
    "Fun",
    "Comedy",
    "Adventure",
    "Fantasy",
    "Gaming",
    "Dancing",
    "Anime",
  ];

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (parseInt(formData.age) < 3 || parseInt(formData.age) > 18) {
      newErrors.age = "Age must be between 3 and 18";
    }

    if (formData.avatar === null) {
      newErrors.avatar = "Please select an avatar";
    }

    if (formData.backgroundColor === null) {
      newErrors.backgroundColor = "Please select a background color";
    }

    if (formData.interests.length === 0) {
      newErrors.interests = "Please select at least one interest";
    }

    if (formData.pin.some((digit) => digit === "")) {
      newErrors.pin = "Please enter a complete 4-digit PIN";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAvatarSelect = (avatarId) => {
    setFormData((prev) => ({ ...prev, avatar: avatarId }));
    setErrors((prev) => ({ ...prev, avatar: "" }));
  };

  const handleColorSelect = (colorId) => {
    setFormData((prev) => ({ ...prev, backgroundColor: colorId }));
    setErrors((prev) => ({ ...prev, backgroundColor: "" }));
  };

  const handleInterestToggle = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
    setErrors((prev) => ({ ...prev, interests: "" }));
  };

  const handlePinChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newPin = [...formData.pin];
      newPin[index] = value;
      setFormData((prev) => ({ ...prev, pin: newPin }));
      setErrors((prev) => ({ ...prev, pin: "" }));

      if (value && index < 3) {
        const nextInput = document.querySelector(
          `input[name="pin-${index + 1}"]`
        );
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const profileData = {
          name: formData.name,
          age: parseInt(formData.age),
          avatarId: formData.avatar,
          backgroundColor: formData.backgroundColor,
          interests: formData.interests,
          pin: formData.pin.join(""),
        };

        console.log("Profile created:", profileData);

        setFormData({
          name: "",
          age: "",
          avatar: null,
          backgroundColor: null,
          interests: [],
          pin: ["", "", "", ""],
        });

        alert("Profile created successfully!");
        navigate("/");
      } catch (error) {
        console.error("Error creating profile:", error);
        alert("Error creating profile. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return React.createElement(
    "div",
    {
      className:
        "min-h-screen bg-gradient-to-b from-blue-50 to-blue-500 p-6 font-sans",
    },
    React.createElement("img", {
      src: "/authLogo.png",
      alt: "Auth Logo",
      className: "h-12 object-contain mb-8",
    }),
    React.createElement(
      "div",
      {
        className: "max-w-2xl mx-auto rounded-2xl p-8",
      },

      React.createElement(
        "h2",
        {
          className: "text-3xl font-bold text-center mb-10 text-black",
        },
        "Set Up Your Child's Profile"
      ),
      React.createElement(
        "div",
        { className: "space-y-8" },
        // Avatar Selection
        React.createElement(
          "div",
          { className: "space-y-4" },
          React.createElement(
            "h3",
            { className: "text-xl font-semibold text-gray-800" },
            "Choose your avatar"
          ),
          React.createElement(
            "div",
            { className: "grid grid-cols-3 md:grid-cols-6 gap-6" },
            avatars.map((avatar) =>
              React.createElement(
                "button",
                {
                  key: avatar.id,
                  className: `relative rounded-full transition-transform hover:scale-110 ${
                    formData.avatar === avatar.id
                      ? "ring-4 ring-blue-500 ring-offset-2"
                      : ""
                  }`,
                  onClick: () => handleAvatarSelect(avatar.id),
                },
                React.createElement("img", {
                  src: avatar.img,
                  alt: avatar.name,
                  className:
                    "w-16 h-16 md:w-20 md:h-20 rounded-full object-cover", // Responsive avatar sizing
                })
              )
            )
          ),
          errors.avatar &&
            React.createElement(
              "p",
              { className: "text-red-500 text-sm text-center" },
              errors.avatar
            )
        ),

        // Background Color Selection
        React.createElement(
          "div",
          { className: "space-y-4" },
          React.createElement(
            "h3",
            { className: "text-xl font-semibold text-gray-800" },
            "Choose Background Color"
          ),
          React.createElement(
            "div",
            { className: "flex flex-wrap gap-4 justify-center" },
            colors.map((color) =>
              React.createElement("button", {
                key: color.id,
                className: `w-12 h-12 rounded-full transition-transform hover:scale-110 ${
                  formData.backgroundColor === color.id
                    ? "ring-4 ring-blue-500 ring-offset-2"
                    : ""
                }`,
                style: { backgroundColor: color.value },
                onClick: () => handleColorSelect(color.id),
              })
            )
          ),
          errors.backgroundColor &&
            React.createElement(
              "p",
              { className: "text-red-500 text-sm text-center" },
              errors.backgroundColor
            )
        ),

        // Name Input
        React.createElement(
          "div",
          { className: "space-y-2" },
          React.createElement(
            "label",
            { className: "text-xl font-semibold text-gray-800" },
            "Name"
          ),
          React.createElement("input", {
            className: `mt-1 w-full p-4 rounded-xl border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white`,
            placeholder: "Enter your name",
            type: "text",
            value: formData.name,
            onChange: (e) => {
              setFormData((prev) => ({ ...prev, name: e.target.value }));
              setErrors((prev) => ({ ...prev, name: "" }));
            },
          }),
          errors.name &&
            React.createElement(
              "p",
              { className: "text-red-500 text-sm" },
              errors.name
            )
        ),

        // Age Input
        React.createElement(
          "div",
          { className: "space-y-2" },
          React.createElement(
            "label",
            { className: "text-xl font-semibold text-gray-800 mb-5" },
            "Age"
          ),
          React.createElement("input", {
            className: `mt-1 w-full p-4 rounded-xl border ${
              errors.age ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white`,
            placeholder: "Enter your age",
            type: "number",
            value: formData.age,
            onChange: (e) => {
              setFormData((prev) => ({ ...prev, age: e.target.value }));
              setErrors((prev) => ({ ...prev, age: "" }));
            },
          }),
          errors.age &&
            React.createElement(
              "p",
              { className: "text-red-500 text-sm" },
              errors.age
            )
        ),

        // Interest Selection
        React.createElement(
          "div",
          { className: "space-y-4" },
          React.createElement(
            "h3",
            { className: "text-xl font-semibold text-gray-800" },
            "Select Interests"
          ),
          React.createElement(
            "div",
            { className: "flex flex-wrap gap-5 justify-center" },
            interests.map((interest) =>
              React.createElement(
                "button",
                {
                  key: interest,
                  className: `px-6 py-3 rounded-full transition-colors ${
                    formData.interests.includes(interest)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`,
                  onClick: () => handleInterestToggle(interest),
                },
                interest
              )
            )
          ),
          errors.interests &&
            React.createElement(
              "p",
              { className: "text-red-500 text-sm text-center" },
              errors.interests
            )
        ),

        // PIN Setup
        React.createElement(
          "div",
          { className: "space-y-4" },
          React.createElement(
            "h3",
            { className: "text-xl font-semibold text-gray-800 text-center" },
            "Set Up Login Access"
          ),
          React.createElement(
            "p",
            { className: "text-center text-white" },
            "Choose a 4-Digit PIN for quick & secure entry"
          ),
          React.createElement(
            "div",
            { className: "flex justify-center gap-6" },
            Array(4)
              .fill(0)
              .map((_, index) =>
                React.createElement("input", {
                  key: index,
                  name: `pin-${index}`,
                  type: "text",
                  maxLength: 1,
                  value: formData.pin[index],
                  className: `w-16 h-16 text-center text-2xl font-bold border rounded-xl bg-white ${
                    errors.pin ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`,
                  onChange: (e) => handlePinChange(index, e.target.value),
                })
              )
          ),
          errors.pin &&
            React.createElement(
              "p",
              { className: "text-red-500 text-sm text-center" },
              errors.pin
            )
        ),

        // Submit Button
        React.createElement(
          "button",
          {
            className: `w-full py-4 px-8 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#e31b53] text-white hover:shadow-lg"
            }`,
            onClick: handleSubmit,
            disabled: isSubmitting,
          },
          isSubmitting ? "Creating Profile..." : "Create Profile"
        )
      )
    )
  );
};

export default ProfileSetup;
