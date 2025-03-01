import React from "react";
import Navbar from "../components/Navbar";

const Subscription = () => {
  // Subscription plans data
  const subscriptionPlans = [
    {
      name: "Basic Plan",
      tagline: "Best Small, Entry Plan",
      features: [
        "Affordable Pricing - Full access to all kid-friendly content",
        "Cancel anytime - No long-term commitment",
        "Unlimited Streaming - Watch cartoons, educational shows, and interactive games",
        "Best for: Parents who want to try before committing long-term",
      ],
      price: "$199",
    },
    {
      name: "Standard Plan",
      tagline: "For the Ultimate Streaming Duo!",
      features: [
        "Save 15% compared to the monthly plan",
        "Parental Controls Included - Set screen time limits and filters",
        "Multi-device access - Watch on two devices simultaneously",
        "Best for: Parents who want flexibility and value storage",
      ],
      price: "$349",
    },
    {
      name: "Premium Plan",
      tagline: "The Ultimate Binge Package!",
      features: [
        "upto 30% Savings! - The best cost-per-view",
        "Offline Viewing - Download & watch anywhere, anytime",
        "Family Sharing - Stream on multiple devices simultaneously",
        "Best for: Families looking for a long-term, budget-friendly option",
      ],
      price: "$499",
    },
  ];

  // Additional features data
  const additionalFeatures = [
    {
      title: "Parental Approval & Safety Features",
      features: [
        "100% Kid-Safe - No ads, only curated child-friendly content",
        "Advanced Dashboard - Monitor & customize your child's viewing",
        "Screen Time Management - Set viewing limits & bedtime mode",
        "Parental Approval Required - Every subscription requires parental verification for a secure experience",
      ],
      buttonText: "Approve & Subscribe",
    },
    {
      title: "Subscription Tracking & Cancellation",
      features: [
        "Track Your Subscription - View billing details, next payment date & plan benefits",
        "Upgrade/Downgrade Anytime - Select plans based on your family's needs",
        "Easy Cancellation - Cancel anytime with a single click—no hidden charges",
        "Full Access remains active until the end of the billing cycle",
      ],
      buttonText: "Manage My Subscription",
    },
  ];

  // Render a plan card using React.createElement
  const renderPlanCard = (plan) => {
    const featuresList = plan.features.map((feature, index) =>
      React.createElement(
        "li",
        { key: index, className: "flex items-start text-sm" },
        React.createElement(
          "span",
          { className: "text-[#e31b53] mr-2 font-bold" },
          "✓"
        ),
        feature
      )
    );

    return React.createElement(
      "div",
      {
        className: "bg-[#ffd315] rounded-lg p-6 flex-1 min-w-[280px] shadow-md",
      },
      React.createElement("h3", { className: "text-lg font-bold" }, plan.name),
      React.createElement(
        "p",
        { className: "text-xs text-gray-600 mb-4" },
        plan.tagline
      ),
      React.createElement(
        "ul",
        { className: "space-y-3 mb-6" },
        ...featuresList
      ),
      React.createElement(
        "div",
        { className: "text-center my-5 font-bold" },
        "Monthly Price: ",
        React.createElement(
          "span",
          { className: "text-pink-600 text-lg" },
          plan.price
        )
      ),
      React.createElement(
        "button",
        {
          className:
            "bg-gradient-to-r from-[#e31b53] to-[#ff7aa8] text-white rounded-lg py-2 px-4 text-sm font-bold w-full hover:scale-110 transition-colors",
          onClick: () => (window.location.href = "/subscription/payment"),
        },
        "Choose " + plan.name
      )
    );
  };

  // Render a feature card using React.createElement
  const renderFeatureCard = (feature) => {
    const featuresList = feature.features.map((item, index) =>
      React.createElement(
        "li",
        { key: index, className: "flex items-start text-sm" },
        React.createElement(
          "span",
          { className: "text-[#e31b53] mr-2 font-bold" },
          "✓"
        ),
        item
      )
    );

    return React.createElement(
      "div",
      {
        className: "bg-[#ffd315] rounded-lg p-6 flex-1 min-w-[280px] shadow-md",
      },
      React.createElement(
        "h3",
        { className: "text-lg font-bold mb-4" },
        feature.title
      ),
      React.createElement(
        "ul",
        { className: "space-y-3 mb-6" },
        ...featuresList
      ),
      React.createElement(
        "button",
        {
          className:
            "bg-gradient-to-r from-[#e31b53] to-[#ff7aa8] text-white rounded-lg py-2 px-4 text-sm font-bold w-full hover:scale-110 transition-colors duration-300",
          onClick: () =>
            (window.location.href = "/subscription/manageSubscription"),
        },
        feature.buttonText
      )
    );
  };

  // Main render using React.createElement
  return React.createElement(
    "div",
    null,
    React.createElement(Navbar, null),
    React.createElement(
      "div",
      { className: "font-sans max-w-6xl mx-auto p-6" },

      // Header Section
      React.createElement(
        "div",
        { className: "text-center mb-10" },
        React.createElement(
          "h1",
          { className: "text-pink-600 text-3xl font-bold mb-3" },
          "Choose the Perfect Plan for Your Child!"
        ),
        React.createElement(
          "p",
          { className: "text-gray-600 text-sm max-w-2xl mx-auto" },
          "Safe, fun, Educational. Pick a subscription that fits your family's needs and enjoy ad-free, kid-friendly content anytime, anywhere."
        )
      ),

      // Plans Header
      React.createElement(
        "h2",
        { className: "text-xl font-bold text-center mb-8" },
        "Pick Your Perfect Plan"
      ),

      // Plans Section
      React.createElement(
        "div",
        { className: "flex flex-wrap justify-between gap-5 mb-10" },
        ...subscriptionPlans.map((plan, index) =>
          React.createElement(
            React.Fragment,
            { key: index },
            renderPlanCard(plan)
          )
        )
      ),

      // Features Section
      React.createElement(
        "div",
        { className: "flex flex-wrap justify-between gap-5" },
        ...additionalFeatures.map((feature, index) =>
          React.createElement(
            React.Fragment,
            { key: index },
            renderFeatureCard(feature)
          )
        )
      )
    )
  );
};

export default Subscription;
