import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Edit,
  History,
  Settings,
  LogOut,
  Plus,
  ArrowRight,
  X,
  List,
  Clock,
  HelpCircle,
  SlidersVertical,
} from "lucide-react";
import Navbar from "../components/Navbar";
const Profile = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([
    { id: 1, name: "Jack", avatar: "/1.png" },
    { id: 2, name: "Bunny", avatar: "/2.png" },
  ]);

  const [showAddProfileModal, setShowAddProfileModal] = useState(false);
  const [showProfileDetailsModal, setShowProfileDetailsModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    // color: "bg-purple-600",
    avatar: "/1.png",
  });
  const [activeSection, setActiveSection] = useState("main");
  const [toastMessage, setToastMessage] = useState(null);
  const [username, setUsername] = useState("Welcome Selena!");
  const [activeProfile, setActiveProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("chooseAvatar");

  const avatars = [
    "/1.png",
    "/2.png",
    "/3.png",
    "/4.png",
    "/5.png",
    "/6.png",
    "/7.png",
    "/8.png",
    "/9.png",
    "/10.png",
  ];

  const menuItems = [
    {
      icon: Edit,
      text: "Manage Profile",
      action: () => navigate("/profile/settings"),
    },
    {
      icon: User,
      text: "Subscription Plan",
      action: () => setActiveSection("subscription"),
    },
    {
      icon: SlidersVertical,
      text: "Parent Dashboard",
      action: () => navigate("/profile/dashboard"),
    },
    {
      icon: Settings,
      text: "Account Settings",
      action: () => setActiveSection("settings"),
    },
    {
      icon: HelpCircle,
      text: "Help & Support",
      action: () => setActiveSection("help&support"),
    },
    { icon: LogOut, text: "Sign Out", action: () => navigate("/signin") },
  ];

  // const colorOptions = [
  //   "bg-purple-600",
  //   "bg-orange-400",
  //   "bg-red-600",
  //   "bg-green-500",
  //   "bg-blue-500",
  //   "bg-pink-500",
  // ];

  const handleProfileClick = (profile) => {
    setActiveProfile(profile);
    setShowProfileDetailsModal(true);
  };

  const handleAddProfile = () => {
    if (profiles.length >= 5) {
      setToastMessage("Maximum 5 profiles allowed");
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }
    setFormData({ name: "", avatar: "/1.png" });
    setShowAddProfileModal(true);
  };

  const handleSubmit = () => {
    if (formData.name.trim()) {
      const newProfile = {
        id: Math.max(...profiles.map((p) => p.id), 0) + 1,
        ...formData,
      };
      setProfiles([...profiles, newProfile]);
      setShowAddProfileModal(false);
      setFormData({
        name: "",
        // color: "bg-purple-600",
        avatar: "/1.png",
      });
    }
  };

  const handleAvatarSelect = (avatar) => {
    setFormData({ ...formData, avatar });
  };

  const handleSaveChanges = () => {
    if (activeProfile) {
      const updatedProfiles = profiles.map((profile) =>
        profile.id === activeProfile.id
          ? { ...profile, avatar: formData.avatar }
          : profile
      );
      setProfiles(updatedProfiles);
      setShowProfileDetailsModal(false);
      setToastMessage("Profile updated successfully");
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "profileDetails":
        return activeProfile
          ? React.createElement(
              "div",
              { className: "bg-white p-6 rounded-lg shadow-lg" },
              React.createElement(
                "h2",
                { className: "text-2xl font-bold mb-4 text-[#e31b53]" },
                `${activeProfile.name}'s Profile`
              ),
              React.createElement(
                "div",
                { className: "space-y-4" },
                React.createElement(
                  "div",
                  { className: "p-4 bg-gray-50 rounded-lg" },
                  React.createElement(
                    "h3",
                    { className: "text-xl font-semibold text-black" },
                    "Profile Stats"
                  ),
                  React.createElement(
                    "p",
                    { className: "text-gray-600" },
                    "Games Played: 24"
                  ),
                  React.createElement(
                    "p",
                    { className: "text-gray-600" },
                    "Achievements: 5"
                  )
                ),
                React.createElement(
                  "div",
                  { className: "flex gap-4" },
                  React.createElement(
                    "button",
                    {
                      className:
                        "flex-1 py-2 bg-white text-[#e31b53] border-2 border-[#e31b53] rounded-lg hover:bg-[#e31b53] hover:text-white transition-colors",
                      onClick: () => setActiveSection("main"),
                    },
                    "Back"
                  ),
                  React.createElement(
                    "button",
                    {
                      className:
                        "flex-1 py-2 bg-[#e31b53] text-white rounded-lg hover:bg-[#d01a4b] transition-colors",
                      onClick: () => navigate(`/games/${activeProfile.id}`),
                    },
                    "Play Now"
                  )
                )
              )
            )
          : null;

      case "subscription":
        return React.createElement(
          "div",
          { className: "bg-white p-6 rounded-lg shadow-lg" },
          React.createElement(
            "h2",
            { className: "text-2xl font-bold mb-4 text-[#e31b53]" },
            "Your Subscription Plan"
          ),
          React.createElement(
            "div",
            { className: "space-y-4" },
            React.createElement(
              "div",
              { className: "p-4 bg-gray-50 rounded-lg" },
              React.createElement(
                "h3",
                { className: "text-xl font-semibold text-black" },
                "Current Plan: Premium"
              ),
              React.createElement(
                "p",
                { className: "text-gray-600" },
                "Valid until: Dec 31, 2024"
              )
            ),
            React.createElement(
              "button",
              {
                className:
                  "w-full py-2 bg-white text-[#e31b53] border-2 border-[#e31b53] rounded-lg hover:bg-[#e31b53] hover:text-white transition-colors",
                onClick: () => setActiveSection("main"),
              },
              "Back to Profile"
            )
          )
        );

      case "settings":
        return React.createElement(
          "div",
          { className: "bg-white p-6 rounded-lg shadow-lg" },
          React.createElement(
            "h2",
            { className: "text-2xl font-bold mb-4 text-[#e31b53]" },
            "Account Settings"
          ),
          React.createElement(
            "div",
            { className: "space-y-4" },
            React.createElement(
              "div",
              { className: "p-4 bg-gray-50 rounded-lg" },
              React.createElement(
                "h3",
                { className: "text-xl font-semibold text-black" },
                "Email Notifications"
              ),
              React.createElement(
                "label",
                { className: "flex items-center mt-2 text-gray-700" },
                React.createElement("input", {
                  type: "checkbox",
                  className: "mr-2",
                }),
                "Receive updates"
              )
            ),
            React.createElement(
              "button",
              {
                className:
                  "w-full py-2 bg-white text-[#e31b53] border-2 border-[#e31b53] rounded-lg hover:bg-[#e31b53] hover:text-white transition-colors",
                onClick: () => setActiveSection("main"),
              },
              "Back to Profile"
            )
          )
        );

      case "help&support":
        return React.createElement(
          "div",
          { className: "bg-white p-6 rounded-lg shadow-lg" },
          React.createElement(
            "h2",
            { className: "text-2xl font-bold mb-4 text-[#e31b53]" },
            "Help & Support Contact"
          ),
          React.createElement(
            "p",
            { className: "text-gray-700 mb-2" },
            "If you have any inquiries, feel free to reach out:"
          ),
          React.createElement(
            "p",
            { className: "text-gray-700 font-semibold" },
            "Email: support@example.com"
          ),
          React.createElement(
            "p",
            { className: "text-gray-700 font-semibold mb-4" },
            "Phone: +1 234 567 890"
          ),
          React.createElement(
            "button",
            {
              className:
                "w-full py-2 bg-white text-[#e31b53] border-2 border-[#e31b53] rounded-lg hover:bg-[#e31b53] hover:text-white transition-colors",
              onClick: () => setActiveSection("main"),
            },
            "Back to Profile"
          )
        );

      default:
        return React.createElement(
          "div",
          { className: "space-y-3 max-w-3xl mx-auto" },
          menuItems.map((item) =>
            React.createElement(
              "button",
              {
                key: item.text,
                onClick: item.action,
                className:
                  "w-full flex items-center font-bold justify-between p-4 bg-white rounded-lg hover:bg-gray-100 hover:-translate-y-1 hover:border transition-colors hover:shadow-2xl sm:pl-14 sm:pr-14",
              },
              React.createElement(
                "div",
                { className: "flex items-center gap-4" },
                React.createElement(item.icon, {
                  className: "w-6 h-6 text-[#e31b53]",
                }),
                React.createElement(
                  "span",
                  { className: "text-lg text-black" },
                  item.text
                )
              ),
              React.createElement(ArrowRight, {
                className: "w-6 h-6 text-[#e31b53]",
              })
            )
          )
        );
    }
  };

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Navbar, null),
    React.createElement(
      "div",
      {
        className:
          "min-h-screen bg-[#62a6ff] p-6 text-white md:px-12 lg:px-24 xl:px-60",
      },
      React.createElement(
        "div",
        {
          className:
            "max-w-3xl mx-auto mb-10 flex flex-col justify-center items-center mt-16 sm:mt-0",
        },
        React.createElement(
          "div",
          { className: "flex items-center gap-4 mb-4 md:mb-0" },
          React.createElement(
            "div",
            {
              className:
                "w-12 h-12 rounded-full bg-[#e31b53] flex items-center justify-center shadow-lg shadow-[#e31b53]/50 sm:mb-10",
            },
            React.createElement(User, { className: "w-6 h-6 text-white" })
          ),
          React.createElement(
            "h2",
            { className: "text-2xl font-bold sm:mb-10 text-white" },
            username
          )
        ),
        React.createElement(
          "div",
          { className: "flex gap-4 md:gap-3" },
          profiles.map((profile) =>
            React.createElement(
              "div",
              { key: profile.id, className: "relative" },
              React.createElement(
                "div",
                {
                  className: "flex flex-col items-center sm:mr-2",
                  onClick: () => handleProfileClick(profile),
                },
                React.createElement(
                  "div",
                  {
                    className: `w-12 h-12 rounded-full ${
                      profile.color
                    } flex items-center justify-center cursor-pointer ${
                      activeProfile?.id === profile.id
                        ? "ring-2 ring-white"
                        : ""
                    }`,
                  },
                  profile.avatar
                    ? React.createElement("img", {
                        src: profile.avatar,
                        alt: profile.name,
                        className: "w-full h-full rounded-full object-cover",
                      })
                    : React.createElement(User, {
                        className: "w-6 h-6 text-white",
                      })
                ),
                React.createElement(
                  "span",
                  { className: "text-sm mt-1 text-white" },
                  profile.name
                )
              )
            )
          ),
          profiles.length < 5 &&
            React.createElement(
              "div",
              {
                className: "flex flex-col items-center sm:mr-2 cursor-pointer",
                onClick: handleAddProfile,
              },
              React.createElement(
                "div",
                {
                  className:
                    "w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center",
                },
                React.createElement(Plus, { className: "w-6 h-6 text-white" })
              ),
              React.createElement(
                "span",
                { className: "text-sm mt-1 text-white" },
                "Add Profile"
              )
            )
        )
      ),
      renderSection(),

      // Profile Details Modal with Tabs
      showProfileDetailsModal &&
        activeProfile &&
        React.createElement(
          "div",
          {
            className:
              "fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50",
          },
          React.createElement(
            "div",
            {
              className:
                "bg-white p-0 rounded-xl text-black w-full max-w-md mx-4 overflow-hidden",
            },
            React.createElement(
              "div",
              { className: "p-6" },
              React.createElement(
                "h2",
                { className: "text-2xl font-bold text-black mb-4" },
                "Profile"
              ),
              React.createElement(
                "div",
                {
                  className: "flex flex-col items-center justify-center mb-2",
                },
                React.createElement(
                  "div",
                  {
                    className:
                      "w-16 h-16 rounded-full flex items-center justify-center mb-2",
                  },
                  activeProfile.avatar
                    ? React.createElement("img", {
                        src: activeProfile.avatar,
                        alt: activeProfile.name,
                        className: "w-full h-full rounded-full object-cover",
                      })
                    : React.createElement(User, {
                        className: "w-8 h-8 text-white",
                      })
                ),
                React.createElement(
                  "span",
                  { className: "text-lg font-medium text-black" },
                  activeProfile.name
                )
              ),
              React.createElement(
                "div",
                { className: "text-xs text-center text-red-500 mb-4" },
                "Complete your profile",
                React.createElement("br"),
                "and win exciting prizes"
              )
            ),

            // Tabs
            React.createElement(
              "div",
              { className: "flex border-b border-gray-200" },
              React.createElement(
                "button",
                {
                  className: `flex-1 py-3 px-4 text-center font-medium ${
                    activeTab === "chooseAvatar"
                      ? "text-black border-b-2 border-[#e31b53]"
                      : "text-gray-500"
                  }`,
                  onClick: () => setActiveTab("chooseAvatar"),
                },
                "Choose Avatar"
              ),
              React.createElement(
                "button",
                {
                  className: `flex-1 py-3 px-4 text-center font-medium ${
                    activeTab === "achievements"
                      ? "text-black border-b-2 border-[#e31b53]"
                      : "text-gray-500"
                  }`,
                  onClick: () => setActiveTab("achievements"),
                },
                "Achievements"
              )
            ),

            // Tab Content
            React.createElement(
              "div",
              { className: "p-6" },
              activeTab === "chooseAvatar"
                ? React.createElement(
                    "div",
                    { className: "grid grid-cols-5 gap-2" },
                    avatars.map((avatar, index) =>
                      React.createElement(
                        "button",
                        {
                          key: index,
                          className: `w-12 h-12 rounded-full overflow-hidden border-2 ${
                            formData.avatar === avatar
                              ? "border-[#e31b53]"
                              : "border-transparent"
                          }`,
                          onClick: () => handleAvatarSelect(avatar),
                        },
                        React.createElement("img", {
                          src: avatar,
                          alt: `Avatar ${index + 1}`,
                          className: "w-full h-full object-cover",
                        })
                      )
                    )
                  )
                : React.createElement(
                    "div",
                    {
                      className:
                        "flex flex-col items-center justify-center h-48",
                    },
                    React.createElement(
                      "p",
                      { className: "text-center text-[#e31b53] mb-2" },
                      "Hey buddy no achievement yet",
                      React.createElement("br"),
                      "but no worries you can win now"
                    ),
                    React.createElement(
                      "button",
                      {
                        className:
                          "mt-4 px-6 py-2 bg-white text-[#e31b53] border border-[#e31b53] rounded-full hover:bg-[#e31b53] hover:text-white transition-colors",
                        onClick: () => navigate("/games"),
                      },
                      "Go to game section"
                    )
                  )
            ),

            // Footer
            React.createElement(
              "div",
              { className: "p-6 pt-0" },
              activeTab === "chooseAvatar" &&
                React.createElement(
                  "button",
                  {
                    onClick: handleSaveChanges,
                    className:
                      "w-full py-2 bg-[#e31b53] text-white rounded-lg hover:bg-[#d01a4b] transition-colors",
                  },
                  "Save changes"
                ),
              React.createElement(
                "button",
                {
                  onClick: () => setShowProfileDetailsModal(false),
                  className:
                    "w-full mt-2 py-2 bg-white text-[#e31b53] border border-[#e31b53] rounded-lg hover:bg-gray-100 transition-colors",
                },
                "Close"
              )
            )
          )
        ),

      // Add Profile Modal
      showAddProfileModal &&
        React.createElement(
          "div",
          {
            className:
              "fixed inset-0 bg-[#62a6ff] bg-opacity-50 flex items-center justify-center z-50",
          },
          React.createElement(
            "div",
            { className: "bg-white p-6 rounded-lg text-black w-96" },
            React.createElement(
              "div",
              { className: "flex justify-between items-center mb-4" },
              React.createElement(
                "h3",
                { className: "text-xl font-bold text-[#e31b53]" },
                "Add Profile"
              ),
              React.createElement(
                "button",
                {
                  onClick: () => setShowAddProfileModal(false),
                  className: "text-gray-400 hover:text-[#e31b53]",
                },
                React.createElement(X, { className: "w-6 h-6" })
              )
            ),
            React.createElement(
              "div",
              { className: "space-y-4" },
              React.createElement(
                "div",
                null,
                React.createElement(
                  "label",
                  {
                    className: "block text-sm font-medium mb-1 text-gray-700",
                  },
                  "Profile Name"
                ),
                React.createElement("input", {
                  type: "text",
                  value: formData.name,
                  onChange: (e) =>
                    setFormData({ ...formData, name: e.target.value }),
                  className:
                    "w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e31b53] focus:border-transparent",
                  placeholder: "Enter profile name",
                })
              ),
              React.createElement(
                "div",
                null
                // React.createElement(
                //   "label",
                //   {
                //     className: "block text-sm font-medium mb-2 text-gray-700",
                //   },
                //   "Profile Color"
                // )
                // React.createElement(
                //   "div",
                //   { className: "flex gap-2 flex-wrap" },
                //   colorOptions?.map((color) =>
                //     React.createElement("button", {
                //       key: color,
                //       className: `w-8 h-8 rounded-full ${color} ${
                //         formData.color === color
                //           ? "ring-2 ring-[#e31b53] ring-offset-2 ring-offset-white"
                //           : ""
                //       }`,
                //       onClick: () => setFormData({ ...formData, color }),
                //     })
                //   )
                // )
              ),
              React.createElement(
                "div",
                null,
                React.createElement(
                  "label",
                  {
                    className: "block text-sm font-medium mb-2 text-gray-700",
                  },
                  "Choose Avatar"
                ),
                React.createElement(
                  "div",
                  { className: "grid grid-cols-5 gap-2" },
                  avatars.slice(0, 5).map((avatar, index) =>
                    React.createElement(
                      "button",
                      {
                        key: index,
                        className: `w-10 h-10 rounded-full overflow-hidden border-2 ${
                          formData.avatar === avatar
                            ? "border-[#e31b53]"
                            : "border-transparent"
                        }`,
                        onClick: () => handleAvatarSelect(avatar),
                      },
                      React.createElement("img", {
                        src: avatar,
                        alt: `Avatar ${index + 1}`,
                        className: "w-full h-full object-cover",
                      })
                    )
                  )
                )
              )
            ),
            React.createElement(
              "div",
              { className: "flex justify-end gap-2 mt-6" },
              React.createElement(
                "button",
                {
                  onClick: () => setShowAddProfileModal(false),
                  className:
                    "px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200",
                },
                "Cancel"
              ),
              React.createElement(
                "button",
                {
                  onClick: handleSubmit,
                  className:
                    "px-4 py-2 bg-white text-[#e31b53] border-2 border-[#e31b53] rounded-lg hover:bg-[#e31b53] hover:text-white transition-colors",
                },
                "Add Profile"
              )
            )
          )
        ),

      // Toast Message
      toastMessage &&
        React.createElement(
          "div",
          {
            className:
              "fixed bottom-4 right-4 bg-white text-black border border-gray-200 p-3 rounded-md shadow-lg z-50",
          },
          toastMessage
        )
    )
  );
};

export default Profile;
