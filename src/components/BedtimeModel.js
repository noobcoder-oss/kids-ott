import React from "react";
import { X } from "lucide-react";

const BedtimeModal = ({ isOpen, onClose, type, onAction }) => {
  if (!isOpen) return null;

  const content = {
    activated: {
      title: "⌛ Almost Bedtime!",
      description:
        "Hey there, buddy!⭐ Just a heads-up - only 5 minutes left before bedtime mode activates.",
      details: [
        "✨ Wrap up your favorite show or game now!",
        "🎮 Don't worry, you can continue tomorrow.",
      ],
      actionText: "Okay, I'll Finish!",
    },
    warning: {
      title: "🌙 Bedtime Mode Activated! 💤",
      description:
        "Hey there, little explorer! ⭐ It's time to rest and recharge for another fun-filled day.",
      details: [
        "👾 Screen Time is Over – Your bedtime has arrived!",
        "💭 How about a bedtime story or some sweet dreams instead?",
        "💡 You can continue your adventures tomorrow!",
        "🌟 See You Soon!",
      ],
      actionText: "Okay, Goodnight! 🌙",
    },
  };

  const selectedContent = content[type];

  return React.createElement(
    "div",
    {
      className:
        "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
      onClick: (e) => {
        if (e.target === e.currentTarget) onClose();
      },
    },
    React.createElement(
      "div",
      {
        className: "relative w-full max-w-xl mx-4 rounded-lg overflow-hidden", // Increased from max-w-md to max-w-xl
        style: {
          backgroundImage: "url('/bedtimeBG.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        },
      },
      [
        React.createElement(
          "button",
          {
            key: "close",
            onClick: onClose,
            className:
              "absolute right-4 top-4 text-white opacity-70 hover:opacity-100 transition-opacity",
          },
          React.createElement(X, { size: 20 })
        ),
        React.createElement(
          "div",
          {
            key: "content",
            className: "p-8 text-white", // Increased padding from p-6 to p-8
          },
          [
            React.createElement(
              "h2",
              {
                key: "title",
                className: "text-xl sm:text-2xl text-center font-semibold mb-4",
              },
              selectedContent.title
            ),
            React.createElement(
              "p",
              {
                key: "description",
                className: "text-center text-white/90 mb-6",
              },
              selectedContent.description
            ),
            ...selectedContent.details.map((detail, index) =>
              React.createElement(
                "p",
                {
                  key: `detail-${index}`,
                  className: "text-center text-white/80 mb-3",
                },
                detail
              )
            ),
            React.createElement(
              "button",
              {
                key: "action",
                onClick: onAction,
                className:
                  "w-full bg-[#e31b53] hover:bg-[#e31b53]/90 text-white py-3 px-4 rounded-lg mt-4 transition-colors",
              },
              selectedContent.actionText
            ),
          ]
        ),
      ]
    )
  );
};

export default BedtimeModal;
