import React, { useState, useEffect } from "react";
import { X, Check, AlertCircle } from "lucide-react";

// Convert to a proper React functional component
const QuizModal = ({
  question,
  onAnswer,
  onSubmit,
  onClose,
  showReward,
  rewardAmount,
  selectedAnswer,
}) => {
  const [showToast, setShowToast] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  // Always include the useEffect - don't make hooks conditional
  useEffect(() => {
    if (showReward) {
      setIsCorrect(true);
      setShowToast(true);
      const timer = setTimeout(() => {
        setShowToast(false);
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showReward, onClose]);

  const handleSubmit = () => {
    const isAnswerCorrect = question.correctAnswer === selectedAnswer;
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);

    // Show feedback toast for 1.5 seconds before proceeding
    setTimeout(() => {
      setShowFeedback(false);
      onSubmit();
    }, 1500);
  };

  // Feedback toast for answer result
  if (showFeedback) {
    return React.createElement(
      "div",
      {
        className:
          "fixed inset-0 flex items-center justify-center bg-black/50 z-50",
      },
      React.createElement(
        "div",
        {
          className: `bg-white rounded-xl p-6 max-w-md w-full mx-4 relative border-2 ${
            isCorrect ? "border-green-500" : "border-red-500"
          }`,
        },
        React.createElement(
          "div",
          {
            className: "text-center space-y-4",
          },
          [
            React.createElement(
              "div",
              { key: "icon", className: "text-4xl flex justify-center" },
              isCorrect
                ? React.createElement(Check, {
                    className: "w-12 h-12 text-green-500",
                  })
                : React.createElement(AlertCircle, {
                    className: "w-12 h-12 text-red-500",
                  })
            ),
            React.createElement(
              "h3",
              { key: "title", className: "text-xl font-semibold" },
              isCorrect ? "Correct Answer!" : "Incorrect Answer!"
            ),
            React.createElement(
              "p",
              { key: "message", className: "text-gray-600" },
              isCorrect
                ? `You earned ${rewardAmount} supercoins!`
                : "Try again next time!"
            ),
          ]
        )
      )
    );
  }

  if (showReward) return null;

  return React.createElement(
    "div",
    {
      className:
        "fixed inset-0 flex items-center justify-center bg-black/50 z-50",
    },
    React.createElement(
      "div",
      {
        className: "bg-white rounded-xl p-6 max-w-md w-full mx-4 relative",
      },
      [
        React.createElement(
          "button",
          {
            key: "close",
            onClick: onClose,
            className: "absolute right-4 top-4",
          },
          React.createElement(X, { className: "w-5 h-5 text-gray-500" })
        ),
        React.createElement(
          "h3",
          {
            key: "question",
            className: "text-lg font-semibold mb-4",
          },
          question.question
        ),
        React.createElement(
          "div",
          {
            key: "options",
            className: "space-y-3",
          },
          question.options.map((option) =>
            React.createElement(
              "button",
              {
                key: option.id,
                onClick: () => onAnswer(option.id),
                className: `w-full p-3 text-left border rounded-lg ${
                  selectedAnswer === option.id
                    ? "bg-gray-100 border-[#e31b53]"
                    : "hover:bg-gray-50"
                }`,
              },
              `${option.id.toUpperCase()}) ${option.text}`
            )
          )
        ),
        React.createElement(
          "div",
          {
            key: "footer",
            className: "mt-6 flex items-center justify-between",
          },
          [
            React.createElement(
              "button",
              {
                key: "submit",
                onClick: handleSubmit,
                disabled: selectedAnswer === null,
                className:
                  "px-4 py-2 bg-[#e31b53] text-white rounded-lg hover:bg-[#ff7aa8] disabled:opacity-50 disabled:cursor-not-allowed",
              },
              "Submit Answer"
            ),
            React.createElement(
              "div",
              {
                key: "reward",
                className: "flex items-center gap-1 text-sm text-gray-500",
              },
              [
                `${rewardAmount} Supercoins`,
                React.createElement("span", { key: "coin" }, "🪙"),
              ]
            ),
          ]
        ),
      ]
    )
  );
};

// This is the function to create the modal that you can call from MovieDisplay
export const createQuizModal = (props) => {
  return React.createElement(QuizModal, props);
};
